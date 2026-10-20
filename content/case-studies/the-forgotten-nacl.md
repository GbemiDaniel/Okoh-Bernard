---
slug: the-forgotten-nacl
title: The Forgotten NACL
track: cloud
category: network-perimeter
caseNumber: 6
breadcrumb: [Work, Cloud, Network]
kicker: NETWORK & PERIMETER
lede: Both tiers of a two-tier VPC shared the default network ACL, which allowed everything in and out. I replaced it with dedicated public and private NACLs scoped to the app's real traffic, and checked the site still loaded.
platformTags: [AWS, VPC, NACL, EC2]
status: REMEDIATED · VERIFIED
meta:
  domain: Network & perimeter
  platform: AWS VPC, Network ACLs
  severity: Medium          # TODO Kachi: confirm severity
  outcome: Defence in depth
result:
  before: Allow all, on both subnets
  after: Two scoped NACLs, one per tier
tools: [AWS CLI, Amazon VPC, Amazon EC2, AWS Systems Manager Session Manager, Network ACLs, cURL]
skills: [Cloud Security, AWS VPC, Network ACLs, Network Segmentation, Defence in Depth, Security Hardening, Security Risk Assessment, Vulnerability Remediation, AWS CLI]
lesson: Network ACLs are a subnet-level control that backs up instance-level security groups. Configured properly, they add a real second layer of defence.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: exposed-aws-private-network
next: vpc-flow-logs-visibility-assessment
source: notion://d5355a66603683c8819b0199ea8b8488
---

## Objective
I set out to check whether network ACLs gave the two-tier VPC a second layer of protection, and to replace the default configuration with dedicated subnet-level controls for each tier.

## Scenario
`room33-vpc` had a public subnet (`10.0.1.0/24`) for the web server and a private subnet (`10.0.2.0/24`) for the backend. The security groups were already scoped: `room33-web-sg` allowed HTTP on 80 from anywhere, and `room33-backend-sg` allowed 8080 only from the web server's security group. Both subnets, though, were still on the default network ACL.

## What I found

### Finding 01 (Medium): The default NACL allowed everything
The default NACL was associated with both subnets, and its rule 100 allowed all inbound and all outbound traffic.

```text file=default-nacl flag=ALLOW_ALL
Rule 100   inbound    all traffic   0.0.0.0/0   ALLOW
Rule 100   outbound   all traffic   0.0.0.0/0   ALLOW
Rule 32767 inbound    all traffic   0.0.0.0/0   DENY   (never reached)
```

Because rule 100 matched first, the implicit deny was never reached. The security groups still filtered at the instance level, but the subnet boundary added nothing. If a security group were ever misconfigured, there would be no second layer between the public and private tiers.

## What I did
1. **Mapped the VPC.** I inspected the VPC, its subnets, their NACL associations and the security groups.
2. **Confirmed the shared default.** Both subnets were on the default NACL with allow-all rules in both directions.
3. **Built a public NACL.** `room33-public-nacl` allows web traffic in and out, ephemeral return traffic, and 8080 out to the private subnet only.
4. **Built a private NACL.** `room33-private-nacl` allows 8080 in from the public subnet only, plus the return traffic it needs.
5. **Swapped the associations.** Each subnet moved to its own NACL, leaving the default NACL attached to nothing.

### Evidence snippets
```text file=room33-public-nacl
Inbound    TCP 80, 443       from 0.0.0.0/0
Inbound    TCP 1024-65535    from 0.0.0.0/0
Outbound   TCP 80, 443       to   0.0.0.0/0
Outbound   TCP 8080          to   10.0.2.0/24
Outbound   TCP 1024-65535    to   0.0.0.0/0
```

```text file=room33-private-nacl
Inbound    TCP 8080          from 10.0.1.0/24
Inbound    TCP 1024-65535    from 10.0.0.0/16
Outbound   TCP 1024-65535    to   10.0.1.0/24
Outbound   TCP 443           to   10.0.0.0/16
```

## Validation
The web server still served its page after the change, and the associations moved as planned:

| Check | Result |
| --- | --- |
| Web page loads (`curl` to the web server) | Returned the expected HTML |
| `room33-public-nacl` | 1 subnet |
| `room33-private-nacl` | 1 subnet |
| Default NACL | 0 subnets |

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Public subnet NACL | Default | Dedicated public NACL |
| Private subnet NACL | Default | Dedicated private NACL |
| Inbound filtering | Allow all | Scoped rules |
| Outbound filtering | Allow all | Scoped rules |
| Default NACL associations | 2 subnets | 0 subnets |

## What I recommend
1. Give public and private tiers their own NACLs.
2. Do not rely on the default allow-all NACL for production workloads.
3. Keep NACL rules scoped to the traffic the application needs.
4. Review NACLs and security groups together, as two layers of the same boundary.

## What I learned
Network ACLs are a subnet-level control that backs up instance-level security groups. Configured properly, they add a real second layer of defence.
