---
slug: threat-modeling-frameworks
title: Threat Modeling and Risk Assessment Frameworks
area: RISK · THREAT MODELING
hue: devsecops
summary: Threats, vulnerabilities and risk told apart, attack trees for mapping an adversary's path, and when MITRE ATT&CK, STRIDE, DREAD or PASTA is the right fit for a team.
date: "2026-06-16"     # verified on Medium
readMinutes: 5         # verified on Medium
mediumUrl: https://medium.com/@kachisichobernardokoh/threat-modeling-and-risk-assessment-frameworks-70a93b193313
tags: [MITRE ATT&CK, STRIDE, PASTA]
topic: risk
cover:
  keys: ["S", "T", "R", "I", "D", "E"]
  caption: "STRIDE · DREAD · PASTA · ATT&CK"
---

Reactive security is a losing strategy. Waiting for an alert to trigger in your SIEM means an adversary has already initiated their execution chain. To build true operational resilience, security engineers must pivot to a predictive posture, anticipating attacker behavior, mapping systemic flaws, and neutralizing attack paths before a single line of malicious code is compiled.

This walkthrough deep-dives into the strategic discipline of **Threat Modeling**. We will deconstruct the core concepts of threats, vulnerabilities, and risks; analyze hierarchical attack trees; and critically evaluate four of the industry’s most prominent risk assessment and threat modeling frameworks: **MITRE ATT&CK**, **DREAD**, **STRIDE**, and **PASTA**.

## 1. Threat vs. Vulnerability vs. Risk

Before architecting a threat model, we must establish precise definitions for the foundational triad of risk management. Confusing these terms leads to misallocated engineering hours and skewed security budgets.

| Metric | Scientific Definition | Real-World Enterprise Example |
| --- | --- | --- |
| Threat | Any potential occurrence, event, or adversarial actor aiming to exploit a system and compromise the CIA Triad. | A financially motivated Advanced Persistent Threat (APT) group targeting cloud infrastructure. |
| Vulnerability | A structural weakness, flaw, bug, or misconfiguration in a system, application, or organizational process. | An unpatched, public-facing software vulnerability or a missing access control list (ACL). |
| Risk | The mathematical probability and business impact of a threat successfully exploiting a vulnerability. | The likelihood and subsequent financial damage of an APT group exploiting a bug to exfiltrate an S3 bucket. |

## 2. The Core Engineering Workflow

Regardless of the specific framework chosen, every comprehensive threat modeling exercise follows a standardized macro-lifecycle:

```
[1. Define Scope] ──> [2. Asset Identification] ──> [3. Identify Threats]
                                                             │
 [6. Monitor/Audit] ◄── [5. Countermeasure Dev] ◄── [4. Risk Prioritization]
```

A critical element of step two is **Asset Identification**, which is the process of developing technical architectural diagrams to visualize an organization’s internal infrastructure, third-party dependencies, and data flows. Assets are mathematically prioritized based on the sensitivity of the data they process (such as PII, transaction histories, or intellectual property).

### Visualizing Attack Mechanics: Attack Trees and Paths

To systematically map out an adversary’s mindset, engineers construct **Attack Trees**.

- **The Attack Tree:** A graphical, hierarchical diagram that describes and analyzes potential threats against a system or application. The **root node** represents the attacker’s ultimate objective (e.g., *Exfiltrate Production Database*), while the branching child nodes represent the tactical steps required to achieve that goal.
- **Attack Paths:** Linear sub-chains within the tree that map the exact sequence of interconnected vulnerabilities a threat actor must traverse from their initial external entry point to the target asset.

## 3. Adversarial Mapping: Leveraging MITRE ATT&CK

The **MITRE ATT&CK** matrix serves as a real-world repository of adversary behaviors, categorized into **Tactics** (the attacker’s technical goals, like *Initial Access*) and **Techniques** (the explicit methods used to achieve those goals).

```
TACTIC: INITIAL ACCESS                     MITIGATION STRATEGY
┌────────────────────────────────┐       ┌─────────────────────────────────┐
│        TECHNIQUE: T1190        │ ───>  │  • Input Validation & WAF       │
│ Exploit Public-Facing App      │       │  • Strict Network Segmentation  │
└────────────────────────────────┘       └─────────────────────────────────┘
```

### Advanced Mapping with ATT&CK Navigator

The **ATT&CK Navigator** is an open-source tool used by defensive architecture teams to build custom visual layers across three primary operational matrices: **Enterprise** (corporate infrastructure), **Mobile** (cellular endpoints), and **ICS** (Industrial Control Systems/Critical Infrastructure).

