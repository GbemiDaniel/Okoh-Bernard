---
slug: docker-socket-exposure
title: Docker Socket Exposure
track: devsecops
category: containers-kubernetes
caseNumber: 26
breadcrumb: [Work, DevSecOps, Containers]
kicker: CONTAINERS & KUBERNETES
lede: A container had the Docker socket mounted inside it, giving any process in the container full control of the Docker Engine. I confirmed the escape path by creating a new container with the host filesystem mounted and identified the controls to prevent socket exposure.
platformTags: [Docker, Linux, Unix Sockets]
status: ASSESSED · VERIFIED
meta:
  domain: Containers & Kubernetes
  platform: Docker, Linux
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Socket escape path confirmed
result:
  before: Docker socket mounted in container
  after: Escape path documented
tools: [Docker, Docker Engine, Linux, Unix Sockets, Alpine Linux, Bash, Bind Mounts, Container Runtime]
skills: [Docker Security, Container Security, Container Escape, Linux Security, Unix Socket Security, Docker Engine Security, Privilege Escalation, Vulnerability Assessment, Host Isolation, Access Control, Least Privilege, Container Runtime Security]
lesson: The Docker socket is not just a communication interface. Access to it can provide effective control over the Docker Engine and potentially allow a compromised container to cross the host isolation boundary.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: container-isolation-cgroups
next: docker-engine-tcp-socket-exposure
source: notion://6b955a666036821eb94c81f70c96cc03
---

## Objective
I set out to assess whether a Docker socket mounted inside a container could allow an attacker to interact with the Docker Engine and access the underlying host filesystem.

## Scenario
A container had `/var/run/docker.sock` mounted as a volume, which is sometimes done for monitoring or management tools. I wanted to determine whether this access could be used to escape the container and reach the host.

## What I found

### Finding 01 (Critical): Docker socket accessible from inside the container
The Docker Unix socket was mounted at `/var/run/docker.sock` inside the container, and the container's user had permission to interact with it.

```text file=socket-permissions flag=SOCKET_EXPOSED
Socket path:         /var/run/docker.sock
Permissions:         rw-rw---- (root:docker group)
Container access:    Full Docker Engine control
```

### Finding 02 (Critical): Container could create new containers with host filesystem access
With access to the Docker socket, the container could instruct the Docker Engine to create a new container with the host's root filesystem bind-mounted. This provided direct access to the host filesystem from inside the new container.

```text file=escape-result flag=HOST_ACCESS
New container:       Alpine with host / mounted at /mnt
Host filesystem:     Fully accessible
Escape method:       Docker socket to Engine to new container
```

Any process that can reach the Docker socket effectively has root-equivalent access to the host.

## What I did
1. **Confirmed socket access.** I verified that `/var/run/docker.sock` was mounted and accessible from inside the container.
2. **Checked available images.** The Alpine image was available locally on the Docker Engine.
3. **Tested the escape path.** I used the Docker CLI to create a new container with the host filesystem bind-mounted and confirmed full host access.
4. **Documented the exposure.** The Docker socket mount gave the container root-equivalent access to the host.

### Evidence snippets
```text
# Socket exposure assessment
Socket:            /var/run/docker.sock (mounted in container)
Docker Engine:     Accessible via socket
Escape:            New container created with host filesystem mounted
Host access:       Confirmed (root filesystem readable)
```

## Validation
A new container with the host filesystem mounted was created through the Docker socket, and host-level files were accessible. The escape path was confirmed.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Docker socket mount | Exposed inside container | Escape documented; removal recommended |
| Container access to Engine | Full control | Recommended: remove socket mount |
| Host filesystem | Accessible via new container | Recommended: no bind mounts of / |
| Socket permissions | Read-write | Recommended: do not mount into application containers |

## What I recommend
1. Never mount the Docker socket into application containers. If monitoring tools need it, use a read-only socket proxy with restricted API access.
2. Run containers with the minimum privileges needed; do not add users to the docker group inside containers.
3. Use container runtimes that do not expose the management socket to workloads (such as rootless Docker or Podman).
4. Monitor for containers that mount `/var/run/docker.sock` and alert on new instances.
5. Review all container configurations for unnecessary volume mounts.

## What I learned
The Docker socket is not just a communication interface. Access to it can provide effective control over the Docker Engine and potentially allow a compromised container to cross the host isolation boundary.
