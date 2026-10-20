---
slug: kubernetes-secrets-and-rbac-hardening
title: Kubernetes Secrets and RBAC Hardening
track: devsecops
category: containers-kubernetes
caseNumber: 24
breadcrumb: [Work, DevSecOps, Containers]
kicker: CONTAINERS & KUBERNETES
lede: Kubernetes Secrets were accessible to any service account in the namespace because no RBAC restrictions were in place. I retrieved the exposed credentials, created scoped Roles and RoleBindings, and validated that only the authorised service account could read the secret.
platformTags: [Kubernetes, RBAC, Docker, Minikube]
status: HARDENED · VERIFIED
meta:
  domain: Containers & Kubernetes
  platform: Kubernetes, Minikube
  severity: High            # TODO Kachi: confirm severity
  outcome: RBAC enforced on secrets
result:
  before: Any SA reads secrets
  after: Only terminal-admin allowed
tools: [Kubernetes, kubectl, Minikube, Docker, YAML, RBAC, Kubernetes Secrets, Service Accounts, Firefox]
skills: [Kubernetes Security, RBAC, Access Control, Secrets Management, Identity and Access Management, DevSecOps, Container Security, Security Hardening, Least Privilege, Kubernetes Administration, Access Validation]
lesson: Kubernetes Secrets alone do not prevent unauthorised access. RBAC must be used to enforce which identities are allowed to retrieve sensitive resources.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: python-dependency-confusion-defence
next: container-isolation-cgroups
source: notion://8da55a666036828d97f3017786d42860
---

## Objective
I set out to assess whether Kubernetes Secrets were protected by RBAC, restrict access to only authorised service accounts, and validate that the controls worked.

## Scenario
A Minikube cluster ran an Nginx application with a Kubernetes Secret called `terminal-creds` containing a username and password. No RBAC restrictions were in place, so any service account in the namespace could query and decode the secret. I wanted to lock it down to a single authorised service account.

## What I found

### Finding 01 (High): Secret accessible without RBAC restrictions
The `terminal-creds` secret could be retrieved by any identity in the default namespace. The credentials were base64-encoded but not encrypted and could be decoded immediately.

```text file=secret-access flag=UNRESTRICTED
Secret:              terminal-creds
Namespace:           default
Access restriction:  None (any service account)
Encoding:            base64 only (not encrypted)
Credentials:         <REDACTED>
```

Without RBAC, any pod or service account in the namespace could read the secret and obtain the credentials.

## What I did
1. **Enumerated the cluster.** I started the Minikube cluster, listed running pods, and deployed the Nginx application.
2. **Retrieved the secret.** I queried `terminal-creds` and decoded the username and password, confirming unrestricted access.
3. **Created service accounts.** I set up `terminal-user` (should be denied) and `terminal-admin` (should be allowed) service accounts.
4. **Configured RBAC.** I created a Role granting `get` access to the `terminal-creds` secret and a RoleBinding that bound it only to `terminal-admin`.
5. **Validated access controls.** I tested both service accounts with `kubectl auth can-i`.

### Evidence snippets
```yaml
# RoleBinding restricting secret access to terminal-admin
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: terminal-creds-binding
  namespace: default
subjects:
  - kind: ServiceAccount
    name: terminal-admin
    namespace: default
roleRef:
  kind: Role
  name: terminal-creds-reader
  apiGroup: rbac.authorization.k8s.io
```

## Validation
After applying the RBAC configuration, access was correctly restricted:

```text
terminal-user can get secret/terminal-creds:   no
terminal-admin can get secret/terminal-creds:  yes
```

The `terminal-user` service account was denied access, while `terminal-admin` was authorised, confirming the RBAC controls were enforced.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| Secret access | Any service account | Only `terminal-admin` |
| RBAC Role | Not configured | `terminal-creds-reader` |
| RoleBinding | Not configured | Bound to `terminal-admin` only |
| `terminal-user` access | Allowed | Denied |
| `terminal-admin` access | Allowed | Allowed (authorised) |

## What I recommend
1. Apply RBAC to every Kubernetes Secret so that only the service accounts that need them can read them.
2. Avoid relying on namespace isolation alone; use Roles and RoleBindings for fine-grained access.
3. Use encrypted secret storage (such as sealed secrets or an external secrets manager) rather than base64-encoded Kubernetes Secrets.
4. Audit RBAC configurations regularly and remove any overly broad bindings.
5. Use `kubectl auth can-i` to validate access controls after every change.

## What I learned
Kubernetes Secrets alone do not prevent unauthorised access. RBAC must be used to enforce which identities are allowed to retrieve sensitive resources.
