---
slug: docker-engine-tcp-socket-exposure
title: Docker Engine TCP Socket Exposure
track: devsecops
category: containers-kubernetes
caseNumber: 27
breadcrumb: [Work, DevSecOps, Containers]
kicker: CONTAINERS & KUBERNETES
lede: A Docker Engine was listening on TCP port 2375 without authentication, letting any host on the network list containers, pull images, and control the daemon. I confirmed the unauthenticated access and identified the controls to secure remote Docker management.
platformTags: [Docker, Nmap, Linux]
status: ASSESSED · VERIFIED
meta:
  domain: Containers & Kubernetes
  platform: Docker Engine, TCP
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Unauthenticated remote access confirmed
result:
  before: Open TCP socket, no auth
  after: Exposure documented
tools: [Nmap, cURL, Docker CLI, Docker Engine, TCP Sockets, Linux, Docker API, Container Runtime]
skills: [Docker Security, Container Security, Network Security, Vulnerability Assessment, Network Enumeration, Service Enumeration, Docker Engine Administration, Docker API Security, Access Control, Network Segmentation, Infrastructure Security]
lesson: An exposed Docker TCP socket can turn a container management interface into a remotely accessible administrative surface, making network exposure and access control critical parts of Docker security.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: docker-socket-exposure
next: container-isolation-namespaces
source: notion://c8d55a666036837ab4a201abfcd6783e
---

## Objective
I set out to assess whether a Docker Engine's TCP socket was exposed to the network and whether remote users could interact with the Docker daemon without authentication.

## Scenario
A Docker host was configured to listen for remote management connections on TCP port 2375, the default Docker API port. I wanted to determine whether authentication or TLS was enforced, and what an unauthenticated user could do through the exposed API.

## What I found

### Finding 01 (Critical): Docker API accessible without authentication
A port scan identified TCP 2375 as open, running Docker Engine 20.10.20. The API responded to unauthenticated requests, returning version information and accepting management commands.

```text file=port-scan flag=OPEN_API
Port:                2375/tcp (open)
Service:             Docker Engine 20.10.20
Authentication:      None
TLS:                 Not configured
```

### Finding 02 (Critical): Full remote control of the Docker daemon
Through the unauthenticated API, I could list running containers, enumerate networks and images, and issue management commands. Any host that could reach port 2375 had full administrative control of the Docker Engine.

```text file=remote-access flag=FULL_CONTROL
Containers:          Listed (running and stopped)
Networks:            Listed
Images:              Listed
Management commands: Accepted without credentials
```

## What I did
1. **Scanned the target.** I used Nmap to identify the open Docker API on port 2375.
2. **Tested API access.** A cURL request to the `/version` endpoint returned Docker Engine details without authentication.
3. **Enumerated the daemon.** I used the Docker CLI with the remote host flag to list containers, networks, and images.
4. **Documented the exposure.** The daemon was fully controllable from any host on the network.

### Evidence snippets
```text
# Remote Docker API assessment
Nmap:              Port 2375 open, Docker 20.10.20
cURL /version:     Responded without authentication
Docker CLI:        Listed containers, networks, images remotely
Access level:      Full Docker daemon administration
```

## Validation
The Docker API responded to unauthenticated requests, and full management access was confirmed through the Docker CLI. Any network-reachable host could control the daemon.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| TCP 2375 | Open, unauthenticated | Exposure documented |
| TLS authentication | Not configured | Recommended: mutual TLS |
| Network access | Any host on network | Recommended: firewall to management hosts only |
| API authentication | None | Recommended: TLS client certificates |
| Docker contexts | Not used | Recommended: SSH-based remote management |

## What I recommend
1. Disable the TCP socket and use SSH-based Docker contexts for remote management.
2. If TCP is required, enforce mutual TLS authentication so only clients with valid certificates can connect.
3. Restrict network access to the Docker API port using firewall rules, allowing only authorised management hosts.
4. Monitor for unexpected connections to the Docker API port.
5. Review Docker daemon configuration regularly for unintended network exposure.

## What I learned
An exposed Docker TCP socket can turn a container management interface into a remotely accessible administrative surface, making network exposure and access control critical parts of Docker security.
