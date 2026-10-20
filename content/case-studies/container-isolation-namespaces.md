---
slug: container-isolation-namespaces
title: "Container Isolation: Namespaces"
track: devsecops
category: containers-kubernetes
caseNumber: 28
breadcrumb: [Work, DevSecOps, Containers]
kicker: CONTAINERS & KUBERNETES
lede: A Docker container shared the host's PID namespace, letting processes inside it see and interact with host processes. I confirmed the namespace boundary was weakened and traced the path to host-level access through nsenter.
platformTags: [Docker, Linux, Namespaces]
status: ASSESSED · VERIFIED
meta:
  domain: Containers & Kubernetes
  platform: Docker, Linux namespaces
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Namespace escape path confirmed
result:
  before: Shared PID namespace
  after: Escape path documented
tools: [Docker, Linux, Linux Namespaces, Bash, ps, readlink, nsenter, /proc, Linux Process Management, Container Runtime]
skills: [Container Security, Docker Security, Linux Security, Linux Namespace Isolation, Container Escape, Privilege Escalation, Vulnerability Assessment, Security Misconfiguration Analysis, Host Isolation, Container Runtime Security, Access Control, Privilege Management]
lesson: Linux namespaces are a fundamental part of Docker isolation, and weakening those boundaries can allow a container process to interact with the host and ultimately escape the container security boundary.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: docker-engine-tcp-socket-exposure
next: docker-hardening-and-security-controls
source: notion://d9455a6660368262a53c8173152d8593
---

## Objective
I set out to assess whether a Docker container's Linux namespace isolation was properly configured, and whether a weakened boundary could allow a container process to interact with host processes and escape the container.

## Scenario
A Docker container was running with access to the host's PID namespace, meaning processes inside the container could see host-level processes. I wanted to determine whether this shared namespace could be exploited to cross the container isolation boundary and access the host filesystem.

## What I found

### Finding 01 (Critical): Container could see host processes
The container's process list included the host's PID 1 (`systemd`), confirming the PID namespace was shared. The container's mount and network namespaces had different identifiers from the host's, but the shared PID namespace gave visibility into the host's process tree.

```text file=namespace-comparison flag=SHARED_PID
Host PID 1:               /sbin/init (systemd)
Visible from container:   Yes
Container mount ns:       mnt:[<REDACTED>]
Host mount ns:            mnt:[<REDACTED>]
```

### Finding 02 (Critical): nsenter allowed host namespace access
With visibility of the host's PID 1, the container could use `nsenter` to enter the host's mount, UTS, IPC, and network namespaces. This gave full access to the host filesystem and process tree.

```text file=namespace-escape flag=HOST_ACCESS
Target PID:          1 (host systemd)
Namespaces entered:  mount, UTS, IPC, network
Host filesystem:     Fully accessible
Host hostname:       Confirmed different from container
```

## What I did
1. **Compared process trees.** I listed processes inside the container and confirmed host PID 1 was visible.
2. **Compared namespace identifiers.** I used `/proc` to compare namespace IDs between PID 1 and the container process, confirming the PID namespace was shared.
3. **Tested namespace entry.** I used `nsenter` targeting PID 1 to enter the host's mount, UTS, IPC, and network namespaces.
4. **Confirmed host access.** The hostname, process list, and filesystem all matched the host, not the container.

### Evidence snippets
```text
# Namespace isolation assessment
Container PID list:     Includes host PID 1 (systemd)
Namespace comparison:   Different mount/network ns, shared PID ns
nsenter target:         PID 1 (mount, UTS, IPC, network)
Result:                 Host filesystem and processes accessible
```

## Validation
After entering the host namespaces, the hostname matched the host, the process list showed all host processes, and the host filesystem was accessible. The container escape through namespace weakening was confirmed.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| PID namespace | Shared with host | Escape documented; isolation recommended |
| Host process visibility | Container sees host PID 1 | Recommended: separate PID namespace |
| nsenter access | Available to container | Recommended: restrict with seccomp/AppArmor |
| Namespace isolation | Weakened | Recommended: full namespace separation |

## What I recommend
1. Never share the host PID namespace with application containers (`--pid=host` should be avoided).
2. Use separate namespaces for PID, mount, UTS, IPC, and network unless there is a documented requirement.
3. Restrict `nsenter` and similar tools inside containers using seccomp profiles.
4. Apply AppArmor or SELinux profiles to prevent container processes from accessing `/proc` entries of other namespaces.
5. Monitor container configurations for shared namespaces and alert on new instances.

## What I learned
Linux namespaces are a fundamental part of Docker isolation, and weakening those boundaries can allow a container process to interact with the host and ultimately escape the container security boundary.
