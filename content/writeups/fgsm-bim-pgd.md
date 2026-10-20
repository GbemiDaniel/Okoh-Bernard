---
slug: fgsm-bim-pgd
title: Why Every AI Security Professional Should Understand FGSM, BIM and PGD
area: AI · ADVERSARIAL ML
hue: ai
summary: How gradient-based attacks nudge a model's input just enough to flip its prediction, how the three methods differ in cost and strength, and why defenders should use them to test robustness.
date: "2026-07-23"     # verified on Medium
readMinutes: 5         # verified on Medium
mediumUrl: https://medium.com/@kachisichobernardokoh/why-every-ai-security-professional-should-understand-fgsm-bim-and-projected-gradient-descent-7dfa541c6fe5
tags: [FGSM, BIM, PGD]
homeOrder: 1
topic: ai
cover:
  keys: ["FGSM", "BIM", "PGD"]
  caption: "FAST GRADIENT · ITERATIVE · PROJECTED"
---

*Machine learning models don’t fail only because they’re poorly trained. Sometimes they fail because someone intentionally teaches them to make the wrong decision.*

Over the past decade, machine learning has evolved from a research curiosity into infrastructure that powers authentication systems, fraud detection, autonomous vehicles, malware classification, medical diagnostics, and increasingly, generative AI. While model performance continues to improve, another discipline has quietly matured alongside it: **adversarial machine learning**.

Unlike traditional cybersecurity, where attackers exploit software vulnerabilities, adversarial machine learning targets the mathematical assumptions that underlie modern neural networks' effectiveness. Instead of injecting shellcode or exploiting memory corruption, an attacker manipulates the model’s input just enough to change its prediction while keeping the perturbation nearly invisible to humans.

This subtle shift fundamentally changes how we think about security. The model isn’t hacked in the conventional sense; it is persuaded into making the wrong decision.

Among the many techniques developed to study this behavior, three algorithms have become foundational: **Fast Gradient Sign Method (FGSM), Basic Iterative Method (BIM), and Projected Gradient Descent (PGD)**. They differ in complexity, computational cost, and effectiveness, yet together they form the basis of how researchers evaluate the robustness of modern neural networks.

Rather than viewing them solely as attack algorithms, security practitioners should recognize them as indispensable tools for measuring resilience.

## Why Gradient-Based Attacks Work

Deep neural networks learn by minimizing a loss function through gradient descent. During training, gradients reveal how the model should adjust its parameters to reduce prediction errors.

Ironically, the same information that helps a model learn can also help an attacker deceive it.

Instead of updating model weights, an attacker computes the gradient with respect to the **input itself**, identifying the direction that most rapidly increases the model’s prediction error.

This observation, first popularized by Ian Goodfellow and colleagues, transformed adversarial machine learning from an academic curiosity into a practical security concern.

The implication is profound.

If gradients reveal how to improve a model during training, they also reveal how to break it during inference.

## Fast Gradient Sign Method

FGSM demonstrated that generating adversarial examples does not require complex optimization.

A single gradient calculation is enough.

Rather than searching for the optimal perturbation, FGSM moves every input feature slightly in the direction that maximizes the model’s loss. The resulting perturbation is remarkably small, yet often sufficient to force incorrect predictions.

Its simplicity made two important contributions.

First, it proved that neural networks possess surprising sensitivity to tiny, carefully engineered perturbations.

Second, it provided researchers with a computationally inexpensive way to evaluate model robustness during development.

From a defensive standpoint, FGSM remains valuable because it quickly exposes whether a model has learned genuinely robust representations or merely memorized fragile decision boundaries.

## Basic Iterative Method: Refining the Attack

FGSM’s efficiency comes with a limitation.

Because it applies only one update, the perturbation is not always optimal.

Basic Iterative Method addresses this by repeating the FGSM process multiple times using much smaller steps.

Each iteration incrementally pushes the sample closer to the decision boundary while ensuring the perturbation remains within predefined constraints.

The result is a significantly stronger attack.

