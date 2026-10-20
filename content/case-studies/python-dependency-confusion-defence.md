---
slug: python-dependency-confusion-defence
title: Python Dependency Confusion Defence
track: devsecops
category: supply-chain
caseNumber: 23
breadcrumb: [Work, DevSecOps, Supply Chain]
kicker: SUPPLY CHAIN
lede: A Python build used --extra-index-url, which let pip consider packages from both internal and external repositories. I demonstrated that a higher-versioned external package with the same name as an internal dependency was selected automatically, and identified the controls to prevent dependency confusion.
platformTags: [Python, pip, PyPI, Docker, CI/CD]
status: ASSESSED · VERIFIED
meta:
  domain: Supply chain
  platform: Python pip, PyPI, Docker
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Dependency confusion path confirmed
result:
  before: Mixed index, no pinning
  after: Confusion path documented
tools: [Python, pip, setuptools, wheel, twine, Docker, PyPI, Linux, cURL, Virtual Environment]
skills: [Software Supply Chain Security, Dependency Management, DevSecOps, CI/CD Security, Vulnerability Assessment, Secure Configuration Management, Python Security, Container Security, Package Management, Access Control, Supply Chain Risk Management]
lesson: Dependency managers must be configured to trust the correct package source and verify dependencies because an attacker can publish a higher-version package with the same name and turn the build process into a code-execution path.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: external-dependency-supply-chain-risk
next: kubernetes-secrets-and-rbac-hardening
source: notion://a4255a6660368214bdae81c26dba5c8c
---

## Objective
I set out to assess whether the Python dependency management configuration was vulnerable to dependency confusion between internal and external package repositories.

## Scenario
An application relied on an internal Python package called `datadbconnect`, hosted on a private PyPI repository. The build configuration used `--extra-index-url`, which told pip to search both the internal and the public PyPI repository. I wanted to determine whether an attacker who published a higher-versioned package with the same name on the external repository could get it installed instead.

## What I found

### Finding 01 (Critical): Build configuration searched both internal and external repositories
The pip configuration used `--extra-index-url`, which added the external PyPI as an additional source alongside the internal repository. Pip selected the highest available version across all configured sources.

```text file=pip-config flag=MIXED_INDEX
Index configuration:   --extra-index-url (internal + external)
Package resolution:    Highest version wins across all sources
Internal package:      datadbconnect (internal version)
```

### Finding 02 (Critical): External package selected over internal
A package with the same name and a higher version number (`9000.0.2`) published on the external repository was selected by pip during installation. The package included a post-installation hook that executed code in the build environment.

```text file=confusion-result flag=EXTERNAL_SELECTED
Package installed:     datadbconnect-9000.0.2 (external)
Expected package:      datadbconnect (internal)
Execution context:     Build container (root)
```

The build container ran as root, so the post-installation code had full privileges inside the container.

## What I did
1. **Identified the internal package name.** The package name `datadbconnect` was discoverable through a public developer forum post.
2. **Reviewed the pip configuration.** The `--extra-index-url` setting allowed pip to search both internal and external repositories.
3. **Confirmed the confusion path.** A package with the same name and a higher version on the external repository was selected automatically during installation.
4. **Assessed the impact.** The external package's post-installation hook executed with root privileges inside the Docker build container.

### Evidence snippets
```text
# Dependency confusion assessment
Internal package:    datadbconnect (internal PyPI)
External package:    datadbconnect-9000.0.2 (external PyPI)
pip behaviour:       Selected higher external version
Execution context:   Docker build container as root
```

## Validation
The external package was installed instead of the internal one, and its post-installation code executed inside the build container with root privileges. The dependency confusion path was confirmed end to end.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Index configuration | `--extra-index-url` (mixed) | Risk documented; `--index-url` recommended |
| Package pinning | Not configured | Recommended: pin versions with hashes |
| Internal package namespace | Not reserved externally | Recommended: reserve on public PyPI |
| Build container privileges | Root | Recommended: non-root build user |
| Dependency verification | None | Recommended: hash verification + lockfile |

## What I recommend
1. Use `--index-url` (not `--extra-index-url`) to point pip at a single trusted source, or use a repository manager that proxies and prioritises internal packages.
2. Pin all dependencies to exact versions with hash verification in a lockfile.
3. Reserve internal package names on public PyPI to prevent name squatting.
4. Run build containers as a non-root user to limit the impact of malicious post-installation hooks.
5. Scan dependencies for unexpected version changes or new packages matching internal names.

## What I learned
Dependency managers must be configured to trust the correct package source and verify dependencies because an attacker can publish a higher-version package with the same name and turn the build process into a code-execution path.
