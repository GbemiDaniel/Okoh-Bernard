---
slug: s3-activity-monitoring-audit
title: S3 Activity Monitoring Audit
track: cloud
category: storage-data
caseNumber: 14
breadcrumb: [Work, Cloud, Storage]
kicker: STORAGE & DATA
lede: A private S3 bucket had no record of who read, wrote or deleted its objects. I turned on CloudTrail S3 data events and server access logging, and showed a GetObject could now be traced to the IAM identity behind it.
platformTags: [AWS, S3, CloudTrail, CloudWatch]
status: ENABLED · VERIFIED
meta:
  domain: Storage & data
  platform: Amazon S3, AWS CloudTrail
  severity: Medium          # TODO Kachi: confirm severities (Finding 02 set to Medium)
  outcome: Object-level audit trail
result:
  before: 0 object events recorded
  after: GetObject traced to an identity
tools: [AWS CLI, Amazon S3, AWS CloudTrail, Amazon CloudWatch Logs, CloudWatch Logs Insights, S3 Server Access Logging, CloudTrail S3 data events]
skills: [Cloud Security, Amazon S3 Security, AWS CloudTrail, Audit Logging, Security Monitoring, Log Analysis, Incident Response, AWS CLI]
lesson: A private bucket can still be a blind spot if object-level activity is not logged and tied to an identity.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: s3-sse-kms-encryption-and-validation
next: public-ebs-snapshot-remediation
source: notion://79755a66603683f5bae401d099d82da6
---

## Objective
I set out to find monitoring blind spots on an S3 data store, check whether object-level access was being recorded, and turn on the logging needed to see it.

## Scenario
A customer keeps sensitive data mostly in S3. The bucket was not public and ACLs were disabled, but object activity such as `GetObject`, `PutObject` and `DeleteObject` might be happening with no record. I wanted to know whether that activity could be detected and traced to whoever did it.

## What I found

### Finding 01 (Medium): CloudTrail was not capturing S3 data events
The trail recorded management events only. Its event selectors had no data resources.

```text file=event-selectors flag=NO_DATA_EVENTS
IncludeManagementEvents: true
DataResources:           []
```

A CloudTrail lookup showed bucket-level calls such as `ListBuckets` and `GetBucketAcl`, but nothing about individual objects. A CloudWatch Logs query for `GetObject`, `PutObject` and `DeleteObject` returned `recordsMatched: 0`.

### Finding 02 (Medium): Server access logging was off
The bucket had no server access logging configuration, so HTTP requests to its objects were not recorded there either.

## What I did
1. **Reviewed the bucket.** I identified it and listed its contents.
2. **Checked server access logging.** It returned no configuration.
3. **Read the trail's event selectors.** Management events only, no data resources.
4. **Queried for object activity.** CloudTrail and CloudWatch Logs showed no object-level records.
5. **Turned on S3 data events.** I added the bucket's objects to the trail's event selectors, keeping management events on.
6. **Turned on server access logging.** I pointed it at a separate logging bucket with a prefix per source bucket.

### Evidence snippets
```bash
aws cloudtrail put-event-selectors --trail-name "$TRAIL_NAME" --event-selectors "[{
  \"ReadWriteType\": \"All\", \"IncludeManagementEvents\": true,
  \"DataResources\": [{ \"Type\": \"AWS::S3::Object\", \"Values\": [\"arn:aws:s3:::${BUCKET_NAME}/\"] }]
}]"

aws s3api put-bucket-logging --bucket "$BUCKET_NAME" --bucket-logging-status "{
  \"LoggingEnabled\": { \"TargetBucket\": \"$LOGGING_BUCKET\", \"TargetPrefix\": \"${BUCKET_NAME}/\" }
}"
```

## Validation
The trail now selects the bucket's objects, server access logging is on, and a test read showed up as a data event tied to an identity (account details masked):

```text
Event selector:   Type AWS::S3::Object, Values arn:aws:s3:::blind-bucket/
Data event:       eventName GetObject, key flag.txt, userIdentity.arn arn:aws:iam::<ACCOUNT_ID>:user/<USER>
Access logging:   TargetBucket blind-bucket-logs, TargetPrefix blind-bucket/
```

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Server access logging | Not configured | Enabled |
| CloudTrail management events | Enabled | Enabled |
| CloudTrail S3 data events | Not configured | Enabled |
| `GetObject` visibility | Not captured | Captured |
| Identity behind object activity | Not available | Recorded |
| Logs query for object events | 0 matches | Activity found |

## What I recommend
1. Turn on CloudTrail S3 data events for sensitive or business-critical buckets.
2. Add server access logging where you need HTTP-level detail.
3. Send logs to a dedicated, locked-down logging destination with set retention.
4. Watch `GetObject`, `PutObject` and `DeleteObject` on sensitive data, with saved queries or alerts.
5. Review logging coverage so new buckets do not reopen the gap.

## What I learned
A private bucket can still be a blind spot if object-level activity is not logged and tied to an identity.
