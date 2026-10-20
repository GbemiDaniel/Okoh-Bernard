---
slug: terraform-cloud-iac-hardening
title: Terraform Cloud IaC Hardening
track: devsecops
category: infrastructure-as-code
caseNumber: 32
breadcrumb: [Work, DevSecOps, IaC]
kicker: INFRASTRUCTURE AS CODE
lede: A Terraform configuration granted EC2FullAccess, used an admin instance profile, and had no network filtering or monitoring. I replaced it with least-privilege IAM, a scoped security group, a service-account profile, VPC Flow Logs, and CloudTrail.
platformTags: [Terraform, AWS, IAM, VPC]
status: HARDENED · VERIFIED
meta:
  domain: Infrastructure as Code
  platform: Terraform, AWS
  severity: High            # TODO Kachi: confirm severity
  outcome: Least privilege and monitoring
result:
  before: Full access, no monitoring
  after: Scoped IAM, SG, Flow Logs, CloudTrail
tools: [Terraform, AWS IAM, AWS VPC, AWS Security Groups, AWS Auto Scaling, AWS VPC Flow Logs, AWS CloudTrail, Infrastructure as Code]
skills: [Terraform, Infrastructure as Code Security, AWS Cloud Security, IAM, Least Privilege, VPC Security, Security Groups, CloudTrail, VPC Flow Logs, Security Hardening, Security Monitoring, Access Control, DevSecOps, Cloud Infrastructure Security]
lesson: Terraform can consistently deploy both secure and insecure infrastructure, so IaC configurations must undergo security review before they are applied to cloud environments.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: on-prem-iac-pipeline-assessment
next:
source: notion://55455a666036833c9812011676790899
---

## Objective
I set out to identify security weaknesses in a Terraform configuration and apply appropriate cloud security controls, including least-privilege IAM permissions, network filtering, secure instance profiles, and monitoring.

## Scenario
A Terraform configuration was used to provision AWS infrastructure, but it contained several insecure defaults. The IAM policy granted `AmazonEC2FullAccess`, the instance profile used an admin-level role, and there were no security groups, VPC Flow Logs, or CloudTrail configured. I wanted to harden the configuration before it was applied.

## What I found

### Finding 01 (High): Excessive IAM permissions
The Terraform configuration attached `AmazonEC2FullAccess` to the EC2 instances, granting far more permissions than the workload required.

```text file=iam-config flag=EXCESSIVE_PERMS
IAM policy:          AmazonEC2FullAccess
Instance profile:    admin_profile
Scope:               All EC2 actions on all resources
```

### Finding 02 (High): No network filtering or monitoring
The configuration had no security group to control inbound or outbound traffic, and neither VPC Flow Logs nor CloudTrail were configured for visibility.

```text file=network-config flag=NO_CONTROLS
Security group:      Not configured
VPC Flow Logs:       Not configured
CloudTrail:          Not configured
SSH access:          Unrestricted
```

## What I did
1. **Reviewed the Terraform configuration.** I identified the insecure IAM policy, admin instance profile, and missing network and monitoring controls.
2. **Replaced the IAM policy.** I changed `AmazonEC2FullAccess` to `AmazonEC2ReadOnlyAccess` to apply least-privilege permissions.
3. **Added a security group.** I configured inbound SSH restrictions and outbound traffic controls.
4. **Changed the instance profile.** I replaced `admin_profile` with `service_account_profile` to scope the instance identity.
5. **Enabled monitoring.** I added VPC Flow Logs and CloudTrail to the Terraform configuration.
6. **Applied and validated.** I completed the Review, Implement, and Destroy phases of the IaC exercise.

### Evidence snippets
```text
# Terraform hardening summary
IAM policy:          AmazonEC2FullAccess → AmazonEC2ReadOnlyAccess
Instance profile:    admin_profile → service_account_profile
Security group:      Added (SSH + outbound controls)
VPC Flow Logs:       Enabled
CloudTrail:          Enabled
```

## Validation
The hardened Terraform configuration was applied successfully. The infrastructure was provisioned with least-privilege IAM, a scoped security group, a service-account instance profile, and both VPC Flow Logs and CloudTrail for monitoring.

## Before and after
| Control | Before | After |
| --- | --- | --- |
| IAM policy | `AmazonEC2FullAccess` | `AmazonEC2ReadOnlyAccess` |
| Instance profile | `admin_profile` | `service_account_profile` |
| Security group | Not configured | SSH and outbound controls |
| VPC Flow Logs | Not configured | Enabled |
| CloudTrail | Not configured | Enabled |

## What I recommend
1. Apply least-privilege IAM policies in Terraform configurations; never use `FullAccess` managed policies for workloads.
2. Use service-account instance profiles instead of admin-level profiles.
3. Include security groups in every Terraform deployment to control network access.
4. Enable VPC Flow Logs and CloudTrail in every environment for visibility and incident response.
5. Review and scan Terraform configurations for security issues before applying them, using tools like `tfsec` or Terraform Sentinel policies.

## What I learned
Terraform can consistently deploy both secure and insecure infrastructure, so IaC configurations must undergo security review before they are applied to cloud environments.
