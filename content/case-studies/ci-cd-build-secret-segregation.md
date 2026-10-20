---
slug: ci-cd-build-secret-segregation
title: CI/CD Build Secret Segregation
track: devsecops
category: build-cicd
caseNumber: 21
breadcrumb: [Work, DevSecOps, Build]
kicker: BUILD & CI/CD
lede: A production API key was accessible from the development pipeline because the CI/CD variable was not scoped to its environment. I confirmed the cross-environment leak and identified the controls needed to properly isolate build secrets.
platformTags: [GitLab, CI/CD]
status: ASSESSED · VERIFIED
meta:
  domain: Build & CI/CD
  platform: GitLab CI/CD
  severity: High            # TODO Kachi: confirm severity
  outcome: Secret scope weakness confirmed
result:
  before: PROD secret in DEV pipeline
  after: Scope weakness documented
tools: [GitLab, GitLab CI/CD, GitLab CI/CD Variables, GitLab Pipelines, YAML, Environment Variables, CI/CD Secrets Management]
skills: [CI/CD Security, Secrets Management, GitLab Security, Access Control, Environment Segmentation, Pipeline Security, Vulnerability Assessment, Secure Configuration Management, Credential Protection, DevSecOps, Least Privilege]
lesson: Environment variables provide configuration management, not complete secret protection. CI/CD secrets must also be properly scoped, masked, access-controlled, and restricted to the environments that legitimately require them.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: environment-segregation-for-build-runners
next: external-dependency-supply-chain-risk
source: notion://b0e55a66603682a385130162585e2f35
---

## Objective
I set out to assess whether CI/CD build secrets were properly scoped to their intended environments, or whether a development pipeline could access production secrets.

## Scenario
A GitLab project used CI/CD variables to manage secrets for its DEV and PROD deployments. The PROD pipeline used an `API_KEY` variable, and the DEV pipeline used a separate `API_KEY_DEV` variable. I wanted to test whether the PROD secret could be reached from the DEV pipeline by changing the variable name in the CI configuration.

## What I found

### Finding 01 (High): Production secret not scoped to its environment
The PROD `API_KEY` variable was stored as a CI/CD variable but was not restricted to the production environment. Any pipeline in the project could request it by name.

```text file=ci-variable-scope flag=UNSCOPED_SECRET
Variable:          API_KEY (production)
Environment scope: All environments (not restricted)
Accessible from:   DEV pipeline
```

### Finding 02 (High): DEV pipeline exposed the production key
After modifying the DEV branch CI configuration to reference `API_KEY` instead of `API_KEY_DEV`, the DEV pipeline job output included the production API key value.

```text file=secret-leak flag=CROSS_ENV_LEAK
Pipeline:          DEV branch
Variable requested: API_KEY (production)
Result:            Production API key exposed in job output
```

Environment variables alone were not enough to protect the secret. Without proper scoping, any pipeline in the project could access any variable.

## What I did
1. **Reviewed the PROD deployment.** I identified that it used an `API_KEY` variable for its deployment process.
2. **Reviewed the DEV pipeline configuration.** It used a separate `API_KEY_DEV` variable by convention, not by enforcement.
3. **Tested cross-environment access.** I modified the DEV CI configuration to request the PROD `API_KEY` variable and ran the pipeline.
4. **Confirmed the leak.** The DEV pipeline job output showed the production API key, confirming the variable was not scoped to its environment.

### Evidence snippets
```text
# Variable scoping test
DEV pipeline CI config:   changed API_KEY_DEV to API_KEY
DEV pipeline output:      PROD API key value exposed
Root cause:               CI/CD variable not scoped to production environment
```

## Validation
The DEV pipeline successfully accessed the PROD `API_KEY` variable, confirming that the secret was not restricted to its intended environment. The exposure was reproducible.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| PROD API_KEY scope | All environments | Weakness documented; scoping recommended |
| DEV access to PROD secrets | Possible | Risk confirmed and reported |
| Variable masking | Not configured | Recommended |
| Secret management | CI/CD variables only | Recommended: external secrets manager |
| Environment enforcement | Convention only | Recommended: platform-enforced scoping |

## What I recommend
1. Scope CI/CD variables to their intended environment so that production secrets are only available to production pipelines.
2. Enable variable masking to prevent secrets from appearing in job logs.
3. Use an external secrets manager for sensitive credentials instead of relying solely on CI/CD variables.
4. Restrict who can modify CI/CD variable configurations and audit changes.
5. Review all existing CI/CD variables for proper scoping and remove any that are accessible beyond their intended environment.

## What I learned
Environment variables provide configuration management, not complete secret protection. CI/CD secrets must also be properly scoped, masked, access-controlled, and restricted to the environments that legitimately require them.
