---
slug: the-overpowered-role
title: The Overpowered Role
track: cloud
category: identity-access        # identity-access | network-perimeter | secure-compute | storage-data
caseNumber: 2
breadcrumb: [Work, Cloud, Identity]
kicker: IDENTITY & ACCESS
lede: A web server's IAM role could reach every S3 bucket in the account. I traced it, proved the risk, cut it down to what the app needs and verified the fix.
platformTags: [AWS, EC2, IAM, S3]
status: REMEDIATED · VERIFIED
meta:
  domain: Identity & access
  platform: AWS EC2, IAM, S3
  severity: High            # High | Medium | Low (colour: High = #fca5a5)
  outcome: Least privilege
result:
  before: Any action, any bucket
  after: 3 actions, 1 bucket
tools: [AWS EC2, AWS IAM, AWS CLI, AWS Systems Manager (SSM), EC2 Instance Metadata Service, IMDSv2, Amazon S3, AWS CloudShell, IAM JSON policies]
skills: [Cloud Security, AWS IAM, Least Privilege, Access Control, EC2 Security Hardening, Vulnerability Assessment, S3 Access Control, Misconfiguration Detection and Remediation, Security Validation and Testing]
lesson: An EC2 role is part of the workload's attack surface. Securing it means protecting how credentials are obtained and limiting what they can do.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: the-over-privileged-user
next: aws-iam-compromise-investigation
source: notion://a4255a66603683109dbf813449e3381b
---

## Objective
I set out to check whether an EC2 workload's role was granted more than the application needs, whether its instance metadata settings exposed those credentials more than necessary, and to fix both without breaking the app.

## Scenario
A web application runs on an EC2 instance and uses an IAM role through an instance profile. It needs limited access to one S3 bucket that holds its configuration, static assets and logs. The role I found had far broader S3 permissions than that. I wanted to answer six questions: which role the instance uses, what that role allows, whether it exceeds what the app needs, whether the metadata service exposes its credentials, whether I could demonstrate the excess access, and whether I could cut it down without breaking the app.

## What I found

### Finding 01 (High): Over-privileged S3 permissions
The role's custom policy allowed every S3 action on every resource.

```json file=WebAppOverPrivS3Policy.json flag=WILDCARD
{
  "Effect": "Allow",
  "Action": ["s3:*"],
  "Resource": "*"
}
```

The app needed one bucket. The role could read, change or delete any bucket in the account, including finance reports. I proved it was usable, not theoretical: from an SSM session on the instance I listed the unrelated finance bucket and read an object from it.

### Finding 02 (Medium): IMDSv1 still allowed
The instance reported `HttpTokens: optional` with a hop limit of 2, and the metadata endpoint returned the role's temporary credentials to a plain request. If an application bug ever let an attacker reach that endpoint, they would walk away with credentials carrying all of that S3 access. The two weaknesses made each other worse.

## What I did
1. **Traced the identity chain.** I followed the running web server to its instance profile and the IAM role behind it, so every permission tied back to a workload.
2. **Read the role's policies.** I found one custom policy granting every S3 action on every resource, plus the standard SSM managed policy. No inline policies.
3. **Confirmed the reach.** From an approved SSM session I listed the app bucket and the finance bucket, and read an object from the finance bucket.
4. **Rewrote it to least privilege.** I mapped what the app really uses (read config and assets, write logs, list its own bucket) and replaced the wildcard with a scoped policy limited to those prefixes.
5. **Hardened instance metadata.** I required IMDSv2 tokens and dropped the hop limit from 2 to 1.
6. **Verified the fix.** Finance bucket access was denied, app access still worked, and the verification function returned PASS on all three checks.

### Evidence snippets
```bash
# Identity chain
aws ec2 describe-instances --instance-ids $INSTANCE_ID \
  --query "Reservations[0].Instances[0].IamInstanceProfile.Arn" --output text

# Metadata exposure (before)
curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Enforce IMDSv2
aws ec2 modify-instance-metadata-options --instance-id $INSTANCE_ID \
  --http-tokens required --http-endpoint enabled --http-put-response-hop-limit 1
```

Scoped policy (actions and resources only; account ID masked):

```json
{
  "Statement": [
    { "Sid": "ReadConfigAndAssets", "Effect": "Allow", "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::webapp-data-<ACCOUNT_ID>/config/*", "arn:aws:s3:::webapp-data-<ACCOUNT_ID>/assets/*"] },
    { "Sid": "WriteLogs", "Effect": "Allow", "Action": ["s3:PutObject"],
      "Resource": ["arn:aws:s3:::webapp-data-<ACCOUNT_ID>/logs/*"] },
    { "Sid": "ListAppBucket", "Effect": "Allow", "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::webapp-data-<ACCOUNT_ID>"],
      "Condition": { "StringLike": { "s3:prefix": ["config/*", "assets/*", "logs/*"] } } }
  ]
}
```

## Validation
After the change, listing the finance bucket from the instance returned `AccessDenied` for `s3:ListBucket`. Listing the app bucket's `config/` prefix still worked and returned `app.conf` and `db.conf`. The verification function reported:

| Check | Result |
| --- | --- |
| Over-privileged policy removed | PASS |
| Scoped policy attached | PASS |
| IMDSv2 enforced | PASS |

## Before and after
| Control | Before | After |
| --- | --- | --- |
| S3 actions | `s3:*` | Get, Put, List only |
| Resource scope | Every bucket | App bucket prefixes |
| Finance bucket | Allowed | Denied |
| App bucket | Allowed | Allowed |
| IMDS tokens | Optional | Required |
| IMDS hop limit | 2 | 1 |
| Verification | Not run | PASS |

## What I recommend
1. Give every EC2 role only the actions it needs, and avoid wildcards unless there is a documented reason.
2. Require IMDSv2 on every workload that supports it.
3. Review IAM policies on a schedule for unused or excessive permissions.
4. Use resource-level restrictions instead of `"Resource": "*"` wherever the service allows it.
5. Separate permissions per workload so one compromise does not expose unrelated data.
6. Validate policies with the IAM policy simulator, and watch IAM and S3 activity through CloudTrail.

## What I learned
An EC2 role is part of the workload's attack surface. Securing it means protecting how credentials are obtained and limiting what they can do.
