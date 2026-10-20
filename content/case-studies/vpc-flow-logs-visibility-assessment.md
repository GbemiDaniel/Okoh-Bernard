---
slug: vpc-flow-logs-visibility-assessment
title: VPC Flow Logs Visibility Assessment
track: cloud
category: network-perimeter
caseNumber: 7
breadcrumb: [Work, Cloud, Network]
kicker: NETWORK & PERIMETER
lede: A VPC with two running instances had no flow logs anywhere in the account, so none of its traffic was recorded. I enabled VPC Flow Logs for all traffic into CloudWatch Logs, generated test traffic, and queried the records with Logs Insights.
platformTags: [AWS, VPC, CloudWatch, IAM]
status: ENABLED · VERIFIED
meta:
  domain: Network & perimeter
  platform: AWS VPC, CloudWatch Logs
  severity: Medium          # TODO Kachi: confirm severity
  outcome: Network visibility
result:
  before: No flow logs in the account
  after: All VPC traffic logged
tools: [AWS CLI, Amazon VPC, Amazon EC2, AWS IAM, Amazon CloudWatch Logs, VPC Flow Logs, CloudWatch Logs Insights, cURL]
skills: [Cloud Security, Network Visibility, VPC Flow Logs, Security Monitoring, Log Analysis, CloudWatch Logs Insights, Incident Investigation, AWS IAM, AWS CLI]
lesson: You cannot investigate network activity you never recorded. Flow logs give you the evidence to detect and look into suspicious traffic.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: the-forgotten-nacl
next: exposed-ec2-management-port
source: notion://cbd55a666036832091ba814f47b60a68
---

## Objective
I set out to assess how much network visibility the VPC had, and to turn on VPC Flow Logs so traffic metadata was available for monitoring, investigation and spotting rejected or suspicious connections.

## Scenario
The VPC ran two instances: `net-lab-web-server` (private IP `10.0.1.118`, with a public IP) and `net-lab-internal-app` (private IP `10.0.2.58`, no public IP). There were no flow logs on the VPC or anywhere else in the account, so scanning, rejected connections, lateral movement or unusual outbound traffic would leave no network-level record.

## What I found

### Finding 01 (Medium): No network-layer visibility
Querying for flow logs on the VPC returned nothing, and an account-wide query returned nothing either. Both instances were sending and receiving traffic with no record of it.

```text file=describe-flow-logs flag=EMPTY
|DescribeFlowLogs|
+----------------+
```

Without that telemetry there is no network evidence to investigate unexpected external connections, rejected attempts, scanning, unusual outbound traffic, possible data exfiltration or private resources reaching places they should not.

## What I did
1. **Found the VPC.** I looked it up by its `Name` tag and stored the ID.
2. **Confirmed the gap.** I queried for existing flow logs on the VPC and across the account. There were none.
3. **Listed what was unmonitored.** I enumerated the running instances in the VPC and found two.
4. **Prepared the destination.** I created the CloudWatch Logs group `/vpc/net-lab-flow-logs` and an IAM role, `net-lab-flow-logs-role`, that the VPC Flow Logs service can assume to publish records.
5. **Turned on flow logs.** I enabled them at the VPC level for `ALL` traffic, sending to CloudWatch Logs.
6. **Generated test traffic.** I sent normal and blocked-port requests to the web server.
7. **Queried the records.** In CloudWatch Logs Insights I reviewed recent records, filtered for `REJECT`, and summarised rejected traffic by source IP and destination port.

### Evidence snippets
```bash
# Normal and blocked-port traffic against the web server
curl -s http://$WEB_IP
curl -s --connect-timeout 3 http://$WEB_IP:8443
curl -s --connect-timeout 3 http://$WEB_IP:3306
```

## Validation
The flow log came up active, capturing all traffic into the new log group:

| Setting | Value |
| --- | --- |
| Status | `ACTIVE` |
| Traffic type | `ALL` |
| Destination | `cloud-watch-logs` |
| Log group | `/vpc/net-lab-flow-logs` |

The test traffic then showed up as records I could filter and summarise in Logs Insights, including the rejected connections.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| VPC Flow Logs | Not configured | Enabled |
| Traffic captured | None | `ALL` |
| Log destination | None | CloudWatch Logs |
| Rejected traffic analysis | Not possible | Queryable in Logs Insights |
| Investigation evidence | Limited | Flow log records available |

## What I recommend
1. Enable VPC Flow Logs on production VPCs that need network visibility.
2. Send them to a central logging destination.
3. Set retention to match operational and security needs.
4. Save Logs Insights queries for common investigations, such as rejected traffic by source.
5. Feed flow logs into wider monitoring and alerting.

## What I learned
You cannot investigate network activity you never recorded. Flow logs give you the evidence to detect and look into suspicious traffic.
