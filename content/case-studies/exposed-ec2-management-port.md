---
slug: exposed-ec2-management-port
title: Exposed EC2 Management Port
track: cloud
category: secure-compute
caseNumber: 8
breadcrumb: [Work, Cloud, Compute]
kicker: SECURE COMPUTE
lede: An EC2 instance had SSH open to the whole internet. I confirmed Session Manager already gave a safer way in, removed the public SSH rule, and proved I could still administer the instance.
platformTags: [AWS, EC2, Security Groups, SSM]
status: REMEDIATED · VERIFIED
meta:
  domain: Secure compute
  platform: AWS EC2, Systems Manager
  severity: High            # TODO Kachi: confirm severity
  outcome: No public management port
result:
  before: SSH open to 0.0.0.0/0
  after: Session Manager only
tools: [AWS CLI, Amazon EC2, AWS Security Groups, AWS Systems Manager Session Manager]
skills: [Cloud Security, EC2 Security, Security Group Configuration, AWS Systems Manager, Network Security, Attack Surface Reduction, Vulnerability Remediation, AWS CLI]
lesson: Because Session Manager was already working, I could remove public SSH without losing admin access to the instance.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: vpc-flow-logs-visibility-assessment
next: unpatched-ec2-instance
source: notion://f2755a66603683cb9ec181b4b3828cbb
---

## Objective
I set out to find out whether the instance's management port was open to the internet and whether a safer way to manage it already existed, then remove the public SSH access without losing admin access.

## Scenario
The instance's security group allowed TCP/22 from `0.0.0.0/0`, so any host on the internet could try to SSH in. Before changing anything I wanted to know whether Session Manager was already available as an alternative.

## What I found

### Finding 01 (High): SSH open to the internet
The attached security group had one inbound rule exposing the management interface to everyone.

```text file=security-group-inbound flag=PUBLIC
Protocol: TCP
Port:     22
Source:   0.0.0.0/0
```

Anyone could attempt to authenticate against SSH, which is an initial access path if credentials leak or SSH has a weakness. The instance was already registered with Systems Manager (`Ping: Online`), so the public rule was not needed to keep management access.

## What I did
1. **Found the instance.** I identified the running instance by its lab tag and pulled its attached security group.
2. **Read the inbound rules.** I found TCP/22 open to `0.0.0.0/0`.
3. **Checked the alternative first.** I confirmed the SSM agent was online before touching the rule, so I would not lock myself out.
4. **Revoked public SSH.** I removed the `0.0.0.0/0` rule on port 22.

### Evidence snippets
```bash
aws ec2 revoke-security-group-ingress --group-id "$SG_ID" \
  --ip-permissions '[{"IpProtocol":"tcp","FromPort":22,"ToPort":22,"IpRanges":[{"CidrIp":"0.0.0.0/0"}]}]'
# Return: true
```

## Validation
The security group's inbound rules came back empty, and I opened a Session Manager session to the instance:

```text
Inbound rules after:   []
Session Manager:       sh-5.2$ whoami
                       ssm-user
```

## Before and after
| Control | Before | After |
| --- | --- | --- |
| SSH port 22 | Open | Removed |
| SSH source | `0.0.0.0/0` | No public rule |
| Internet-facing management | Exposed | Removed |
| Admin access | Public SSH | Session Manager |

## What I recommend
1. Do not expose management ports to the internet when another way in exists.
2. Use Session Manager for admin access where it fits.
3. If direct access is needed, restrict it to known sources.
4. Review security groups regularly for public management ports.

## What I learned
Because Session Manager was already working, I could remove public SSH without losing admin access to the instance.