Engineers use the Navigator to overlay threat intelligence onto their technical stack:

- **Scenario Example:** If a financial institution faces active campaigns from threat groups like **APT33** (which has 31 documented techniques) or **APT41**, engineers can isolate those specific profiles in Navigator, apply infrastructure filters (like cloud environment mappings), and visually color-code, score, and comment on the exact techniques relevant to their environment.
- **Prioritizing Targets:** If an infrastructural discovery tactic filter reveals 13 specific techniques threatening an enterprise’s IaaS layout, defensive teams instantly know where to prioritize vulnerability scanners, logging rules, and patch cycles.

## 4. Quantitative and Qualitative Risk Scorecards: STRIDE vs. DREAD

To systematically prioritize remediation efforts, Microsoft engineered two complementary classic frameworks: **STRIDE** (for threat categorization) and **DREAD** (for risk scoring).

### The STRIDE Matrix: Threat Categorization

STRIDE explicitly dictates *what* security policy is under threat by mapping flaws directly to the fundamental tenets of information security:

| Threat Category | Engineering Definition | Violated Security Principle |
| --- | --- | --- |
| **S**poofing | Impersonating a legitimate user, system, or process token. | Authentication |
| **T**ampering | Unauthorized modification of underlying data or system code. | Integrity |
| **R**epudiation | Acting maliciously without leaving valid audit trail evidence. | Non-repudiation |
| **I**nformation Disclosure | Unauthenticated exposure of sensitive data objects. | Confidentiality |
| **D**enial of Service | Exhausting resources to degrade system availability. | Availability |
| **E**levation of Privilege | Escalating access to execute unauthorized commands. | Authorization |

### The DREAD Grid: Risk Valuation

Once a STRIDE threat is identified, it is scored using DREAD to run a qualitative analysis, ranking components from 1 to 10 to establish an average severity score:

```
DREAD Score = (D + R + E + A + D) / 5
```

- **Damage:** How severe would the actual exploit blast radius be?
- **Reproducibility:** How easily can another engineer duplicate this exploit path?
- **Exploitability:** How much technical effort and script customization is required to execute the attack?
- **Affected Users:** What percentage of the active user base is impacted if this vulnerability goes live?
- **Discoverability:** How easily can a malicious actor discover and locate this vulnerability using standard automation tools?

## 5. The Risk-Centric Blueprint: The PASTA Framework

While STRIDE focuses heavily on software engineering flaws, **PASTA (Process for Attack Simulation and Threat Analysis)** is a highly collaborative, **risk-centric** threat modeling framework created by Tony UcedaVélez and Marco Morana in 2015.

PASTA focuses on aligning an organization’s technical risk matrix with its real-world business objectives and compliance mandates.

```
1. Define Objectives  ──>  2. Technical Scope  ──>  3. Decompose App
                                                          │
7. Risk & Impact  ◄──  6. Analyze Attacks  ◄──  4. Analyze Threats
                                                          ▲
                                                          │
                                                5. Vulnerability Analysis
```

### The 7-Step PASTA Methodology Deconstructed

1. **Define the Objectives:** Establish business context, compliance baselines (GDPR, PCI DSS), and risk boundaries.
2. **Define the Technical Scope:** Catalog all physical, software, and cloud assets. Map architecture boundaries.
3. **Decompose the Application:** Extract attack surfaces, track user roles, map trust boundaries, and detail API data flows.
4. **Analyze the Threats:** Gather threat intelligence to track modern attack vectors targeting your specific industry.
5. **Vulnerabilities and Weaknesses Analysis:** Map known internal code flaws using DAST, SAST, and penetration test findings.
6. **Analyze the Attacks:** Build Attack Trees and simulate scenarios to calculate the actual exploitability of identified flaws.
7. **Risk and Impact Analysis:** Implement cost-effective countermeasures that precisely match the organization’s real-world business risk tolerance.

## Choosing Your Framework Strategy

Selecting a threat modeling strategy depends heavily on your team’s current development lifecycle stage:

- Deploy **STRIDE** if you are an application development team looking to secure software components at the code and architectural design phase.
- Deploy **DREAD** when you have a massive backlog of vulnerabilities and require a standardized qualitative equation to figure out what to patch first.
- Deploy **MITRE ATT&CK** if your blue team needs real-world threat intel to build robust SIEM detection rules matching actual threat actor behavior.
- Deploy **PASTA** if you are building an enterprise-wide risk management strategy that must seamlessly map technical vulnerabilities directly to business impact, corporate stakeholder goals, and legal regulations.
