---
slug: container-isolation-cgroups
title: "Container Isolation: cgroups"
track: devsecops
category: containers-kubernetes
caseNumber: 25
breadcrumb: [Work, DevSecOps, Containers]
kicker: CONTAINERS & KUBERNETES
lede: A privileged Docker container had extensive Linux capabilities, including cap_sys_admin. I confirmed the container could cross the host isolation boundary through the cgroup release_agent mechanism and identified the runtime controls needed to prevent it.
platformTags: [Docker, Linux, cgroups]
status: ASSESSED · VERIFIED
meta:
  domain: Containers & Kubernetes
  platform: Docker, Linux cgroups
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Container escape path confirmed
result:
  before: Privileged container, cap_sys_admin
  after: Escape path documented
tools: [Docker, Linux, Linux Capabilities, capsh, cgroups, Bash, mount, Docker Container Runtime, Shell Scripting]
skills: [Container Security, Docker Security, Linux Security, Linux Capabilities, Privilege Escalation, Vulnerability Assessment, Security Hardening, Access Control, Privilege Management, Host Isolation, Container Runtime Security]
lesson: Container isolation depends heavily on runtime privileges. Giving a container excessive Linux capabilities can turn a container compromise into a host compromise.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: kubernetes-secrets-and-rbac-hardening
next: docker-socket-exposure
source: notion://4f955a666036821f9bdc816e928c8f16
---

## Objective
I set out to assess whether a privileged Docker container could escape its isolation boundary by exploiting excessive Linux capabilities, specifically `cap_sys_admin`.

## Scenario
A Docker container was running in privileged mode with the full set of Linux capabilities. I wanted to determine whether those capabilities allowed a process inside the container to interact with the host operating system and cross the container isolation boundary.

## What I found

### Finding 01 (Critical): Container had excessive Linux capabilities
The container was running with the full capability set, including `cap_sys_admin`, which grants the ability to mount filesystems and manipulate cgroups.

```text file=capabilities flag=EXCESSIVE_CAPS
Container mode:      Privileged
cap_sys_admin:       Granted
Full capability set: Granted
```

### Finding 02 (Critical): cgroup release_agent allowed host-level execution
With `cap_sys_admin`, the container could mount a cgroup filesystem, create a child cgroup, and configure the `release_agent` mechanism. When the cgroup was triggered, the release agent executed on the host, not inside the container.

```text file=escape-path flag=HOST_EXECUTION
Mechanism:           cgroup release_agent
Execution context:   Host operating system
Trigger:             cgroup release notification
Result:              Host filesystem accessible from container
```

The escape path was confirmed by retrieving host-level data from inside the container.

## What I did
1. **Enumerated capabilities.** I used `capsh --print` inside the container and confirmed the full capability set, including `cap_sys_admin`.
2. **Assessed the cgroup mechanism.** The container could mount a cgroup filesystem and configure `notify_on_release` and `release_agent` on a child cgroup.
3. **Confirmed the escape.** The release agent executed on the host, making host-level data accessible from inside the container.
4. **Documented the missing controls.** The container should not have been running in privileged mode, and `cap_sys_admin` should not have been granted.

### Evidence snippets
```text
# Capability assessment
capsh --print output:  Full capability set including cap_sys_admin
Container mode:        Privileged (all capabilities granted)
Escape mechanism:      cgroup release_agent executing on host
```

## Validation
The cgroup release_agent mechanism executed on the host operating system, and host-level data was retrieved from inside the container. The container escape was confirmed.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Container mode | Privileged | Escape documented; non-privileged recommended |
| Linux capabilities | Full set | Recommended: drop all, add only what is needed |
| `cap_sys_admin` | Granted | Recommended: never grant unless required |
| cgroup access | Unrestricted | Recommended: restrict with seccomp/AppArmor |
| Host isolation | Bypassed | Recommended: enforce with minimal capabilities |

## What I recommend
1. Never run containers in privileged mode unless there is a documented and approved requirement.
2. Drop all capabilities by default and add only the specific ones the application needs (`--cap-drop ALL --cap-add <specific>`).
3. Use seccomp profiles to restrict the system calls available inside the container.
4. Apply AppArmor or SELinux profiles to limit what the container process can access.
5. Monitor for containers running with `cap_sys_admin` or in privileged mode and alert on new instances.

## What I learned
Container isolation depends heavily on runtime privileges. Giving a container excessive Linux capabilities can turn a container compromise into a host compromise.
