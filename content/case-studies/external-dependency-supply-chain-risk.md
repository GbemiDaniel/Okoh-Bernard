---
slug: external-dependency-supply-chain-risk
title: External Dependency Supply Chain Risk
track: devsecops
category: supply-chain
caseNumber: 22
breadcrumb: [Work, DevSecOps, Supply Chain]
kicker: SUPPLY CHAIN
lede: An authentication app loaded a JavaScript dependency from an S3-compatible bucket that allowed unauthorised writes. I confirmed the bucket was world-writeable, demonstrated that a modified dependency could intercept credentials, and identified the controls to protect dependency integrity.
platformTags: [JavaScript, S3, Supply Chain, Web]
status: ASSESSED · VERIFIED
meta:
  domain: Supply chain
  platform: S3-compatible storage, Web application
  severity: Critical        # TODO Kachi: confirm severity
  outcome: Dependency tampering path confirmed
result:
  before: World-writeable dependency bucket
  after: Tampering path documented
tools: [Firefox, cURL, Python, HTTP Server, JavaScript, Linux, S3-Compatible Storage, Web Application]
skills: [Software Supply Chain Security, Dependency Management, Vulnerability Assessment, Web Application Security, JavaScript Security, Cloud Storage Security, Access Control, Integrity Validation, Secure Configuration Management, DevSecOps]
lesson: A dependency does not need to contain a vulnerability to become a security risk. If an attacker can modify a trusted dependency's distribution point, they can potentially compromise every application that consumes it.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: ci-cd-build-secret-segregation
next: python-dependency-confusion-defence
source: notion://09d55a6660368211a4b901faf9254d4d
---

## Objective
I set out to assess whether externally hosted application dependencies could be modified without authorisation, and whether a compromised dependency could intercept user credentials.

## Scenario
A web application loaded its authentication logic from a JavaScript file hosted in an S3-compatible storage bucket. The bucket's access controls had not been reviewed since deployment. I wanted to check whether an unauthorised user could overwrite the dependency and what the impact would be on the application's users.

## What I found

### Finding 01 (Critical): Dependency bucket allowed unauthorised writes
The S3-compatible bucket hosting the `auth.js` dependency accepted PUT requests without authentication. Any user who could discover the bucket could overwrite its contents.

```text file=bucket-permissions flag=WORLD_WRITEABLE
Bucket:            libraries
PUT test:          HTTP 200 OK (unauthorised write accepted)
Dependency:        auth.js
```

### Finding 02 (Critical): Modified dependency intercepted credentials
After confirming the write access, I replaced the dependency with a version that sent submitted form data to an external host. The application loaded the modified file and user credentials were captured.

```text file=credential-intercept flag=INTERCEPTED
Modified dependency:   auth.js (credential exfiltration added)
Credentials captured:  Username and password from login form
Application impact:    Every user who authenticated was affected
```

The intercepted credentials were valid and could be used to authenticate to the application. The threat group associated with this class of attack in the scenario was MageCart.

## What I did
1. **Inspected the application.** I identified that the authentication page loaded `auth.js` from an external S3-compatible bucket.
2. **Tested bucket permissions.** A PUT request to the bucket returned HTTP 200, confirming world-writeable access.
3. **Confirmed the impact.** A modified version of the dependency intercepted credentials submitted through the login form.
4. **Validated the captured credentials.** The intercepted credentials worked against the application, confirming the full attack path.

### Evidence snippets
```text
# Dependency hosting assessment
Bucket:           libraries (S3-compatible)
Write test:       PUT request accepted without authentication
Dependency:       auth.js loaded by authentication page
Impact:           Credential interception confirmed
```

## Validation
The modified dependency successfully intercepted credentials, and the captured credentials authenticated to the application. The full path from unauthorised bucket write to credential compromise was confirmed.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Bucket write access | World-writeable | Exposure documented; lockdown recommended |
| Dependency integrity | No verification | Recommended: SRI hashes |
| Authentication page | Loaded external JS without checks | Risk documented |
| Credential protection | None beyond HTTPS | Recommended: integrity checks + monitoring |
| Bucket access control | Open | Recommended: read-only for consumers |

## What I recommend
1. Restrict bucket write access to authorised deployment pipelines only; consumers should have read-only access.
2. Use Subresource Integrity (SRI) hashes on all externally loaded scripts so the browser rejects modified files.
3. Host critical dependencies from infrastructure you control rather than shared or third-party buckets.
4. Monitor dependency hosting for unexpected changes or unauthorised writes.
5. Review all externally hosted dependencies and their access controls as part of supply chain security.

## What I learned
A dependency does not need to contain a vulnerability to become a security risk. If an attacker can modify a trusted dependency's distribution point, they can potentially compromise every application that consumes it.
