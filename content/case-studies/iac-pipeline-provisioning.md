---
slug: iac-pipeline-provisioning
title: IaC Pipeline Provisioning
track: devsecops
category: infrastructure-as-code
caseNumber: 30
breadcrumb: [Work, DevSecOps, IaC]
kicker: INFRASTRUCTURE AS CODE
lede: I built and executed an automated IaC pipeline using Vagrant, Docker, and Ansible that provisioned a database server and web server, configured the application environment, and deployed a functional web application, then assessed where security controls fit into that process.
platformTags: [Vagrant, Docker, Ansible, Linux]
status: DEPLOYED · REVIEWED
meta:
  domain: Infrastructure as Code
  platform: Vagrant, Docker, Ansible
  severity: Low             # TODO Kachi: confirm severity
  outcome: Pipeline deployed and reviewed
result:
  before: Manual deployment
  after: Automated IaC pipeline
tools: [Vagrant, Docker, Ansible, MySQL, Flask, YAML, Bash, Infrastructure as Code, Linux]
skills: [Infrastructure as Code, Configuration Management, Ansible, Vagrant, Docker, DevOps, CI/CD, Linux Administration, Application Deployment, Automation, Network Configuration, Database Configuration, Security Hardening, Secrets Management, Least Privilege]
lesson: IaC can turn complex infrastructure and application deployment into a repeatable process, but the same automation must also enforce secure credentials, access controls, and network configurations.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: docker-hardening-and-security-controls
next: on-prem-iac-pipeline-assessment
source: notion://f5f55a66603682289d76810dd32b7435
---

## Objective
I set out to build and run an automated IaC pipeline that provisions a database and web server, configures the application through Ansible, and deploys a working web application, then review where security controls should be applied.

## Scenario
The environment required a database server and a web server, each running in Docker containers, with Ansible handling the configuration management. I wanted to understand how the entire deployment worked end to end and identify where security decisions were embedded in the automation.

## What I found

### Finding 01 (Low): Pipeline deployed successfully with default configurations
The IaC pipeline provisioned two Docker containers on an internal network: a MySQL database server and a Flask web server. Ansible automatically configured the database and application using reusable variables and templates.

```text file=provisioned-containers flag=DEPLOYED
dbserver:    MySQL, internal network (<REDACTED>)
webserver:   Ansible/Flask, internal network (<REDACTED>)
SSH:         Exposed on localhost:2200
Application: Flask on 0.0.0.0:80
```

The pipeline worked as designed, but the default configuration included hardcoded credentials, broad network bindings, and SSH exposed through port forwarding.

## What I did
1. **Reviewed the Vagrantfile.** I identified the two containers, their network configuration, Docker images, and provisioning settings.
2. **Reviewed the Ansible playbook.** I traced how the `webapp` role configured the database and web application components automatically.
3. **Started the pipeline.** I ran `vagrant up` and verified both containers were running with `docker ps`.
4. **Tested the application.** I started the Flask application and accessed it through the web server, created an account, and authenticated.
5. **Assessed security posture.** I noted where credentials, network bindings, and access controls could be hardened.

### Evidence snippets
```text
# Pipeline deployment summary
vagrant up:          Two containers provisioned (dbserver, webserver)
docker ps:           Both containers running
Ansible:             Database and application configured automatically
Flask application:   Started and accessible on port 80
```

## Validation
The IaC pipeline provisioned both containers, Ansible configured the application, and the Flask web application was accessible and functional. The full deployment was automated and repeatable.

## Before and after
| Aspect | Before | After |
| --- | --- | --- |
| Deployment method | Manual | Automated IaC pipeline |
| Database provisioning | Manual configuration | Ansible-managed |
| Web server provisioning | Manual configuration | Ansible-managed |
| Repeatability | Not guaranteed | Consistent via Vagrant + Ansible |
| Security review | Not performed | Credential and network risks identified |

## What I recommend
1. Store database and application credentials in a secrets manager or encrypted Ansible vault, not in plaintext configuration files.
2. Restrict network bindings so services only listen on the interfaces they need.
3. Disable or restrict SSH access to provisioned containers in production.
4. Apply least-privilege principles to every component the pipeline provisions.
5. Review IaC configurations for security before applying them to any environment.

## What I learned
IaC can turn complex infrastructure and application deployment into a repeatable process, but the same automation must also enforce secure credentials, access controls, and network configurations.
