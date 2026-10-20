---
slug: on-prem-iac-pipeline-assessment
title: On-Prem IaC Pipeline Assessment
track: devsecops
category: infrastructure-as-code
caseNumber: 31
breadcrumb: [Work, DevSecOps, IaC]
kicker: INFRASTRUCTURE AS CODE
lede: An on-premises IaC pipeline had insecure provisioning defaults, including shared directories, stored SSH keys, and unrestricted sudo. I traced the full path from the web application to root on the provisioning host and identified the hardening controls needed at each step.
platformTags: [Vagrant, Ansible, Docker, SSH, Linux]
status: ASSESSED · VERIFIED
meta:
  domain: Infrastructure as Code
  platform: Vagrant, Ansible, Docker
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Full attack path documented
result:
  before: Shared dirs, stored keys, sudo ALL
  after: Attack path documented
tools: [Vagrant, Ansible, Docker, SSH, Nmap, Bash, Linux, Infrastructure as Code]
skills: [Infrastructure as Code Security, Vulnerability Assessment, DevSecOps, Vagrant, Ansible, Docker Security, Linux Security, SSH Security, Credential Security, Access Control, Least Privilege, Security Hardening, Attack Path Analysis, Container Security, Infrastructure Security]
lesson: An IaC pipeline is not inherently secure simply because infrastructure deployment is automated. Every credential, shared directory, privilege, and provisioning action becomes part of the attack surface and must be deliberately hardened.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: iac-pipeline-provisioning
next: terraform-cloud-iac-hardening
source: notion://da855a666036835bbf78013408e153dc
---

## Objective
I set out to identify vulnerabilities within an on-premises IaC pipeline and determine how insecure provisioning configurations could allow an attacker to move from the web application to root access on the provisioning host.

## Scenario
An on-premises environment used Vagrant, Docker, and Ansible to provision a web application and database. The Vagrantfile and provisioning configuration contained several security weaknesses. I wanted to trace whether those weaknesses could be chained into a full path from the web application to the host operating system.

## What I found

### Finding 01 (Critical): Web application vulnerable to command injection
The web application's database testing endpoint accepted unsanitised input, which allowed command execution inside the web container. The container ran as root.

```text file=web-container flag=COMMAND_INJECTION
Endpoint:            /api/testDB
Vulnerability:       Command injection
Container user:      root
```

### Finding 02 (Critical): SSH key and shared directory exposed in container
The web container had access to an SSH private key stored in the provisioning directory and a shared `/tmp/datacopy` directory that bridged the container and the host.

```text file=container-exposure flag=KEY_EXPOSED
SSH key:             Stored in provisioning directory (accessible from container)
Shared directory:    /tmp/datacopy (host-to-container mount)
```

### Finding 03 (Critical): Provisioning user had unrestricted sudo
The provisioning user on the host had `NOPASSWD: ALL` sudo privileges, meaning any access to that account gave full root control of the host.

```text file=sudo-config flag=SUDO_ALL
User:                <REDACTED> (provisioning user)
Sudo privileges:     (ALL : ALL) ALL, (ALL) NOPASSWD: ALL
Root access:         Immediate via sudo
```

The full chain ran from command injection in the web app, to an SSH key in the container, to the provisioning user on the host, to root through unrestricted sudo.

## What I did
1. **Reviewed the Vagrantfile.** I identified Docker networking, shared directories, SSH configuration, deployment keys, and privileged provisioning settings.
2. **Assessed the web application.** The database testing endpoint was vulnerable to command injection, providing root access inside the web container.
3. **Enumerated the container.** I found an SSH private key in the provisioning directory and a shared directory linking the container to the host.
4. **Traced the path to the host.** The SSH key and shared directory allowed authenticated access to the provisioning user on the host.
5. **Confirmed root access.** The provisioning user's unrestricted sudo privileges provided immediate root access to the host.

### Evidence snippets
```text
# Attack path summary
Step 1:  Command injection in web app (/api/testDB)
Step 2:  Root shell in web container
Step 3:  SSH key found in provisioning directory
Step 4:  Authenticated to host as provisioning user
Step 5:  Unrestricted sudo to root on provisioning host
```

## Validation
The full path from web application to root on the provisioning host was confirmed. Each step was reproducible through the insecure provisioning configuration.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Web application input | Unsanitised | Risk documented; input validation recommended |
| Container user | Root | Recommended: non-root user |
| SSH keys in container | Accessible | Recommended: remove from container, use agent forwarding |
| Shared directories | Host-to-container mount | Recommended: remove or restrict |
| Provisioning user sudo | NOPASSWD: ALL | Recommended: scoped sudo with specific commands only |
| Network segmentation | Not enforced | Recommended: isolate provisioning network |

## What I recommend
1. Sanitise all application inputs, especially endpoints that interact with databases or system commands.
2. Run containers as non-root users and avoid storing credentials inside containers.
3. Remove SSH keys and sensitive files from provisioning directories that are mounted into containers.
4. Restrict sudo privileges for provisioning users to only the specific commands they need.
5. Isolate the provisioning network from the application network.
6. Review Vagrantfiles and Ansible playbooks for hardcoded credentials, shared directories, and elevated privileges before deployment.

## What I learned
An IaC pipeline is not inherently secure simply because infrastructure deployment is automated. Every credential, shared directory, privilege, and provisioning action becomes part of the attack surface and must be deliberately hardened.
