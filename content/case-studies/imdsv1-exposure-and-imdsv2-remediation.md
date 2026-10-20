---
slug: imdsv1-exposure-and-imdsv2-remediation
title: IMDSv1 Exposure and IMDSv2 Remediation
track: cloud
category: secure-compute
caseNumber: 10
breadcrumb: [Work, Cloud, Compute]
kicker: SECURE COMPUTE
lede: An EC2 instance still allowed IMDSv1, and a plain request to the metadata endpoint handed back its role's temporary credentials. I enforced IMDSv2, then showed the old request now gets 401 while token-based access still works.
platformTags: [AWS, EC2, IMDS, IAM]
status: REMEDIATED · VERIFIED
meta:
  domain: Secure compute
  platform: AWS EC2, Instance Metadata Service
  severity: High            # TODO Kachi: confirm severity
  outcome: IMDSv2 required
result:
  before: Credentials from a plain GET
  after: 401 without a token
tools: [AWS CLI, Amazon EC2, EC2 Instance Metadata Service, AWS Systems Manager Session Manager, curl, IAM temporary credentials]
skills: [Cloud Security, EC2 Security, Instance Metadata Service, Credential Exposure Analysis, SSRF Risk Analysis, AWS IAM, Security Remediation, Security Validation, AWS CLI]
lesson: Metadata settings are part of workload security. With IMDSv1 left on, an application bug such as SSRF can become a way to steal the instance's IAM credentials.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: unpatched-ec2-instance
next: ecs-container-iam-least-privilege
source: notion://43a55a6660368260a81b818b3e98eeef
---

## Objective
I set out to investigate an EC2 instance that allowed IMDSv1, trace how an attacker could pull credentials through it, see exactly what came back, and close the path by enforcing IMDSv2.

## Scenario
The instance had `HttpTokens=optional`, so it accepted both IMDSv1 and IMDSv2 requests. That means the metadata endpoint answered without a session token. If an application on the instance had an SSRF bug, an attacker could use it to reach the endpoint and collect the role's credentials.

## What I found

### Finding 01 (High): Role credentials from an unauthenticated request
The metadata options confirmed IMDSv1 was on.

```text file=metadata-options flag=IMDSV1_ON
HttpTokens:              optional
HttpPutResponseHopLimit: 2
HttpEndpoint:            enabled
```

From a Session Manager session on the instance, a plain request to the credentials path returned the role name, `Room43ManagedInstanceRole`. Requesting that role's path returned a full temporary credential set: `AccessKeyId`, `SecretAccessKey` and `Token`. No token or authentication was needed. How much damage that does depends on what the role is allowed to do.

## What I did
1. **Read the metadata settings.** I pulled the instance's metadata options and found `HttpTokens=optional`.
2. **Followed the attacker's path.** In a Session Manager session I queried `169.254.169.254` for the role name, then for its credentials. Values are not reproduced here.
3. **Enforced IMDSv2.** I set `HttpTokens` to `required`, so every metadata request must carry a session token.
4. **Tested both paths.** I repeated the old unauthenticated request and then made a proper token-based IMDSv2 request.

### Evidence snippets
```bash
# Enforce IMDSv2
aws ec2 modify-instance-metadata-options --instance-id "$INSTANCE_ID" \
  --http-tokens required --http-endpoint enabled

# IMDSv2: get a session token, then use it
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/iam/security-credentials/Room43ManagedInstanceRole
```

## Validation
The old unauthenticated request now fails, while the token-based request still returns the role's credentials, so legitimate use keeps working:

```text
HttpTokens:                     required
Unauthenticated GET (IMDSv1):   HTTP/1.1 401 Unauthorized
Token-based request (IMDSv2):   credentials returned
```

## Before and after
| Configuration | Before | After |
| --- | --- | --- |
| `HttpTokens` | `optional` | `required` |
| IMDSv1 | Enabled | Blocked |
| Unauthenticated metadata GET | Returned credentials | `401 Unauthorized` |
| IMDSv2 token request | Available | Working |

## What I recommend
1. Require IMDSv2 (`HttpTokens=required`) on EC2 instances.
2. Keep instance roles to least privilege, since they decide what stolen credentials can do.
3. Find and fix SSRF bugs in applications running on EC2.
4. Monitor for instances that still allow IMDSv1.

## What I learned
Metadata settings are part of workload security. With IMDSv1 left on, an application bug such as SSRF can become a way to steal the instance's IAM credentials.
