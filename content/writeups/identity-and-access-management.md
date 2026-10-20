---
slug: identity-and-access-management
title: Understanding Identity and Access Management (IAM)
area: IDENTITY · ACCESS
hue: cloud
summary: Identification, authentication, authorisation and accountability explained, why home-made auth protocols fall to replay attacks, and how access control models and single sign-on compare.
date: "2026-06-17"     # verified on Medium
readMinutes: 5         # verified on Medium
mediumUrl: https://medium.com/@kachisichobernardokoh/understanding-identity-and-access-management-iam-dec3f14e139a
tags: [IAAA, Access control, SSO]
homeOrder: 3
topic: identity
cover:
  keys: ["I", "A", "A", "A"]
  caption: "IDENTIFY · AUTHENTICATE · AUTHORISE · ACCOUNT"
---

As an engineer looking at enterprise defensive architecture, there is a fundamental truth you learn quickly: **perimeter defenses don’t matter if your identity architecture is fundamentally broken.** Attackers rarely break in using high-zero-day magic; they simply log in using compromised credentials.

In this walkthrough, we will break down my hands-on notes from the TryHackMe *Identity and Access Management* room, translating abstract theory into real-world engineering concepts. We’ll explore the core **IAAA model**, analyze why custom authentication protocols fail under packet inspection, compare access models, and evaluate modern enterprise access strategies like SSO.

## 1. The Core Pillar: The IAAA Framework

When designing or auditing an access pipeline, everything anchors back to the four structural pillars of information security: **Identification, Authentication, Authorization, and Accountability (IAAA)**.

```
[ Identification ]  --> "I am Alice." (Claims an Identity)
         ↓
[ Authentication ]  --> "Prove it." (Validates Credentials)
         ↓
[ Authorization  ]  --> "What can you touch?" (Checks Access Control Lists)
         ↓
[ Accountability ]  --> "Logging every move." (Tracks Actions in SIEM)
```

Let’s look at how these four distinct components behave during a typical user lifecycle:

### I. Identification

Identification is merely a user, system, or automated process claiming a specific identity to answer the question: *“Who are you?”* Crucially, **identification requires no proof**. It can be a corporate email address, a legacy stringtanderson, or a database primary key. It must simply be unique within that environment.

### II. Authentication

This is the hard verification step that confirms the identity asserted during the identification phase. Without authentication, impersonation runs rampant. We verify identities by measuring against three core cryptographic factors:

- **Something You Know:** A secret memorized string (e.g., strong passwords or passphrases).
- **Something You Have:** Physical token possession (e.g., YubiKey hardware keys, an active eSIM receiving an OTP code).
- **Something You Are:** Biometric attributes (e.g., face recognition, fingerprint matrices).

> **Architectural Note:** Combining two distinct categories (e.g., inserting a debit card [Have] and typing a PIN [Know]) upgrades your infrastructure to **Multi-Factor Authentication (MFA)**, drastically neutralizing single-point-of-compromise vectors like credential leaking.

### III. Authorization & Access Control

Once authenticated, the platform evaluates permissions. **Authorization** is the policy decision regarding *what* you should be allowed to access based on your business role. **Access Control** is the technical enforcement mechanism (like system kernels or API gateways) ensuring those boundary lines are never breached.

### IV. Accountability & Logging

Accountability links a system action directly back to a validated human operator. This is achieved by streaming detailed endpoint logs down to a hardened, central **Security Information and Event Management (SIEM)** server. If an engineer modifies a production setting, immutable audit records ensure traceability for incident response teams.

### Lab Review: Scenario Analysis

- *Granted explicit permissions to read/send emails:* **Authorization**
- *Typing an input username into a login portal:* **Identification**
- *Enforcing a policy that tracks when changes are executed:* **Accountability**

## 2. Protocol Analysis: Why Custom Authentication Fails

One of the biggest pitfalls in software engineering is building a custom authentication scheme rather than deploying peer-reviewed standards. Let’s dissect a typical protocol flaw to understand why.

