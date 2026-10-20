---
slug: ecs-container-iam-least-privilege
title: ECS Container IAM Least Privilege
track: cloud
category: secure-compute
caseNumber: 11
breadcrumb: [Work, Cloud, Compute]
kicker: SECURE COMPUTE
lede: An ECS service ran with no task role of its own and kept a sensitive value in plain sight in its task definition. I created a scoped task role under a permissions boundary, registered a new revision with it, and rolled the service onto it.
platformTags: [AWS, ECS, IAM, EC2]
status: REMEDIATED · DEPLOYED
meta:
  domain: Secure compute
  platform: Amazon ECS on EC2, AWS IAM
  severity: Medium          # TODO Kachi: confirm severities (Finding 02 set to Medium)
  outcome: Dedicated task identity
result:
  before: No task role
  after: Scoped role, revision 2 live
tools: [AWS CLI, Amazon ECS, AWS IAM, jq, ECS task definitions, IAM permissions boundary]
skills: [Cloud Security, Amazon ECS, Container Security, AWS IAM, Least Privilege, IAM Role Configuration, Task Definition Security, Security Remediation, AWS CLI]
lesson: An ECS task should have its own narrowly scoped IAM identity, so the application's permissions stay separate from the infrastructure and sensitive configuration is not exposed through the task definition.
repo: https://github.com/OnyedikachiO/<lab-repo>   # TODO Kachi: real repo URL
previous: imdsv1-exposure-and-imdsv2-remediation
next: public-s3-bucket-remediation
source: notion://2b655a6660368304bc15015abd77a030
---

## Objective
I set out to inspect a running ECS service, identify its IAM misconfiguration, see what sensitive information the task definition exposed, and fix it by giving the task its own scoped IAM role.

## Scenario
The service ran task definition revision `:1` on the EC2 launch type. Its `taskRoleArn` was `null`, so the container had no application-level IAM identity of its own, which blurs the line between the app and the host underneath. A sensitive value was also stored directly in the container definition as an environment variable.

## What I found

### Finding 01 (Medium): No dedicated task role
The service's task definition had no task role.

```text file=room44-app:1 flag=NO_TASK_ROLE
TaskDefinition: room44-app:1
TaskRole:       null
ExecutionRole:  room44-lab-execution-role
NetworkMode:    bridge
```

Without a task role, the application has no clearly separated AWS permissions. On ECS with EC2, weak identity separation raises the risk of privileges leaking between the application and the infrastructure.

### Finding 02 (Medium): A sensitive value in the task definition
The container definition held a sensitive value in an environment variable (the lab flag, not reproduced here). Anyone allowed to call `ecs:DescribeTaskDefinition` can read values stored that way.

## What I did
1. **Pulled the service details.** I retrieved the cluster, service and task definition with the AWS CLI.
2. **Confirmed the missing role.** The task definition showed `taskRoleArn: null`.
3. **Checked the environment.** I queried the container's environment variables and found the exposed value.
4. **Created a scoped task role.** `room44-app-task-role` trusts `ecs-tasks.amazonaws.com`, sits under the `Room44-LearnerBoundary` permissions boundary, and allows only `s3:GetObject` and `s3:ListBucket`.
5. **Rolled out a new revision.** I exported the task definition, added the new role, registered it as revision `:2`, and updated the service to use it.

### Evidence snippets
```bash
aws iam create-role --role-name room44-app-task-role \
  --assume-role-policy-document file:///tmp/room44-task-role-trust.json \
  --permissions-boundary arn:aws:iam::<ACCOUNT_ID>:policy/Room44-LearnerBoundary

aws iam put-role-policy --role-name room44-app-task-role \
  --policy-name room44-app-inline-policy \
  --policy-document file:///tmp/room44-task-role-policy.json
```

## Validation
The role was created with the ECS task trust and the permissions boundary, and the service moved to the new revision:

```text
Task definition:  arn:aws:ecs:us-east-1:<ACCOUNT_ID>:task-definition/room44-app:2
Deployment:       revision :2 PRIMARY, revision :1 still the older active deployment
```

## Before and after
| Configuration | Before | After |
| --- | --- | --- |
| Task definition | `room44-app:1` | `room44-app:2` |
| `taskRoleArn` | `null` | `room44-app-task-role` |
| Application identity | None | Dedicated task role |
| Permissions | No task role | Scoped S3 read |
| Permissions boundary | Not applied | `Room44-LearnerBoundary` |

## What I recommend
1. Give every ECS app that calls AWS its own task role.
2. Keep task roles to least privilege, with permissions boundaries where policy requires them.
3. Never put secrets or sensitive values in task definition environment variables; use a secrets manager.
4. Keep execution roles, task roles and EC2 instance roles separate.
5. Review task definitions regularly for excess permissions and exposed configuration.

## What I learned
An ECS task should have its own narrowly scoped IAM identity, so the application's permissions stay separate from the infrastructure and sensitive configuration is not exposed through the task definition.
