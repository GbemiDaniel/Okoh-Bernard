---
slug: securing-the-build-process
title: Securing the Build Process
track: devsecops
category: build-cicd
caseNumber: 16
breadcrumb: [Work, DevSecOps, Build]
kicker: BUILD & CI/CD
lede: An internal GitLab instance let any authenticated user enumerate and download repositories, and one of them had an API key hardcoded in its Dockerfile. I identified the exposure, confirmed the sensitive data, and outlined the controls to lock it down.
platformTags: [GitLab, CI/CD, Python, Git]
status: ASSESSED · REPORTED
meta:
  domain: Build & CI/CD
  platform: GitLab, GitLab API
  severity: High            # TODO Kachi: confirm severity
  outcome: Exposure identified
result:
  before: Repos public, secret in code
  after: Exposure mapped and reported
tools: [GitLab, GitLab API, Python 3, python-gitlab, Git, Bash, grep]
skills: [Source Code Security, GitLab Security, Repository Enumeration, Sensitive Data Discovery, Secret Identification, Access Control, RBAC, Least Privilege, Branch Protection, CI/CD Security, Secure Secret Management, Supply Chain Security]
lesson: Internal access and repository visibility must not be treated as sufficient security boundaries because weak access controls can expose source code and sensitive information.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: public-ebs-snapshot-remediation
next: build-process-security
source: notion://b1a55a66603683588e7281f5e69351ba
---

## Objective
I set out to find whether an internal GitLab instance exposed repositories to users who should not have access to them, and whether any of those repositories contained sensitive information such as secrets or API keys.

## Scenario
An organisation ran a self-hosted GitLab instance on its internal network. Repositories were expected to be restricted, but no one had verified whether authenticated users could see projects beyond their own. I wanted to enumerate what was visible, download it, and search for hardcoded secrets.

## What I found

### Finding 01 (High): Repositories visible to any authenticated user
Using the GitLab API with a personal access token, I enumerated all publicly visible projects on the instance. Multiple repositories were accessible, including ones unrelated to my own work.

```text file=enumerated-repos flag=PUBLIC_REPOS
Accessible repositories:
  Basic Build
  Approval Test
  Merge Test
  Mobile App
```

Any authenticated user could clone or download these repositories, regardless of project membership.

### Finding 02 (High): API key hardcoded in a Dockerfile
Searching the downloaded repositories for sensitive strings revealed an Android API key stored directly in the Mobile App repository's Dockerfile as an environment variable.

```text file=secret-in-dockerfile flag=HARDCODED_SECRET
File:    Mobile App/Dockerfile
Match:   ENV ANDROID_API_KEY "<REDACTED>"
```

The key was committed to version control in plain text, accessible to anyone who could reach the repository.

## What I did
1. **Authenticated to the GitLab instance.** I generated a personal access token with read-level API scopes.
2. **Enumerated visible repositories.** I used a Python script with the GitLab API to list and download all publicly accessible projects.
3. **Searched for secrets.** I extracted the downloaded archives and ran a recursive search for patterns such as `secret`, `api`, and `key`.
4. **Confirmed the exposure.** The Mobile App Dockerfile contained a hardcoded API key available to any authenticated user on the instance.

### Evidence snippets
```bash
# Search for sensitive strings across downloaded repos
grep -RiE "secret|api|key" ./extracted-repos/
```

## Validation
The enumeration confirmed that multiple repositories were visible to any authenticated user on the instance, and the secret search confirmed at least one hardcoded API key in a Dockerfile.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Repository visibility | Public to all authenticated users | Exposure identified and reported |
| Hardcoded secrets | API key in Dockerfile | Identified for rotation and removal |
| Secret management | Not configured | Recommended: environment variables or vault |
| Branch protection | Not assessed | Recommended: protected branches with review |

## What I recommend
1. Restrict repository visibility to project members only, not all authenticated users.
2. Remove hardcoded secrets from source code and rotate any that were exposed.
3. Use CI/CD environment variables or a secrets manager instead of embedding keys in Dockerfiles.
4. Add pre-commit hooks or CI scanning to catch secrets before they reach the repository.
5. Enable protected branches and require merge-request approvals on sensitive projects.

## What I learned
Internal access and repository visibility must not be treated as sufficient security boundaries because weak access controls can expose source code and sensitive information.
