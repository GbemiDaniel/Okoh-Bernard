---
slug: environment-segregation-for-build-runners
title: Environment Segregation for Build Runners
track: devsecops
category: build-cicd
caseNumber: 20
breadcrumb: [Work, DevSecOps, Build]
kicker: BUILD & CI/CD
lede: DEV and PROD builds ran on the same GitLab Runner, so a compromised development pipeline could pivot straight into production. I traced the shared runner path across both environments and identified the controls needed to isolate them.
platformTags: [GitLab, CI/CD, Linux, SSH]
status: ASSESSED · VERIFIED
meta:
  domain: Build & CI/CD
  platform: GitLab CI/CD, GitLab Runner
  severity: High            # TODO Kachi: confirm severity
  outcome: Cross-environment path confirmed
result:
  before: Shared runner, DEV to PROD
  after: Pivot path documented
tools: [GitLab, GitLab CI/CD, GitLab Runner, GitLab Environments, Bash, SSH, Linux]
skills: [CI/CD Security, GitLab Security, Environment Segmentation, Access Control, Vulnerability Assessment, Security Misconfiguration Analysis, GitLab Runner Security, Infrastructure Security, Credential Management, Production Security]
lesson: A shared CI/CD runner can become a bridge between environments, so DEV and PROD need separate runners, access controls, and security boundaries to prevent a lower-trust compromise from reaching production.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: pipeline-access-gate-hardening
next: ci-cd-build-secret-segregation
source: notion://abe55a6660368363a3098179b9f80ee3
---

## Objective
I set out to assess whether CI/CD runners were shared across DEV and PROD environments, and whether a compromise in the lower-trust DEV pipeline could provide a path into production infrastructure.

## Scenario
An organisation maintained separate DEV and PROD environments for their application, each with its own deployment pipeline. I wanted to check whether the build infrastructure was equally separated, or whether a shared component could let an attacker cross from one environment to the other.

## What I found

### Finding 01 (High): A single runner served both environments
Both the DEV and PROD pipelines were configured to use the same GitLab Runner. There was no runner-level separation between the two environments.

```text file=runner-config flag=SHARED_RUNNER
DEV pipeline runner:     shared-runner-01
PROD pipeline runner:    shared-runner-01
Runner isolation:        None
```

### Finding 02 (High): Runner had network access to both environments
The shared runner held SSH credentials and network access to both the DEV and PROD hosts. Compromising the runner through the DEV pipeline provided a direct pivot into the PROD environment.

```text file=cross-env-access flag=CROSS_ENVIRONMENT
Runner access to DEV host:    Confirmed (SSH)
Runner access to PROD host:   Confirmed (SSH)
Environment separation:       Not enforced at runner level
```

A compromise in the lower-trust DEV environment could reach production without any additional barrier.

## What I did
1. **Reviewed the pipeline configuration.** I identified that both DEV and PROD builds used the same GitLab Runner.
2. **Assessed runner access.** The shared runner had SSH access to both the DEV and PROD hosts.
3. **Traced the cross-environment path.** From the DEV pipeline, I confirmed the runner could reach the PROD environment, completing the pivot path.
4. **Documented the exposure.** The shared runner was the single point of failure connecting both environments.

### Evidence snippets
```text
# Cross-environment access from shared runner
Runner identity:   gitlab-runner (shared across DEV and PROD)
DEV host access:   Confirmed via SSH from runner
PROD host access:  Confirmed via SSH from runner
```

## Validation
The lab verification confirmed access to both environments through the shared runner. The cross-environment path was reproducible from the DEV pipeline alone.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Runner assignment | Shared across DEV and PROD | Exposure documented |
| Environment separation | Not enforced at runner level | Recommended: dedicated runners per environment |
| SSH credentials | Available on shared runner | Recommended: scoped credentials per environment |
| PROD access from DEV | Possible via shared runner | Recommended: network segmentation |
| Runner isolation | None | Recommended: ephemeral or sandboxed runners |

## What I recommend
1. Assign dedicated runners to each environment so that DEV and PROD builds never share infrastructure.
2. Scope runner credentials to a single environment; the DEV runner should have no way to reach PROD.
3. Use ephemeral runners that are destroyed after each job to limit the window for lateral movement.
4. Apply network segmentation so that build infrastructure for each environment can only reach its own hosts.
5. Monitor runner activity for unexpected SSH connections or cross-environment access patterns.

## What I learned
A shared CI/CD runner can become a bridge between environments, so DEV and PROD need separate runners, access controls, and security boundaries to prevent a lower-trust compromise from reaching production.
