---
slug: classical-and-modern-cryptography
title: "Cracking the Code: A Practical Guide to Classical & Modern Cryptography"
area: CRYPTOGRAPHY
hue: devsecops
summary: "From Caesar shifts, transposition and frequency analysis to AES, RSA and the hybrid encryption behind HTTPS, with worked examples of why each classical method falls."
date: "2026-06-10"     # Medium RSS publish date
readMinutes: 3         # TODO(read time): estimated at Medium's 265 wpm; confirm on Medium
mediumUrl: https://medium.com/@kachisichobernardokoh/cracking-the-code-a-practical-guide-to-classical-modern-cryptography-tryhackme-walkthrough-e0ea319d9d11
tags: ["Classical ciphers", "AES", "RSA"]
topic: crypto
cover:
  keys: ["K", "H", "O", "O", "R"]
  caption: "CAESAR · TRANSPOSITION · AES · RSA"
---

To understand modern systems, we start from simple classical techniques and gradually move into modern encryption used in real-world infrastructure.

Cryptography is the science of protecting information so that only intended parties can read it. At its core, it transforms readable data into unreadable formats and back again using mathematical rules.

## 1. Classical Cryptography & Simple Demonstrations

### Caesar Cipher (Shift Encryption)

This is one of the simplest encryption techniques. Each letter is shifted by a fixed number.

#### Example:

Plaintext:

```
HELLO WORLD
```

Shift each letter by 3:

Ciphertext:

```
KHOOR ZRUOG
```

To decrypt, shift back by 3.

This method is weak because there are only 25 possible shifts, making brute-force testing trivial.

### Simple Brute Force Idea

If you intercept:

```
KHOOR ZRUOG
```

You can try all shifts:

- Shift 1 → JGNNQ YQTNF
- Shift 2 → IFMMP XPSME
- Shift 3 → HELLO WORLD

This demonstrates why the Caesar cipher is insecure.

### Transposition Cipher (Rearrangement Example)

Instead of changing letters, we rearrange them.

#### Example:

Plaintext:

```
SECURITY
```

Write in rows:

```
S E C
U R I
T Y X
```

Now read column-wise:

```
SUT ERY CIX
```

Even though letters are unchanged, order confusion hides meaning.

### Frequency Analysis (Concept Demo)

In English text, some letters appear more often:

- E, T, A, O, I, N are very common.

- Z, Q, X are rare

If we see a ciphertext where one symbol appears extremely frequently, it likely represents “E”.

This is how early cryptanalysis breaks substitution ciphers without brute force.

## 2. Why Classical Systems Fail

Classical encryption fails because it relies on obscurity and predictable structure, not hard mathematics.

Modern cryptography requires that even if an attacker knows the algorithm, they still cannot break the system without the key.

## 3. Symmetric Encryption (Shared Key Systems)

Symmetric encryption uses one shared key for both encryption and decryption.

#### Example Concept

Imagine two people sharing a locked box:

- Both use the same key.
- One locks (encrypts)
- The other unlocks (decrypts)

### AES (Modern Standard)

AES is widely used today. It operates on fixed-size data blocks and applies multiple transformation rounds:

- Substitution (replacing bytes)
- Permutation (rearranging structure)
- Mixing operations (diffusion)
- Key addition (round keys)

This repetition makes AES extremely secure against modern attacks.

### Practical Insight Example

If you encrypt a file using AES:

- Input: “Sensitive Data”
- Output: unreadable binary string like:

```
9f a3 21 7c 88 d1 ...
```

Without the key, this output is computationally infeasible to reverse.

### Key Distribution Problem

If 100 users want secure communication, symmetric encryption requires:

```
(100 × 99) / 2 = 4950 keys
```

This becomes unmanageable at scale.

## 4. Asymmetric Encryption (Public Key Systems)

Asymmetric encryption solves the key-sharing problem using two keys:

- Public key → encrypt
- Private key → decrypt

### Simple Real-Life Analogy

Think of a mailbox:

- Anyone can drop a letter (public key)
- Only the owner can open it (private key)

## 5. RSA Cryptography (Core Idea)

RSA is based on the difficulty of factoring large numbers.

### Concept Breakdown

1. Choose two large primes.
2. Multiply them to get a large number.
3. That number becomes part of the public key.
4. The private key depends on the hidden prime factors.

### Simple Mathematical Idea

If:

- p = 61
- q = 53

Then:

- N = 61 × 53 = 3233

It is easy to multiply.

But given 3233, finding 61 and 53 is much harder when the numbers are large.

That “hardness” is what secures RSA.

## 6. Hybrid Encryption in Real Systems

Modern systems like HTTPS do not rely on only one method.

They combine both:

- Asymmetric encryption for secure key exchange
- Symmetric encryption for fast data transfer

### Example Flow (Simplified)

1. The browser connects to the server.
2. Server sends public key.
3. The browser encrypts a session key.
4. The server decrypts using the private key.
5. Both switch to AES for communication

This gives both:

- Security (RSA)
- Speed (AES)

## Conclusion

Cryptography has evolved from simple letter shifts to advanced mathematical systems that secure global communication.

Understanding both classical and modern methods builds intuition for how real-world systems protect data, identities, and communication channels today.
