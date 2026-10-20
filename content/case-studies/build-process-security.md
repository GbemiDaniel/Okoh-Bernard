---
slug: build-process-security
title: Build Process Security
track: devsecops
category: build-cicd
caseNumber: 17
breadcrumb: [Work, DevSecOps, Build]
kicker: BUILD & CI/CD
lede: A merge request could modify the Jenkinsfile and trigger an automatic build, giving any contributor code execution on the build agent. I traced the full path from merge to compromise and identified the controls needed to isolate build environments.
platformTags: [Jenkins, GitLab, CI/CD, Linux]
status: ASSESSED · VERIFIED
meta:
  domain: Build & CI/CD
  platform: Jenkins, GitLab
  severity: High            # TODO Kachi: confirm severity
  outcome: Build-agent compromise path confirmed
result:
  before: Untrusted code runs on merge
  after: Compromise path documented
tools: [GitLab, Jenkins, GitLab Runner, SSH, Python, Bash, Linux, CI/CD, GitLab Webhooks]
skills: [CI/CD Security, Build Process Security, Pipeline Security, Jenkins, GitLab, Security Misconfiguration Analysis, Access Control, Least Privilege, Build Environment Isolation, Vulnerability Assessment]
lesson: A CI/CD pipeline is effectively remote code execution by design, so allowing untrusted users to influence what gets executed, and where it executes, can turn a normal merge workflow into a build-agent compromise.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: securing-the-build-process
next: build-server-security
source: notion://c5a55a66603682aca8080130361cf467
---

## Objective
I set out to assess whether untrusted users could influence CI/CD build execution through the merge-request workflow, and to determine what level of access a compromised build pipeline would grant on the build agent.

## Scenario
A GitLab repository was configured with an on-merge build trigger that ran a Jenkinsfile through Jenkins. Any user who could open a merge request could potentially modify the build instructions. I wanted to trace whether that path led to code execution on the build agent and document what controls were missing.

## What I found

### Finding 01 (High): Merge requests could modify build instructions
The repository's Jenkinsfile was not protected. A user creating a merge request could change the build instructions, and the on-merge trigger would execute them automatically through Jenkins.

```text file=build-config flag=UNPROTECTED_PIPELINE
Build trigger:     on-merge (automatic)
Jenkinsfile:       modifiable by merge-request author
Build agent:       executes instructions without review
```

### Finding 02 (High): Build agent ran untrusted code without isolation
The build agent executed the modified instructions with no sandboxing, approval gate, or restricted execution policy. The combination of untrusted merge-request changes, automatic on-merge execution, and an insufficiently isolated build environment created a direct path to code execution on the agent.

```text file=build-agent-access flag=COMPROMISED
Agent identity:    <REDACTED>
Agent host:        <REDACTED>
Access level:      OS-level shell on the build agent
```

The compromised agent was confirmed through the lab verification process.

## What I did
1. **Reviewed the repository configuration.** I identified the on-merge build trigger and the modifiable Jenkinsfile.
2. **Traced the execution path.** A merge request with modified build instructions triggered Jenkins automatically, and the build agent executed those instructions.
3. **Confirmed build-agent access.** The modified pipeline ran on the build agent and returned OS-level access, confirming the compromise path.
4. **Identified the missing controls.** No approval gate, no Jenkinsfile protection, no build-agent isolation, and no restriction on what merge-request authors could change.

### Evidence snippets
```text
# The build agent executed modified instructions and returned access
Build pipeline:   triggered on merge
Execution:        modified Jenkinsfile ran on build agent
Result:           OS-level access confirmed on agent
```

## Validation
The lab verification confirmed the build-agent compromise after the modified pipeline executed. The full path from merge request to agent access was reproducible.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Jenkinsfile protection | Not protected | Exposure documented |
| Build trigger | Automatic on merge | Risk identified |
| Merge-request review | Not required | Recommended |
| Build-agent isolation | None | Recommended: sandboxed runners |
| Approval gate | None | Recommended: manual approval for pipeline changes |

## What I recommend
1. Protect the Jenkinsfile so that only trusted maintainers can modify build instructions.
2. Require merge-request approval before any pipeline runs, especially for changes to CI/CD configuration.
3. Isolate build agents using ephemeral or sandboxed runners that are destroyed after each job.
4. Restrict what CI/CD pipelines can access on the network and on the host.
5. Separate the build environment from production infrastructure and sensitive systems.
6. Monitor build-agent activity for unexpected commands or network connections.

## What I learned
A CI/CD pipeline is effectively remote code execution by design, so allowing untrusted users to influence what gets executed, and where it executes, can turn a normal merge workflow into a build-agent compromise.
