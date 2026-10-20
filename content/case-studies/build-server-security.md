---
slug: build-server-security
title: Build Server Security
track: devsecops
category: build-cicd
caseNumber: 18
breadcrumb: [Work, DevSecOps, Build]
kicker: BUILD & CI/CD
lede: A Jenkins server was exposed with default credentials and an unrestricted script console. I confirmed the authentication weakness, documented the path to server compromise, and identified the controls needed to protect build infrastructure.
platformTags: [Jenkins, CI/CD, Linux]
status: ASSESSED · VERIFIED
meta:
  domain: Build & CI/CD
  platform: Jenkins
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Server compromise path confirmed
result:
  before: Default credentials, open console
  after: Compromise path documented
tools: [Jenkins, SSH, Linux, Bash, GitLab, GitLab Runner, Jenkins Script Console]
skills: [Build Server Security, CI/CD Security, Jenkins Security, Authentication Testing, Vulnerability Assessment, Security Misconfiguration Analysis, Access Control, Network Segmentation, Least Privilege, Credential Management]
lesson: A build server should be treated as privileged infrastructure because compromising Jenkins can provide a direct pathway into the wider CI/CD environment.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: build-process-security
next: pipeline-access-gate-hardening
source: notion://3a955a66603682da8ade013202824d6b
---

## Objective
I set out to assess the authentication and access-control security of an exposed Jenkins server, determine whether default or weak credentials were in use, and evaluate what an authenticated user could reach through the Jenkins interface.

## Scenario
A Jenkins server was accessible on the internal network. Its authentication configuration had not been hardened after deployment, and the script console was available to authenticated users. I wanted to confirm whether default credentials worked and trace how far that access extended.

## What I found

### Finding 01 (Critical): Default credentials accepted
The Jenkins server accepted well-known default credentials, granting immediate authenticated access to the Jenkins dashboard and all its functionality.

```text file=jenkins-auth flag=DEFAULT_CREDS
Authentication:    Default credentials accepted
Dashboard access:  Full
Script console:    Available to authenticated user
```

### Finding 02 (Critical): Script console enabled unrestricted execution
The Jenkins script console was accessible to the authenticated account with no additional authorization gate. It allowed arbitrary command execution on the server's operating system, running under the Jenkins service account.

```text file=server-access flag=UNRESTRICTED_CONSOLE
Console access:    Authenticated users
Execution scope:   OS-level commands on Jenkins host
Service account:   jenkins
```

The combination of default credentials and an unrestricted script console gave any user who could guess the password full control of the build server.

## What I did
1. **Tested authentication.** I confirmed the Jenkins server accepted default credentials.
2. **Assessed console access.** The authenticated session had access to the Jenkins script console with no additional restrictions.
3. **Confirmed server-level access.** The script console allowed OS-level command execution under the Jenkins service account, confirming the compromise path.
4. **Documented the exposure.** I mapped the full chain from default credentials to server compromise and submitted verification.

### Evidence snippets
```text
# Authentication and access chain
Step 1:  Default credentials accepted on Jenkins login
Step 2:  Script console accessible to authenticated user
Step 3:  OS-level command execution confirmed on server
Result:  Build server compromise verified
```

## Validation
The lab verification process confirmed the build server compromise after the required proof was submitted. The full path from default credentials to OS-level access was confirmed.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Jenkins credentials | Default | Exposure documented; rotation recommended |
| Script console | Unrestricted | Risk documented; lockdown recommended |
| Authentication policy | No enforcement | Recommended: strong credentials + MFA |
| Access control | All authenticated users equal | Recommended: role-based access |
| Network exposure | Jenkins on internal network | Recommended: restrict to build network only |

## What I recommend
1. Change default credentials immediately after deploying Jenkins and enforce strong password policies.
2. Restrict or disable the script console for all but a small number of administrators.
3. Enable role-based access control so that users only see and use the Jenkins features they need.
4. Place Jenkins behind network segmentation so only build agents and authorized administrators can reach it.
5. Enable audit logging for authentication attempts and console usage.
6. Require multi-factor authentication for Jenkins administrative access.

## What I learned
A build server should be treated as privileged infrastructure because compromising Jenkins can provide a direct pathway into the wider CI/CD environment.
