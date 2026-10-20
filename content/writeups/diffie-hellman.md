---
slug: diffie-hellman
title: "Diffie-Hellman: Establishing Secrets over Insecure Channels"
area: CRYPTOGRAPHY
hue: devsecops
summary: How two parties agree on a shared secret in public and why that alone invites a man in the middle, followed by hands-on OpenSSL parameter audits, HMAC checks and cracking an unsalted MD5 hash with Hashcat.
date: "2026-06-17"     # verified on Medium
readMinutes: 5         # verified on Medium
mediumUrl: https://medium.com/@kachisichobernardokoh/diffie-hellman-establishing-secrets-over-insecure-channels-4cd687575a3f
tags: [OpenSSL, HMAC, Hashcat]
topic: crypto
cover:
  keys: ["a", "A", "S", "B", "b"]
  caption: "ALICE · SHARED SECRET · BOB"
---

Imagine wanting to share a secret key with someone over a public, fully monitored channel without attackers stealing it. This is exactly what the **Diffie-Hellman (DH)** key exchange achieves. It uses modular exponentiation to let two parties derive an identical shared secret key without ever sending the key itself across the wire.

## How Diffie–Hellman Works (Using a Simple Example)

Alice and Bob first agree on two public values:

- Prime number: **p = 23**
- Generator: **g = 5**

These values are public, and anyone can see them.

### Step 1: Alice and Bob Choose Private Numbers

Alice secretly chooses: **a = 6**

Bob secretly chooses: **b = 15**

These values are never shared.

### Step 2: They Generate Public Values

Alice computes: **A = ⁵⁶ mod 23 = 8**

Bob computes: **B = ⁵¹⁵ mod 23 = 19**

They exchange these public values across the network. An eavesdropper can see: **p = 23, g = 5, A = 8, B = 19,** but never sees **a** or **b**.

### Step 3: They Compute the Shared Secret

Alice receives **B = 19** and calculates: **S = 1⁹⁶ mod 23 = 2**

Bob receives **A = 8** and calculates: **S = ⁸¹⁵ mod 23 = 2**

Both independently arrive at the same shared secret: **S = 2,** without ever transmitting **2** across the network.

## Why an Attacker Can’t Easily Derive the Secret

An attacker monitoring the communication only sees: **p = 23, g = 5, A = 8, B = 19**

To discover the shared secret, they must first determine Alice’s private number (**a**) or Bob’s private number (**b**) from the public values. This requires solving the **Discrete Logarithm Problem**, which becomes computationally infeasible when Diffie–Hellman uses massive prime numbers, such as modern **2048-bit** or **4096-bit** primes.

As a result, Alice and Bob can establish a shared secret over a completely public channel, while an eavesdropper remains unable to compute the same key.

## The Critical Flaw: Man-in-the-Middle (MitM)

While Diffie-Hellman guarantees *secrecy*, it provides absolutely **zero authentication**. Alice has no way to prove she is talking to Bob. An attacker (Mallory) sitting in the middle can split the connection, executing a DH exchange with Alice *and* a separate DH exchange with Bob. Mallory can then seamlessly decrypt, read, tamper with, and re-encrypt the traffic in real-time.

## Hands-On Lab: Auditing DH Parameters via OpenSSL

For industrial-grade implementations, we can inspect a DH parameter file using OpenSSL in our task directory (/root/Rooms/cryptographyintro/task04).

```bash
root@<REDACTED>:~/Rooms/cryptographyintro/task04# openssl dhparam -in dhparams.pem -text -noout
    DH Parameters: (4096 bit)
    prime:
            00:c0:10:65:c6:ad:ed:88:04:88:1e:e7:50:1b:30:
            ...[snip]...
            59:6c:4f
        generator: 2 (0x2)
```

By querying the key parameters directly, we pull the configuration metadata:

- **Size of the prime number:** 4096 bit
- **Last byte of the prime number:** 4f

## Cryptographic Hashing & HMACs

A cryptographic hash function takes an arbitrary size of input data and condenses it into a deterministic, fixed-size output (a message digest).

A secure hash function must exhibit the **Avalanche Effect**: change just a single bit in the source file, and the resulting hash completely changes. This makes hashes perfect for verifying data integrity.

```bash
# Demonstrating the Avalanche Effect with a single character change ('T' vs 't')
$ sha256sum text1.txt
f4616fd825a10ded9af58fbaee09f3e31751d15591f9323ea68b03a0e8ac3783  text1.txt
```

```bash
$ sha256sum text2.txt
9ffa3533ee33998aeb1df76026f8031c8af6ccabd8393eca002d5b7471a0b536  text2.txt
```

### What is an HMAC?

While a standard hash guarantees *integrity*, it does not guarantee *authenticity* (an attacker could alter a file and simply calculate a brand-new valid hash for it).

To solve this, a **Hash-based Message Authentication Code (HMAC)** mixes a secret cryptographic key with the hash function calculations:

```
HMAC = H(K ⊕ opad, H(K ⊕ ipad, message))
```

