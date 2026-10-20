---
slug: the-wide-open-security-group
title: The Wide-Open Security Group
track: cloud
category: network-perimeter
caseNumber: 4
breadcrumb: [Work, Cloud, Network]
kicker: NETWORK & PERIMETER
lede: A web server and its database had SSH and MySQL open to the whole internet. I closed both, limited the database to the web app's security group, and checked the app and its database connection still worked.
platformTags: [AWS, EC2, Security Groups, SSM]
status: REMEDIATED · VERIFIED
meta:
  domain: Network & perimeter
  platform: AWS EC2, Security Groups
  severity: High            # TODO Kachi: confirm severities
  outcome: Attack surface reduced
result:
  before: SSH and MySQL open to 0.0.0.0/0
  after: HTTP only, database from the app
tools: [AWS CLI, Amazon EC2, AWS Security Groups, AWS Systems Manager Session Manager, Netcat]
skills: [Cloud Security, AWS Security Groups, EC2 Security, Network Security, Least Privilege, Attack Surface Reduction, Security Hardening, Security Validation, AWS CLI]
lesson: A security group should expose only the traffic the application needs. Internal services such as databases belong behind the application, not on the public internet.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: aws-iam-compromise-investigation
next: exposed-aws-private-network
source: notion://0c755a66603682fabae581f464ee81ce
---

## Objective
I set out to find risky security group rules on a web application and its database, cut the network exposure down to what the app needs, and confirm the app could still reach its database afterwards.

## Scenario
The environment had a public-facing web server and a database server in a private subnet. The web server's security group allowed SSH, HTTP and MySQL from `0.0.0.0/0`, and the database's security group also allowed MySQL from `0.0.0.0/0`.

## What I found

### Finding 01 (High): SSH open to the internet
The web server's security group accepted SSH on TCP/22 from any IPv4 address, which widened the server's management attack surface for no reason.

```text file=web-app-sg flag=PUBLIC
TCP/22    SSH     0.0.0.0/0
TCP/80    HTTP    0.0.0.0/0
TCP/3306  MySQL   0.0.0.0/0
```

### Finding 02 (High): MySQL open to the internet
Both the web server's and the database's security groups accepted MySQL on TCP/3306 from `0.0.0.0/0`. The database was reachable from the whole internet instead of only from the application that uses it.

## What I did
1. **Found the instances.** I listed the running EC2 instances and identified the web server and the database.
2. **Read the inbound rules.** I inspected both security groups with the AWS CLI and found the public SSH and MySQL rules.
3. **Closed public SSH and MySQL on the web server.** HTTP stayed open because the app needs it.
4. **Locked the database to the app.** I removed the `0.0.0.0/0` MySQL rule and added one that allows TCP/3306 only from the web server's security group.
5. **Moved admin access to Session Manager.** Systems Manager replaced SSH for administering the web instance.

## Validation
The web server's security group now shows HTTP as its only inbound service. The app still answered, and the database still accepted connections from the web server through the new rule:

```bash
curl -s http://<PUBLIC_IP>
# Status: Application is running normally.

nc -v 10.0.2.10 3306 -w 3
# Ncat: Connected to 10.0.2.10:3306.
```

## Before and after
| Rule | Before | After |
| --- | --- | --- |
| Web app SSH 22 | From `0.0.0.0/0` | Removed |
| Web app HTTP 80 | From `0.0.0.0/0` | Kept |
| Web app MySQL 3306 | From `0.0.0.0/0` | Removed |
| Database MySQL 3306 | From `0.0.0.0/0` | Web app security group only |

## What I recommend
1. Do not expose admin access such as SSH to the whole internet; use Session Manager or a restricted source.
2. Keep databases private and allow access only from the resources that need them.
3. Use security group references for app-to-database traffic.
4. Prefer HTTPS on 443 over HTTP on 80 for public web apps.
5. Review security group rules regularly for public exposure.

## What I learned
A security group should expose only the traffic the application needs. Internal services such as databases belong behind the application, not on the public internet.
