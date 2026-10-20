---
slug: docker-hardening-and-security-controls
title: Docker Hardening and Security Controls
track: devsecops
category: containers-kubernetes
caseNumber: 29
breadcrumb: [Work, DevSecOps, Containers]
kicker: CONTAINERS & KUBERNETES
lede: I reviewed the layered security controls available for Docker, from secure daemon access and cgroup resource limits to least-privilege capabilities, seccomp, AppArmor, and image review, and validated each control on a running environment.
platformTags: [Docker, Linux, AppArmor, Seccomp]
status: REVIEWED · VALIDATED
meta:
  domain: Containers & Kubernetes
  platform: Docker, Linux
  severity: Medium          # TODO Kachi: confirm severity
  outcome: Layered controls validated
result:
  before: Controls not assessed
  after: Each layer reviewed and validated
tools: [Docker, Docker Engine, Docker Contexts, SSH, TLS, cgroups, Docker Inspect, Linux Capabilities, capsh, Seccomp, AppArmor, aa-status, apparmor_parser, Docker Images, Dockerfiles, Linux]
skills: [Docker Security, Container Security, DevSecOps, Linux Security, Access Control, Least Privilege, Security Hardening, Vulnerability Assessment, Container Runtime Security, Linux Capabilities, Seccomp, AppArmor, Resource Management, Docker Engine Security, Docker Image Security, Dockerfile Security]
lesson: Docker security is a layered process. Secure daemon access, resource controls, least-privilege capabilities, seccomp, AppArmor, and image review work together to reduce the risk of container compromise and host impact.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: container-isolation-namespaces
next: iac-pipeline-provisioning
source: notion://92055a66603682f2aa4c018fa7ddd709
---

## Objective
I set out to review and validate the layered security controls available for Docker containers, covering daemon access, resource limits, capabilities, system call filtering, mandatory access control, and image security.

## Scenario
A Docker environment needed a security baseline. Rather than focusing on a single weakness, I reviewed each layer of Docker security to understand what controls were available, how they worked, and how to validate them. The goal was to build a practical reference for hardening Docker deployments.

## What I found

### Finding 01 (Medium): Multiple control layers available but not uniformly applied
The Docker environment had controls available at each layer, but not all were configured or enforced. The review covered six areas: daemon access, resource limits, capabilities, seccomp, AppArmor, and image security.

```text file=control-layers flag=REVIEW
Daemon access:       SSH contexts and TLS available
Resource limits:     cgroups (CPU/memory) configurable
Capabilities:        Full set by default; drop/add available
Seccomp:             Profiles available but not reviewed
AppArmor:            Profiles loadable via apparmor_parser
Image security:      Dockerfile and layer review possible
```

## What I did
1. **Reviewed daemon access.** I assessed SSH-based Docker contexts for remote management and TLS for encrypted, authenticated API communication.
2. **Reviewed resource controls.** I inspected cgroup limits for CPU and memory using `docker inspect`. A value of `0` indicated no limit was configured.
3. **Reviewed capabilities.** I assessed privileged containers versus the recommended approach of dropping all capabilities and adding only specific ones. I used `capsh --print` to display assigned capabilities.
4. **Reviewed system call filtering.** I assessed seccomp profiles for restricting the system calls available to container processes.
5. **Reviewed mandatory access control.** I assessed AppArmor profiles using `aa-status` and `apparmor_parser` for restricting application resource access.
6. **Reviewed image security.** I inspected Dockerfiles and image layers to identify potentially insecure build practices or suspicious commands.

### Evidence snippets
```text
# Control validation summary
docker context create:  SSH-based remote management configured
docker inspect:         Resource limits reviewed (CPU, memory)
capsh --print:          Capability sets displayed and assessed
aa-status:              AppArmor profiles reviewed
Dockerfile review:      Image layers inspected for insecure practices
```

## Validation
Each control layer was reviewed and validated on the running environment:

| Layer | Control | Validated |
| --- | --- | --- |
| Daemon access | SSH contexts, TLS | Yes |
| Resource limits | cgroups (CPU, memory) | Yes |
| Capabilities | Drop all, add specific | Yes |
| Seccomp | System call restriction | Yes |
| AppArmor | Resource access restriction | Yes |
| Image security | Dockerfile and layer review | Yes |

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Daemon access | Not assessed | SSH and TLS options validated |
| Resource limits | Not configured (0) | cgroup controls reviewed |
| Capabilities | Full set (default) | Least-privilege approach documented |
| Seccomp | Not assessed | Profile application reviewed |
| AppArmor | Not assessed | Profile loading and status reviewed |
| Image security | Not assessed | Dockerfile and layer review completed |

## What I recommend
1. Use SSH-based Docker contexts or mutual TLS for all remote Docker management, never an unauthenticated TCP socket.
2. Set CPU and memory limits on every container using cgroups to prevent resource exhaustion.
3. Drop all capabilities by default and add only the ones the application needs.
4. Apply seccomp profiles to restrict system calls to the minimum set required.
5. Load and enforce AppArmor profiles to limit what container processes can access on the host.
6. Review Dockerfiles and image layers before deploying, and scan images for known vulnerabilities.

## What I learned
Docker security is a layered process. Secure daemon access, resource controls, least-privilege capabilities, seccomp, AppArmor, and image review work together to reduce the risk of container compromise and host impact.
