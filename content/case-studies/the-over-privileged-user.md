---
slug: the-over-privileged-user
title: The Over-Privileged User
track: cloud
category: identity-access
caseNumber: 1
breadcrumb: [Work, Cloud, Identity]
kicker: IDENTITY & ACCESS
lede: A developer account had a policy that allowed every action on every resource. I mapped what the job actually needs, replaced the wildcard with a scoped policy, moved access to a group and proved the result with the IAM Policy Simulator.
platformTags: [AWS, IAM, S3, EC2]
status: REMEDIATED · VERIFIED
meta:
  domain: Identity & access
  platform: AWS IAM, S3, EC2, CloudWatch Logs
  severity: High            # TODO Kachi: confirm severities (Finding 02 set to Low)
  outcome: Least privilege
result:
  before: Every action, every resource
  after: 10 actions, 3 services
tools: [AWS IAM, AWS CLI, AWS CloudShell, IAM JSON policies, IAM Policy Simulator, Amazon S3, Amazon EC2, Amazon CloudWatch Logs]
skills: [Cloud Security, AWS IAM, Least Privilege, IAM Policy Analysis, IAM Policy Design, Group-Based Access Control, Misconfiguration Detection and Remediation, Permission Auditing, Access Control Validation, AWS CLI]
lesson: Good IAM security is not only removing excess permissions. It means understanding what a person actually does, turning that into precise access, and managing it through a model that scales.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
next: the-overpowered-role
source: notion://a3b55a6660368387a41801ce00b2b002
---

## Objective
I set out to check whether a developer's IAM permissions matched the work they actually do, cut any excess down to least privilege, and move their access from a policy attached to the user to a group that scales.

## Scenario
A developer account, `carl-the-dev`, had broad permissions through a policy attached directly to the user. The role only called for three things: reading application data from one S3 bucket, describing EC2 infrastructure, and reading CloudWatch Logs for troubleshooting. I wanted the access model to be user, then a Developers group, then a scoped policy, then only the resources the job needs.

## What I found

### Finding 01 (High): Wildcard policy on a developer account
The customer-managed policy attached to the user allowed every action on every resource.

```json file=AWS201-DevCarlAdmin.json flag=WILDCARD
{
  "Action": "*",
  "Resource": "*",
  "Effect": "Allow",
  "Sid": "OverPrivilegedAccess"
}
```

Nothing in the policy limited the account to the services its role needed. With these permissions it could act on S3, EC2, CloudTrail, EBS snapshots, security groups and Secrets Manager. If the credentials leaked, the blast radius would be the whole account.

### Finding 02 (Low): Permissions managed one user at a time
The user had no inline policies and belonged to no IAM group. All of its access came from the one policy attached directly to the user, so every developer would need their own assignment and their own review.

## What I did
1. **Enumerated the users.** I listed the IAM users in the account and picked `carl-the-dev` for review because of its attached policy.
2. **Read the attached policy.** I pulled the policy document and confirmed the wildcard action and resource.
3. **Checked for hidden access.** I looked for inline policies and group memberships, which do not show up in the managed-policy list. There were none.
4. **Defined what the job needs.** Read and list on the application bucket, describe-only EC2 calls, and read-only CloudWatch Logs for the application log groups.
5. **Removed the wildcard policy.** I detached it and confirmed the user had no attached policies left.
6. **Wrote a scoped policy and moved to a group.** I created an `AppAccess` policy with only those actions, attached it to a new `Developers` group and added the user to the group.

### Evidence snippets
```bash
# Inline policies and group membership (both empty)
aws iam list-user-policies --user-name carl-the-dev
aws iam list-groups-for-user --user-name carl-the-dev

# Remove the wildcard policy
aws iam detach-user-policy --user-name carl-the-dev \
  --policy-arn arn:aws:iam::<ACCOUNT_ID>:policy/AWS201-DevCarlAdmin

# Group-based access
aws iam create-group --group-name Developers
aws iam attach-group-policy --group-name Developers \
  --policy-arn arn:aws:iam::<ACCOUNT_ID>:policy/AppAccess
aws iam add-user-to-group --group-name Developers --user-name carl-the-dev
```

Scoped policy (actions and resources only; account ID masked):

```json clean
{
  "Statement": [
    { "Sid": "S3AppBucketReadOnly", "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::thm-app-data-<ACCOUNT_ID>", "arn:aws:s3:::thm-app-data-<ACCOUNT_ID>/*"] },
    { "Sid": "EC2DescribeOnly", "Effect": "Allow",
      "Action": ["ec2:DescribeInstances", "ec2:DescribeSecurityGroups", "ec2:DescribeSubnets", "ec2:DescribeVpcs"],
      "Resource": "*" },
    { "Sid": "CloudWatchLogsReadOnly", "Effect": "Allow",
      "Action": ["logs:DescribeLogGroups", "logs:DescribeLogStreams", "logs:GetLogEvents", "logs:FilterLogEvents"],
      "Resource": "arn:aws:logs:us-east-1:<ACCOUNT_ID>:log-group:/aws/app/*" }
  ]
}
```

## Validation
The user now belongs to `Developers`, and the group carries only `AppAccess`. I ran the policy through the IAM Policy Simulator against the application bucket:

| Action | Result |
| --- | --- |
| `s3:ListBucket` | allowed |
| `s3:GetObject` | allowed |

## Before and after
| Control | Before | After |
| --- | --- | --- |
| User policy | `AWS201-DevCarlAdmin` | No direct policy |
| Action scope | `*` | Required actions only |
| Resource scope | `*` | Application resources |
| S3 access | Unrestricted | App bucket read and list |
| EC2 access | Unrestricted | Describe only |
| CloudWatch Logs | Unrestricted | Read only |
| Access model | Attached to the user | `Developers` group |
| Permission validation | Not run | Policy Simulator |

## What I recommend
1. Avoid wildcard actions and resources unless there is a documented reason.
2. Manage access through groups for people who do the same job.
3. Grant only the services, actions and resources each role needs.
4. Review IAM policies on a schedule for unused or excessive permissions.
5. Keep administrative access separate from developer access.
6. Watch IAM activity with CloudTrail, and prefer temporary or federated access over long-lived IAM users where you can.

## What I learned
Good IAM security is not only removing excess permissions. It means understanding what a person actually does, turning that into precise access, and managing it through a model that scales.