What makes BIM particularly interesting is that it illustrates an important security principle: persistence often succeeds where speed does not.

Small, carefully controlled modifications accumulate into highly effective adversarial examples without producing visually obvious distortions.

For defenders, BIM reveals weaknesses that single-step attacks may overlook, making it an essential robustness assessment technique.

## Projected Gradient Descent: The Benchmark for Robustness

If FGSM serves as the introductory lesson and BIM represents refinement, Projected Gradient Descent has become the industry’s reference standard.

PGD repeatedly performs gradient ascent while projecting every intermediate result back into the allowable perturbation region.

This projection prevents the attack from exceeding predefined constraints while allowing continuous optimization toward increasingly damaging adversarial examples.

Its importance extends beyond offensive research.

Today, PGD is widely regarded as one of the strongest first-order adversaries available. Consequently, many robustness benchmarks evaluate whether a model can withstand PGD attacks before claiming meaningful resilience.

Passing FGSM testing alone is rarely considered sufficient.

Surviving PGD evaluation provides considerably stronger evidence that a model has learned more stable decision boundaries.

## Comparing the Three Methods

MethodComputational CostAttack StrengthCommon UseFGSMLowModerateRapid robustness assessment BIMMediumHighStronger white-box evaluationPGDHighVery HighRobustness benchmarking and adversarial training

The progression reflects a broader reality in cybersecurity.

Attack sophistication often increases through iterative optimization rather than entirely new ideas.

## Offensive Security Meets Defensive Engineering

It is tempting to categorize these algorithms as offensive techniques.

That perspective is incomplete.

Security engineers routinely employ offensive methods to improve defensive systems. Penetration testing, fuzzing, exploit development, and red teaming all follow this philosophy.

Adversarial machine learning is no different.

Generating adversarial examples allows defenders to expose brittle decision boundaries before attackers discover them independently.

Many organizations now integrate adversarial evaluation into their secure machine learning lifecycle, treating robustness testing as naturally as vulnerability scanning.

In this context, FGSM, BIM, and PGD function less like weapons and more like diagnostic instruments.

## The Limits of Adversarial Training

One of the most common defenses against gradient-based attacks is adversarial training.

Rather than training exclusively on clean data, the model repeatedly encounters adversarial examples during optimization, learning to classify both correctly.

This approach has proven remarkably effective against many white-box attacks.

However, robustness comes at a measurable cost.

Training becomes significantly more expensive.

Inference performance may decrease.

Accuracy on clean datasets sometimes declines.

Most importantly, robustness against known attacks does not guarantee resilience against future attack strategies.

Security professionals should resist treating adversarial training as a universal solution.

It is better understood as one layer within a broader defense strategy.

## Prospect

As AI systems increasingly influence financial decisions, medical diagnoses, autonomous navigation, identity verification, and critical infrastructure, adversarial robustness will become a governance issue as much as a technical one.

Emerging research is already shifting toward adaptive attacks against multimodal systems, large language models, autonomous agents, and retrieval-augmented architectures. Future adversaries will likely combine prompt manipulation, data poisoning, model extraction, and gradient-based optimization into coordinated attack chains.

The distinction between AI security and traditional cybersecurity will continue to narrow.

Tomorrow’s security engineer will need to understand neural network optimization as comfortably as they understand memory corruption or network protocols.

Gradient-based attacks are no longer merely academic exercises; they are foundational concepts for anyone responsible for securing intelligent systems.

## Final reflections

FGSM, BIM, and PGD represent more than progressively stronger adversarial algorithms. Together, they reveal a deeper truth about modern AI systems: intelligence does not imply robustness. A model can achieve state-of-the-art accuracy while remaining surprisingly vulnerable to carefully crafted perturbations.

For AI security professionals, understanding these methods is not about learning how to break models for its own sake. It is about learning how to measure trust, expose hidden weaknesses, and build systems that remain reliable when confronted with intelligent adversaries.

As AI becomes embedded in security-critical environments, robustness should no longer be viewed as a research metric; it should be treated as a core security requirement.
