---
slug: public-ebs-snapshot-remediation
title: Public EBS Snapshot Remediation
track: cloud
category: storage-data
caseNumber: 15
breadcrumb: [Work, Cloud, Storage]
kicker: STORAGE & DATA
lede: A snapshot tagged as sensitive was unencrypted and shared with every AWS account. I removed the public permission and created an encrypted copy with a customer-managed KMS key.
platformTags: [AWS, EBS, KMS, EC2]
status: REMEDIATED · VERIFIED
meta:
  domain: Storage & data
  platform: Amazon EBS, AWS KMS
  severity: High            # TODO Kachi: confirm severities (Finding 02 set to Medium)
  outcome: Private and encrypted
result:
  before: Public and unencrypted
  after: Private, encrypted copy
tools: [AWS CLI, Amazon EC2, Amazon EBS snapshots, AWS KMS, AWS IAM, EBS snapshot permissions, Encryption at rest]
skills: [Cloud Security, EBS Snapshot Security, AWS KMS, Encryption at Rest, Access Control, Least Privilege, Data Protection, AWS CLI]
lesson: Securing EBS snapshots means checking both who they are shared with and whether they are encrypted. An unencrypted public snapshot hands the volume's data to anyone.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: s3-activity-monitoring-audit
next: securing-the-build-process
source: notion://64c55a6660368306a49b014127aee053
---

## Objective
I set out to find publicly shared EBS snapshots, judge whether sensitive data was exposed, remove the public sharing, and replace the snapshot with an encrypted copy.

## Scenario
A security review, prompted by known snapshot-sharing risks, pointed to an EBS snapshot linked to sensitive data that had been made public. I needed to confirm the sharing and encryption state, remove public access and create an encrypted replacement.

## What I found

### Finding 01 (High): Shared with every AWS account
The snapshot's volume permissions included the `all` group, which means any AWS account could create a volume from it.

```json file=createVolumePermission flag=PUBLIC
{
  "SnapshotId": "snap-xxxxxxxx",
  "CreateVolumePermissions": [{ "Group": "all" }]
}
```

### Finding 02 (Medium): Unencrypted, and tagged sensitive
The same snapshot was not encrypted.

```text file=snapshot-metadata flag=UNENCRYPTED
Encrypted:           False
State:               completed
DataClassification:  Sensitive
```

Public and unencrypted together meant a direct path to the data on the volume. Because it had already been exposed for some time, the response also has to include reviewing the snapshot's contents and rotating any credentials or keys stored on that volume.

## What I did
1. **Found the snapshot.** I identified the account, region and the lab snapshot.
2. **Read its metadata.** It was unencrypted and classified as sensitive.
3. **Checked who it was shared with.** `createVolumePermission` showed `Group: all`.
4. **Removed public sharing.** I removed the `all` group permission.
5. **Made an encrypted copy.** I located the customer-managed key `alias/lab-ebs-key` and copied the snapshot with encryption on.

### Evidence snippets
```bash
aws ec2 modify-snapshot-attribute --snapshot-id "$SNAPSHOT_ID" \
  --attribute createVolumePermission --operation-type remove --group-names all

ENCRYPTED_SNAP=$(aws ec2 copy-snapshot --source-region "$AWS_REGION" \
  --source-snapshot-id "$SNAPSHOT_ID" --region "$AWS_REGION" \
  --encrypted --kms-key-id alias/lab-ebs-key \
  --query SnapshotId --output text)
```

## Validation
The original snapshot is no longer shared, and the replacement is encrypted and complete:

```text
Original CreateVolumePermissions:   []
Encrypted copy:                     Encrypted true, State completed
```

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Public sharing | `Group: all` | Removed |
| Encryption | `False` | Encrypted copy |
| KMS protection | Not used | Customer-managed `alias/lab-ebs-key` |
| Snapshot state | Completed | Completed |

## What I recommend
1. Audit EBS snapshots regularly for public sharing.
2. Do not share snapshots with `Group: all` unless it is explicitly required and approved.
3. Encrypt sensitive snapshots with customer-managed KMS keys.
4. After a confirmed exposure, review what the snapshot held and rotate any credentials or keys on it.
5. Add detection for newly public snapshots.

## What I learned
Securing EBS snapshots means checking both who they are shared with and whether they are encrypted. An unencrypted public snapshot hands the volume's data to anyone.