Now, an attacker cannot spoof the checksum because they lack the secret key (K).

## Hands-On Lab: Integrity Verification & HMAC Computations

Navigating to /root/Rooms/cryptographyintro/task05I ran through standard integrity verification scenarios.

### Challenge 1: Base Checksum Calculation

First, I generated the baseline SHA-256 digest of a tracking ledger (order.json):

```bash
root@<REDACTED>:~/Rooms/cryptographyintro/task05# sha256sum order.json
2c34b68669427d15f76a1c06ab941e3e6038dacdfb9209455c87519a3ef2c660  order.json
```

### Challenge 2: Simulating Tampering

Next, I simulated an insider tampering attack by opening order.json in nano and altering a payment amount value from 1000 to 9000. Recalculating the hash proves how obvious tampering becomes to defensive monitoring systems:

```bash
root@<REDACTED>:~/Rooms/cryptographyintro/task05# sha256sum order.json
11faeec5edc2a2bad82ab116bbe4df0f4bc6edd96adac7150bb4e6364a238466  order.json
```

### Challenge 3: Generating an Authenticated HMAC

Finally, I calculated an authenticated SHA-256 HMAC of order.txt using a specific secret key string (<REDACTED>):

```bash
root@<REDACTED>:~/Rooms/cryptographyintro/task05# hmac256 <REDACTED> order.txt
c7e4de386a09ef970300243a70a444ee2a4ca62413aeaeb7097d43d2c5fac89f  order.txt
```

## Public Key Infrastructure (PKI) & TLS

To fix the fundamental authentication flaw of the Diffie-Hellman key exchange, modern architecture relies on **Public Key Infrastructure (PKI)** and **SSL/TLS**.

When navigating to a secure site via HTTPS, your browser relies on a digital certificate signed by a globally trusted third-party **Certificate Authority (CA)** (e.g., DigiCert). The CA explicitly signs the server’s public key, confirming its identity and blocking MitM interception attempts.

## Hands-On Lab: Generating and Auditing Certificates

Using OpenSSL, we can generate a brand new 4096-bit self-signed certificate (cert.pem) and private key structure (key.pem) valid for a year:

```
openssl req -x509 -newkey -nodes rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

### Challenge 1: Verifying Public Key Modulus Size

To audit the configuration metrics of our generated key infrastructure at /root/Rooms/cryptographyintro/task06:

```bash
root@<REDACTED>:~/Rooms/cryptographyintro/task06# openssl rsa -in key.pem -text -noout
RSA Private-Key: (4096 bit, 2 primes)
```

- **Public Key Size:** 4096 bit

### Challenge 2: Parsing Certificate Expiration

By evaluating the explicit xX. 509certificate data strings, we can track exactly when the validity window shuts down:

```bash
root@<REDACTED>:~/Rooms/cryptographyintro/task06# openssl x509 -in cert.pem -text
...
Validity
    Not Before: Aug 11 11:34:19 2022 GMT
    Not After : Feb 25 11:34:19 2039 GMT
```

- **Expiration Horizon (Valid Until Year):** 2039

## Password Security & Cracking Passwords At Rest

While TLS safely wraps our passwords in an encrypted tunnel *in transit*, defensive engineers must protect passwords *at rest* within backend storage databases.

- **Bad:** Plaintext storage (immediate system exposure during a breach).
- **Better:** Standard Hashing (vulnerable to fast precomputed lookup charts known as **Rainbow Tables**).
- **Best:** Hashing + **Salting** (appending a unique randomized value to each password to throw off precomputed tables) combined with computational stretching mechanisms like **PBKDF2** or **bcrypt**.

## Hands-On Lab: Cracking an Audit Dump with Hashcat

During a security architecture review, we discovered a legacy system database exposing an MD5 hash belonging to a discovered: 3fc0a7acf087f549ac2b266baf94b8b1.

To recover the underlying weak credential value, we can deploy **Hashcat** against the standard rockyou.txt dictionary file using mode 0 (the specific identifier flag for raw MD5):

```bash
root@<REDACTED>:~# echo "3fc0a7acf087f549ac2b266baf94b8b1" > hash.txt
root@<REDACTED>:~# hashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt
...
3fc0a7acf087f549ac2b266baf94b8b1:<REDACTED>
```

- **Cracked Plaintext Password:** <REDACTED>

## Technical Retrospective: The Big Picture Connection

Let’s summarize exactly how these moving pieces link together when logging into a secure system over HTTPS:

1. **The Handshake:** Your client pulls the web server’s SSL/TLS certificate and validates the CA signature using built-in root keys.
2. **The Key Exchange:** Once validated, the systems execute an authenticated key exchange (like Ephemeral Diffie-Hellman) to safely coordinate a temporary symmetric session key.
3. **Data Transit:** All web sessions, payloads, and credentials travel wrapped securely inside high-speed symmetric algorithms (like AES-256).
4. **Data At Rest:** The target architecture strips the transit encryption layer and validates your input password against securely stretched, salted cryptographic hashes stored deep within backend databases.
