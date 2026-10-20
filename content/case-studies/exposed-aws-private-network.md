---
slug: exposed-aws-private-network
title: Exposed AWS Private Network
track: cloud
category: network-perimeter
caseNumber: 5
breadcrumb: [Work, Cloud, Network]
kicker: NETWORK & PERIMETER
lede: An internal API in a subnet named "private" answered requests from the internet. I traced it to a shared route table with an internet gateway route, gave the backend its own private route table, and confirmed the API still worked inside the VPC.
platformTags: [AWS, VPC, EC2, Route tables]
status: REMEDIATED · VERIFIED
meta:
  domain: Network & perimeter
  platform: AWS VPC, EC2
  severity: High            # TODO Kachi: confirm severities (Finding 02 set to Medium)
  outcome: Segmentation enforced
result:
  before: Internal API reachable from the internet
  after: Reachable inside the VPC only
tools: [AWS CLI, Amazon VPC, Amazon EC2, AWS Systems Manager Session Manager, cURL]
skills: [Cloud Security, AWS VPC, Network Segmentation, Network Security, Security Risk Assessment, Vulnerability Remediation, Security Hardening, AWS CLI]
lesson: Network segmentation has to be enforced through routing and network controls. Naming a subnet "private" does not make it private.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: the-wide-open-security-group
next: the-forgotten-nacl
source: notion://f1855a6660368223bae181ebbe7522e3
---

## Objective
I set out to check whether the separation between a public web server and an internal API was actually enforced, find what exposed the API, fix it, and confirm the two could still talk inside the VPC.

## Scenario
The design put a public web server in `room32-web-public` and an internal API server in `room32-backend-private`. I wanted to know whether the backend subnet was really cut off from direct internet access.

## What I found

### Finding 01 (High): The private subnet routed to the internet
The backend subnet was associated with `room32-shared-rt`, the same route table the public subnet used, and it carried a default route to the internet gateway.

```text file=room32-shared-rt flag=IGW_ROUTE
0.0.0.0/0  ->  Internet Gateway
```

From outside, a request to the API on port 8080 came back with the API's response. The workload meant for VPC-only traffic was directly reachable from the internet. The root cause was the missing dedicated private route table.

### Finding 02 (Medium): Public IPs handed out automatically
The backend subnet had `MapPublicIpOnLaunch` enabled, so the API instance had been given a public IP. Together with the route above, that made it addressable from anywhere.

## What I did
1. **Checked the subnets.** I listed the VPC subnets and their `MapPublicIpOnLaunch` setting.
2. **Read the backend route table.** I found the shared table and its internet gateway route.
3. **Found the public IP.** I listed the running instances and saw the public IP on `room32-internal-api`.
4. **Proved the exposure.** A request from the internet to port 8080 returned the internal API's response.
5. **Gave the backend its own route table.** I created `room32-private-rt`, confirmed it held only the local VPC route, and swapped the backend subnet onto it.
6. **Stopped automatic public IPs.** I disabled `MapPublicIpOnLaunch` on the backend subnet.

## Validation
The new route table holds only the local route, and the subnet no longer assigns public IPs. A request from the internet now gets no response, while the web server can still reach the API on its private IP:

```text
room32-private-rt:      10.0.0.0/16  ->  local
MapPublicIpOnLaunch:    False
From the internet:      no response
From the web server:    curl -s http://10.0.2.10:8080  ->  API responds
```

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Backend route table | Shared with the public subnet | Dedicated private table |
| Internet gateway route | `0.0.0.0/0` to IGW | Removed |
| Public IP auto-assignment | Enabled | Disabled |
| API from the internet | Reachable | No response |
| API inside the VPC | Working | Working |

## What I recommend
1. Give private workloads their own route tables.
2. Turn off automatic public IP assignment on private subnets.
3. Review VPC routing regularly for unintended internet paths.
4. Test that the deployed network matches the intended segmentation, not just the names.

## What I learned
Network segmentation has to be enforced through routing and network controls. Naming a subnet "private" does not make it private.
