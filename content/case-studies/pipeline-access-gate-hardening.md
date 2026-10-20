---
slug: pipeline-access-gate-hardening
title: Pipeline Access Gate Hardening
track: devsecops
category: build-cicd
caseNumber: 19
breadcrumb: [Work, DevSecOps, Build]
kicker: BUILD & CI/CD
lede: A protected branch required approval for merge requests, but the policy was not technically enforced. A developer could approve and merge their own changes, reaching the build runner through the pipeline. I traced the bypass and identified the controls to close it.
platformTags: [GitLab, CI/CD, Linux]
status: ASSESSED · VERIFIED
meta:
  domain: Build & CI/CD
  platform: GitLab CI/CD
  severity: High            # TODO Kachi: confirm severity
  outcome: Access gate bypass confirmed
result:
  before: Self-approval allowed
  after: Bypass path documented
tools: [GitLab, GitLab CI/CD, GitLab Runner, Bash, Linux, SSH, Protected Branches, Merge Requests, Pipeline Access Controls]
skills: [CI/CD Security, GitLab Security, Pipeline Security, Access Control, Branch Protection, Vulnerability Assessment, Security Misconfiguration Analysis, GitLab Runner Security, Least Privilege, Separation of Duties]
lesson: A security policy is only effective when the CI/CD platform technically enforces it. Protecting a branch without enforcing independent approval can still allow a compromised developer account to reach the build runner.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: build-server-security
next: environment-segregation-for-build-runners
source: notion://fdc55a66603682a0bd5a81eb2ce72eb4
---

## Objective
I set out to assess whether the CI/CD access controls on a protected branch were technically enforced, specifically whether the two-person approval principle could be bypassed by a single developer account.

## Scenario
A GitLab repository had its `main` branch marked as protected, and the organisation's policy required independent approval before any merge request could be merged. I wanted to determine whether the platform actually prevented a developer from approving and merging their own code, and what that would mean for the build runner.

## What I found

### Finding 01 (High): Self-approval not technically prevented
The protected `main` branch blocked direct pushes, but the merge-request approval requirement was not configured to prevent the author from approving their own request. A single developer account could open, approve, and merge a change into `main`.

```text file=branch-protection flag=SELF_APPROVAL
Protected branch:        main
Direct push:             Blocked
Merge-request approval:  Required but not enforced independently
Self-approval:           Allowed
```

### Finding 02 (High): Pipeline executed on the main-branch runner
Once the self-approved merge request landed on `main`, the CI/CD pipeline triggered automatically and ran on the runner assigned to the protected branch. The runner executed the pipeline instructions without any additional gate.

```text file=runner-access flag=RUNNER_COMPROMISED
Pipeline trigger:        Automatic on merge to main
Runner identity:         gitlab-runner
Runner access:           OS-level shell on build runner
```

The combination of self-approval and automatic pipeline execution meant a single compromised developer account could run arbitrary code on the protected branch's runner.

## What I did
1. **Tested branch protection.** I confirmed that direct pushes to `main` were blocked, so the protection was partially in place.
2. **Tested the approval workflow.** I created a merge request and found that the same account could approve and merge it without independent review.
3. **Traced the pipeline path.** The merged change triggered a pipeline that ran on the main-branch runner, confirming the full path from self-approval to runner access.
4. **Documented the missing enforcement.** The platform's approval settings needed to require a different user from the merge-request author.

### Evidence snippets
```text
# Approval and execution chain
Step 1:  Developer creates merge request to main
Step 2:  Same developer approves the merge request
Step 3:  Pipeline triggers automatically on merge
Step 4:  Runner executes pipeline as gitlab-runner
```

## Validation
The lab verification confirmed runner access after the self-approved merge request triggered the pipeline. The bypass was reproducible with a single developer account.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Direct push to main | Blocked | Blocked (already in place) |
| Self-approval | Allowed | Documented; enforcement recommended |
| Independent review | Not enforced | Recommended: require different approver |
| Pipeline trigger | Automatic, no gate | Recommended: approval gate for protected pipelines |
| Runner isolation | Not assessed | Recommended: restricted runner access |

## What I recommend
1. Require merge-request approvals from a user other than the author before merging to protected branches.
2. Set the minimum number of approvals to at least one independent reviewer.
3. Prevent merge-request authors from approving their own requests in the platform settings.
4. Add a manual approval step in the pipeline for deployments to protected environments.
5. Monitor merge and pipeline activity on protected branches for policy bypasses.

## What I learned
A security policy is only effective when the CI/CD platform technically enforces it. Protecting a branch without enforcing independent approval can still allow a compromised developer account to reach the build runner.
