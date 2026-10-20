---
slug: aws-iam-compromise-investigation
title: AWS IAM Compromise Investigation
track: cloud
category: identity-access
caseNumber: 3
breadcrumb: [Work, Cloud, Identity]
kicker: IDENTITY & ACCESS
lede: A deployment user had picked up AdministratorAccess and a new access key. I removed both, confirmed they were gone, and built an EventBridge to SNS alert so the next high-risk IAM change does not go unnoticed.
platformTags: [AWS, IAM, CloudTrail, EventBridge]
status: REMEDIATED · DETECTION ADDED
meta:
  domain: Identity & access
  platform: AWS IAM, CloudTrail, EventBridge, SNS
  severity: High            # TODO Kachi: confirm severities (Finding 03 set to Medium)
  outcome: Contained and monitored
result:
  before: Admin policy and a rogue key
  after: Both removed, 13 IAM events alerted
tools: [AWS IAM, AWS CLI, AWS CloudShell, AWS CloudTrail, Amazon EventBridge, Amazon SNS, IAM access keys, JSON event patterns]
skills: [Cloud Security Incident Response, AWS IAM, Access Key Management, Credential Lifecycle Management, Privilege Remediation, AWS CloudTrail, Amazon EventBridge, Amazon SNS, Event-Driven Detection, Security Monitoring and Alerting, Security Control Validation]
lesson: IAM incident response is not finished when the bad permission is gone. You also have to remove the compromised credential and put detection in place for the next change like it.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: the-overpowered-role
next: the-wide-open-security-group
source: notion://48d55a666036835ab13b01e2393c8ca1
---

## Objective
I set out to find and undo unauthorized IAM changes on a deployment user, remove the excess admin access and the rogue credential, and add event-driven monitoring for high-risk IAM changes.

## Scenario
The IAM user `app-deployer` showed two signs of unauthorized change: the AWS-managed `AdministratorAccess` policy was attached to it, and it had a recently created access key that nobody could account for. My plan was to investigate the user and its credentials, remove the privileges, deactivate and delete the key, then add detection and test it with a controlled event.

## What I found

### Finding 01 (High): AdministratorAccess on a deployment user
`app-deployer` had `AdministratorAccess` attached. For an application deployment identity that is a privilege boundary failure: if its credentials leaked, an attacker could act on almost anything in the account.

### Finding 02 (High): A rogue access key
The user had a newly created access key that was not part of the expected deployment workflow. An unexpected key is a second way into the account that works outside the application.

### Finding 03 (Medium): No alerting on high-risk IAM changes
Nothing raised an alert when the policy was attached or the key was created. Changes like `AttachUserPolicy` and `CreateAccessKey` could happen without anyone being told.

## What I did
1. **Identified the rogue key.** I stored the account ID and found the most recently created access key on `app-deployer`. The key value is never written down.
2. **Removed admin access.** I detached `AdministratorAccess` and confirmed the user had no attached policies left.
3. **Disabled, then deleted the key.** I set the key to inactive first, deleted it, and confirmed the user had no access keys left.
4. **Set up notifications.** I created an SNS topic, `iam-change-alerts`, with an email subscription and a topic policy that lets EventBridge publish to it.
5. **Built the detection rule.** I created the EventBridge rule `iam-high-risk-changes` to match 13 high-risk IAM API calls recorded by CloudTrail, and pointed it at the SNS topic.
6. **Tested it with a controlled event.** I created a test access key to trigger a `CreateAccessKey` event, then deleted the test key straight away.

In production I would investigate an unauthorized change before rolling it back, to tell a legitimate admin action from a malicious or accidental one.

### Evidence snippets
```bash
# Find the newest access key on the user (value never printed)
ROGUE_KEY_ID=$(aws iam list-access-keys --user-name app-deployer \
  --query "sort_by(AccessKeyMetadata, &CreateDate)[-1].AccessKeyId" --output text)

# Remove admin access, then disable and delete the key
aws iam detach-user-policy --user-name app-deployer \
  --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
aws iam update-access-key --user-name app-deployer --access-key-id $ROGUE_KEY_ID --status Inactive
aws iam delete-access-key --user-name app-deployer --access-key-id $ROGUE_KEY_ID

# Detection: EventBridge rule to SNS
aws events put-rule --name iam-high-risk-changes \
  --event-pattern file://iam-event-pattern.json --state ENABLED
aws events put-targets --rule iam-high-risk-changes --targets "Id=sns-iam-alerts,Arn=$SNS_ARN"
```

Event pattern for the rule:

```json file=iam-event-pattern.json
{
  "source": ["aws.iam"],
  "detail-type": ["AWS API Call via CloudTrail"],
  "detail": {
    "eventSource": ["iam.amazonaws.com"],
    "eventName": [
      "AttachUserPolicy", "AttachRolePolicy", "AttachGroupPolicy",
      "PutUserPolicy", "PutRolePolicy", "PutGroupPolicy",
      "CreateUser", "CreateAccessKey", "CreateLoginProfile",
      "UpdateAssumeRolePolicy", "DeactivateMFADevice",
      "DeleteUser", "DeleteAccessKey"
    ]
  }
}
```

## Validation
After the changes, the user had no attached policies and no access keys. The rule target was added with `FailedEntryCount: 0`, and the controlled `CreateAccessKey` call matched the rule's pattern.

| Check | Result |
| --- | --- |
| Attached policies on `app-deployer` | None |
| Access keys on `app-deployer` | None |
| EventBridge rule | Enabled |
| SNS target | Added, 0 failed entries |
| Test key | Created, then deleted |

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Administrative policy | `AdministratorAccess` attached | Removed |
| Rogue access key | Present | Deactivated and deleted |
| IAM change monitoring | No alerting | EventBridge rule |
| High-risk IAM events | Not watched | 13 API calls matched |
| Notification | Not configured | SNS topic |
| Detection test | Not run | Controlled `CreateAccessKey` |

## What I recommend
1. Do not give application identities `AdministratorAccess` without a documented reason.
2. Alert on high-risk IAM changes: policy attachments, access key creation, trust policy edits and MFA changes.
3. Review access keys regularly and remove unused or unexpected ones.
4. Prefer roles and temporary credentials for workloads over long-lived user keys.
5. Investigate before reverting suspicious changes.
6. Test detections with controlled events instead of assuming a rule works.

## What I learned
IAM incident response is not finished when the bad permission is gone. You also have to remove the compromised credential and put detection in place for the next change like it.
