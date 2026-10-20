---
slug: public-s3-bucket-remediation
title: Public S3 Bucket Remediation
track: cloud
category: storage-data
caseNumber: 12
breadcrumb: [Work, Cloud, Storage]
kicker: STORAGE & DATA
lede: An S3 bucket could be listed and read by anyone without credentials, through three separate open doors. I traced each one, closed all three, and confirmed public requests were denied while authenticated access still worked.
platformTags: [AWS, S3, Bucket policy, ACL]
status: REMEDIATED · VERIFIED
meta:
  domain: Storage & data
  platform: Amazon S3
  severity: High            # TODO Kachi: confirm severities
  outcome: Private again
result:
  before: Anyone could list and read
  after: AccessDenied without credentials
tools: [AWS CLI, Amazon S3, S3 bucket policies, S3 ACLs, S3 Block Public Access, AWS IAM access controls]
skills: [Cloud Security, Amazon S3 Security, S3 Bucket Policy Analysis, S3 ACL Analysis, Access Control, Data Protection, Vulnerability Remediation, AWS CLI]
lesson: S3 exposure can come through several independent layers, so an assessment has to check Block Public Access, the bucket policy, the ACL and real unauthenticated access, not just one setting.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: ecs-container-iam-least-privilege
next: s3-sse-kms-encryption-and-validation
source: notion://7c555a6660368216a9f781e370c6f70e
---

## Objective
I set out to find how an S3 bucket had been made public across its access-control layers, confirm what anyone could see without credentials, and make it private again without breaking authenticated access.

## Scenario
A bucket, `leaky-bucket`, had been made public by mistake. Users with no AWS credentials could list its objects and download files. I needed to find exactly which settings allowed that, and fix them without cutting off legitimate access.

## What I found

### Finding 01 (High): Block Public Access switched off everywhere
All four Block Public Access settings were off, both on the bucket and on the account, so nothing stopped public grants from taking effect.

```text file=block-public-access flag=ALL_OFF
BlockPublicAcls:       false
IgnorePublicAcls:      false
BlockPublicPolicy:     false
RestrictPublicBuckets: false
```

### Finding 02 (High): A bucket policy for any principal
The bucket policy let anyone read any object.

```json file=bucket-policy flag=WILDCARD
{ "Effect": "Allow", "Principal": "*", "Action": "s3:GetObject" }
```

### Finding 03 (High): An ACL granting READ to AllUsers
Object ownership was `BucketOwnerPreferred`, so ACLs were active, and the bucket ACL granted `READ` to the `AllUsers` group. With no credentials at all I could list `customer-records/`, `flag.txt` and `sample-data.txt`, plus `customer-records/export.csv` inside.

The exposure did not come from one failure. Three layers were open at once, each a separate path to the data.

## What I did
1. **Found the bucket.** I listed the buckets and saved the target name.
2. **Checked every layer.** I read the ownership controls, the bucket and account Block Public Access settings, the bucket policy and the ACL.
3. **Tested as an outsider.** I listed and downloaded objects with `--no-sign-request` to prove the access was real.
4. **Closed all three doors.** I turned on all four Block Public Access settings, deleted the public bucket policy, and reset the ACL to `private`.
5. **Retested both ways.** I repeated the unauthenticated requests, then checked authenticated access.

### Evidence snippets
```bash
aws s3api put-public-access-block --bucket "$BUCKET_NAME" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
aws s3api delete-bucket-policy --bucket "$BUCKET_NAME"
aws s3api put-bucket-acl --bucket "$BUCKET_NAME" --acl private
```

## Validation
| Check | Result |
| --- | --- |
| Block Public Access (all four) | `true` |
| Bucket policy | `NoSuchBucketPolicy` |
| Unauthenticated request to `flag.txt` | `AccessDenied` |
| Authenticated access | Still working |

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Block Public Access | All four `false` | All four `true` |
| Bucket policy | `Principal: "*"` | Removed |
| Bucket ACL | `AllUsers: READ` | `private` |
| Unauthenticated object access | Allowed | `AccessDenied` |
| Authenticated access | Allowed | Allowed |

## What I recommend
1. Keep all four Block Public Access settings on unless a documented need says otherwise.
2. Avoid wildcard principals and public ACL grants on sensitive buckets.
3. Audit bucket policies, ACLs and account-level settings together.
4. Monitor S3 configuration changes for new public exposure.
5. Keep sensitive data only in buckets with the right access controls.

## What I learned
S3 exposure can come through several independent layers, so an assessment has to check Block Public Access, the bucket policy, the ACL and real unauthenticated access, not just one setting.