### The Cleartext Exposure

In basic setups, a user transmits their password straight across the wire in cleartext. Anyone monitoring network frames via tools like Wireshark can immediately siphon the password.

### The “Flawed” Upgrade: Pre-Shared Key Hashing

To bypass cleartext issues, an engineer might choose to have the client machine encrypt or hash the password using a pre-shared key before transmitting it over the wire. Now, an eavesdropper looking at the network tap only sees an abstract hash string. Problem solved, right? **Wrong.**

### The Vulnerability: Replay Attacks

If the encrypted authentication string remains static across login sessions, an attacker doesn’t need to decrypt or crack the password. They can simply sniff the network traffic, copy the encrypted string blob, and send an identical replay payload to the authentication server later.

```
[Alice] ----(Static Auth Token)----> [Server] (Success)
               ↓ (Mallory sniffs token)
[Mallory] ---(Replayed Auth Token)---> [Server] (Success - Impersonation complete!)
```

### The Mitigation: Session Uniqueness

To secure this pipeline against replay vectors, every unique authentication handshake must integrate non-reusable values. This is typically achieved by salting the session with a time-based token (like a localized timestamp) or a cryptographic nonce. This ensures that even if an attacker sniffs the network exchange, the authentication payload expires instantly and cannot be replayed.

## 3. Comparing Access Control Models

Once identity is verified, how do we systematically scale authorization rules across thousands of database objects? We deploy one of three core Access Control Models:

| Access Control Model | Core Concept | Enterprise Use Case Example |
| --- | --- | --- |
| Discretionary Access Control (DAC) | The explicit **resource owner** manages access permissions. | Sharing an isolated cloud document link with three specific team members. |
| Role-Based Access Control (RBAC) | Permissions are bound to a **corporate role/group**; users inherit rights based on membership. | Granting edit permissions on financial ledgers exclusively to the Accounting-Dept group. |
| Mandatory Access Control (MAC) | High-security enforcement driven strictly by system-wide security clearances. Users cannot override policy. | Classified government network nodes, or low-level operating system constraints via **SELinux** or **AppArmor**. |

## 4. Modern Enterprise Scaling: Identity Management & SSO

Managing these lifecycles at scale requires a clear operational framework. This brings us to the distinction between **IdM** and **IAM**:

- **IdM (Identity Management):** Focuses on managing the lifecycle of digital identities themselves (user provisioning, attribute synchronization, credential rotation).
- **IAM (Identity and Access Management):** A broader discipline encompassing IdM that actively governs, evaluates, and audits real-time access controls across an entire enterprise footprint.

### Single Sign-On (SSO)

As an organization grows to use hundreds of distinct SaaS tools and internal platforms, forcing users to maintain unique passwords for every application leads to password fatigue and insecure sticky-note habits.

**Single Sign-On (SSO)** solves this problem globally. Users authenticate **once** at a centralized Identity Provider (IdP). The IdP validates the identity, enforces MFA controls, and generates cryptographically signed tokens (using standards like SAML or OIDC) to unlock downstream resources seamlessly.

### Quick Check: True/False

- *Does SSO simplify multi-factor authentication setup?* **True (Set up once at the IdP level).**
- *Is SSO cumbersome because users must track dozens of application passwords?* **False (It consolidates down to a single core credential).**

## Technical Retrospective: The Big Picture Connection

Identity and Access Management is not a collection of isolated concepts; it is a continuous security perimeter:

1. **Identity Management (IdM)** provisions your account structure and builds your unique signature.
2. The login process captures your claim (**Identification**) and validates it securely via **MFA/SSO** factors (**Authentication**) while completely neutralizing sniffing risks using time-synchronized anti-replay tokens.
3. The core environment checks its backend rulesets via **RBAC/DAC** models to confirm what system locations you can drop into (**Authorization**).
4. Every API call, file access, and network hop is immediately forwarded out to an isolated, secure log server for behavioral analysis (**Accountability**).
