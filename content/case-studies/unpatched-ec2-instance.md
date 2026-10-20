---
slug: unpatched-ec2-instance
title: Unpatched EC2 Instance
track: cloud
category: secure-compute
caseNumber: 9
breadcrumb: [Work, Cloud, Compute]
kicker: SECURE COMPUTE
lede: An EC2 instance was 21 patches behind. I measured the gap with a Patch Manager scan, installed the missing patches through Run Command, and confirmed the instance reached zero missing and zero failed.
platformTags: [AWS, EC2, Systems Manager, Patch Manager]
status: REMEDIATED · VERIFIED
meta:
  domain: Secure compute
  platform: AWS EC2, Systems Manager
  severity: Medium          # TODO Kachi: confirm severity
  outcome: Patch compliant
result:
  before: 21 missing patches
  after: 0 missing, 0 failed
tools: [AWS CLI, Amazon EC2, AWS Systems Manager, Systems Manager Patch Manager, AWS-RunPatchBaseline]
skills: [Cloud Security, Patch Management, AWS Systems Manager, EC2 Security, Vulnerability Assessment, Vulnerability Remediation, Security Posture Improvement, AWS CLI]
lesson: Patching should be measured with a compliance scan and verified afterwards, so the patch debt is a number, not a guess.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: exposed-ec2-management-port
next: imdsv1-exposure-and-imdsv2-remediation
source: notion://cce55a666036821bb311812924da4bd9
---

## Objective
I set out to measure the patch compliance of a running EC2 instance, put a number on its missing patches, install them, and confirm it reached a compliant state.

## Scenario
The instance was managed by Systems Manager and its agent was online, so Patch Manager could scan and patch it. Before I could judge its state I needed a fresh compliance record, so I started with a scan.

## What I found

### Finding 01 (Medium): 21 missing patches
The `AWS-RunPatchBaseline` scan completed successfully and showed the instance was behind.

```text file=patch-state-before flag=21_MISSING
Failed     Installed     Missing
0          120           21
```

Unpatched systems stay exposed to known vulnerabilities until the fixes are installed. Here the gap was concrete: 21 missing patches on one instance.

## What I did
1. **Found the instance.** I identified it by its lab tag.
2. **Checked it was managed.** I confirmed it was registered with Systems Manager and the agent was online.
3. **Scanned.** I ran `AWS-RunPatchBaseline` with `Operation=Scan`, which completed with `Status: Success`.
4. **Read the patch state.** I queried the result and found 21 missing patches.
5. **Installed.** I ran the same document with `Operation=Install` through Run Command. It completed with `Status: Success`.
6. **Rechecked.** I queried the patch state again after the install.

## Validation
After the install, the instance reported no missing and no failed patches:

```text file=patch-state-after
Failed     Installed     Missing
0          142           0
```

## Before and after
| Patch compliance | Before | After |
| --- | --- | --- |
| Installed patches | 120 | 142 |
| Missing patches | 21 | 0 |
| Failed patches | 0 | 0 |
| Operation | Scan | Install |
| SSM status | Online | Online |

## What I recommend
1. Scan EC2 workloads for missing patches on a schedule.
2. Set a defined patching cadence for production.
3. Watch patch compliance and chase instances that stay behind.
4. Verify the patch state after installing, instead of assuming it worked.
5. Prioritise security patches by severity and exposure.

## What I learned
Patching should be measured with a compliance scan and verified afterwards, so the patch debt is a number, not a guess.
