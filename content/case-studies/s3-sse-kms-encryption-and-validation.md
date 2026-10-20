---
slug: s3-sse-kms-encryption-and-validation
title: S3 SSE-KMS Encryption and Validation
track: cloud
category: storage-data
caseNumber: 13
breadcrumb: [Work, Cloud, Storage]
kicker: STORAGE & DATA
lede: A bucket relied on S3-managed encryption, so S3 read access alone was enough to read its data. I switched new writes to SSE-KMS with a customer-managed key and proved a role without kms:Decrypt now gets AccessDenied.
platformTags: [AWS, S3, KMS, IAM]
status: CONFIGURED · VERIFIED
meta:
  domain: Storage & data
  platform: Amazon S3, AWS KMS
  severity: Medium          # TODO Kachi: confirm severity
  outcome: KMS boundary added
result:
  before: S3 read was enough
  after: kms:Decrypt also required
tools: [AWS CLI, Amazon S3, AWS KMS, AWS IAM, AWS STS, S3 server-side encryption, SSE-S3, SSE-KMS, S3 Bucket Keys]
skills: [Cloud Security, Amazon S3 Security, AWS KMS, Encryption at Rest, Key Management, Access Control, Least Privilege, Security Validation, AWS CLI]
lesson: Changing a bucket's default encryption protects new writes but leaves existing objects as they were, and SSE-KMS adds a kms:Decrypt check on top of ordinary S3 read access.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: public-s3-bucket-remediation
next: s3-activity-monitoring-audit
source: notion://4db55a666036823988ce01689374115b
---

## Objective
I set out to find how the bucket's data was encrypted at rest, whether objects used S3-managed or customer-managed keys, configure SSE-KMS with a customer-managed key, and prove it adds a second authorization check.

## Scenario
The bucket used the default SSE-S3 encryption. That encrypts data at rest, but it adds no separate key permission: anyone with S3 read access can read the objects. An existing customer-managed key, `alias/lab-cmk`, was available to use instead.

## What I found

### Finding 01 (Medium): No separate key boundary
The bucket and an existing object both used S3-managed encryption.

```text file=bucket-and-object-encryption flag=SSE-S3
Bucket SSEAlgorithm:  AES256
Object SSE:           AES256
Object SSEKMSKeyId:   null
```

SSE-S3 is real encryption at rest, but access to the data depends only on S3 permissions. There was no customer-managed key that could add its own authorization step.

## What I did
1. **Read the bucket encryption.** It used `AES256` (SSE-S3).
2. **Inspected an existing object.** `head-object` showed `AES256` with no KMS key.
3. **Found the customer-managed key.** I located `alias/lab-cmk` and retrieved its key ARN.
4. **Switched the bucket to SSE-KMS.** I set the default encryption to `aws:kms` with that key and turned on S3 Bucket Keys to cut KMS request volume.
5. **Tested the boundary.** I uploaded a new object, confirmed it was KMS-encrypted, then assumed a role with S3 read access but no `kms:Decrypt` and tried to read it.

### Evidence snippets
```bash
aws s3api put-bucket-encryption --bucket "$BUCKET_NAME" \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": { "SSEAlgorithm": "aws:kms", "KMSMasterKeyID": "'$KEY_ARN'" },
      "BucketKeyEnabled": true
    }]
  }'
```

## Validation
The bucket now encrypts new writes with the customer-managed key, and S3 read access alone is no longer enough:

```text
Bucket:        SSEAlgorithm aws:kms, key alias/lab-cmk, BucketKeyEnabled true
New object:    SSE aws:kms
Old object:    SSE AES256 (unchanged)
Role without kms:Decrypt:   AccessDenied, not authorized to perform kms:Decrypt
```

Changing the default did not re-encrypt the object that was already there. That has to be done separately.

## Before and after
| Configuration | Before | After |
| --- | --- | --- |
| Bucket encryption | SSE-S3 | SSE-KMS |
| Key management | S3-managed | Customer-managed `alias/lab-cmk` |
| Bucket Key | Not configured | Enabled |
| Existing object | `AES256` | Still `AES256` |
| New object | Not applicable | `aws:kms` |
| S3 read alone | Enough | Not enough |
| `kms:Decrypt` | Not needed | Required |

## What I recommend
1. Use SSE-KMS where you need control over the key and a second authorization check.
2. Keep both S3 and KMS permissions to least privilege, and guard `kms:Decrypt` closely.
3. Turn on S3 Bucket Keys to reduce KMS requests and cost.
4. Re-encrypt existing sensitive objects separately; changing the default does not touch them.
5. Monitor key usage and permissions.

## What I learned
Changing a bucket's default encryption protects new writes but leaves existing objects as they were, and SSE-KMS adds a kms:Decrypt check on top of ordinary S3 read access.
