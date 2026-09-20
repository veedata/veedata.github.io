---
layout: page
title: Key-Value Stores under Disaggregation
description: Offloads the LSM write path across the disaggregated stack and builds encryption into the engine itself.
monogram: KD
importance: 2
group: research
topics:
  - Key-value stores
  - Disaggregation
  - Data confidentiality
icon: database
question: >
  What breaks when an LSM engine's storage moves away from its compute, and
  can it stay fast, tunable, and encrypted once it does?
evidence:
  - 3× SIGMOD
  - CaaS-LSM · SHIELD · O3-LSM
  - Encryption & offloading
---

Disaggregation puts a network between an LSM tree's compute, memory, and storage; and two of the engine's oldest assumptions stop holding at once. First, the entire write path now runs over that network, so what used to be local disk bandwidth becomes network traffic. And second, data that used to sit on a single trusted machine now crosses tenants and hardware that were never in its threat model.

This work takes those two in turn: keeping the data confidential once it has crossed the boundary, and moving write-path work off the critical path to wherever it is cheapest to run.

### Confidentiality across the boundary

Encrypting an LSM-KVS naively is expensive for a reason specific to the data structure: the engine rewrites its own data continuously through compaction, so every byte is encrypted and decrypted many times over its lifetime. Doing this well means the engine has to participate, rather than having a cipher bolted onto its I/O path.

- **SHIELD**, encryption that survives compaction: a scalable, decentralized design for both monolithic and disaggregated settings, embedded into the engine's components so that compaction, flush, and recovery each stay aware of what they are handling, and key rotation remains possible without rewriting the store. SIGMOD '25. [Code](https://github.com/asu-idi/SHIELD) · [DOI](https://doi.org/10.1145/3725354)
- **ANCHOR**, secure by construction: the follow-on vision paper, on what a persistent key-value store designed for confidentiality *from the start* should look like in a disaggregated data center, rather than one retrofitted for it. 1st SeQureDB Workshop, co-located with SIGMOD '26.

### Offloading the write path

If write-path work has to cross the network anyway, the question becomes where it should run, and the same question keeps returning at three different distances from the engine: beside the storage, spread across the stack, and inside the network itself. These systems are led by collaborators.

- **CaaS-LSM**, compaction-as-a-service: turns compaction into a stateless, disaggregated service that runs next to the data instead of next to the query engine. SIGMOD '24. [Code](https://github.com/asu-idi/CaaS-LSM) · [DOI](https://doi.org/10.1145/3654927)
- **O3-LSM**, three-layer offloading: asks *how much* and *to where*, distributing write-path work across three layers of the disaggregated stack rather than treating offloading as a single all-or-nothing move. SIGMOD '26. [Code](https://github.com/asu-idi/O3-LSM) · [DOI](https://doi.org/10.1145/3802093)
- **NetLSM**, into the network: a controller on programmable switches (P4) that watches traffic as it passes and schedules LSM-KVS operations and online configuration changes before the requests land, instead of reacting at the server once the latency cost is already paid. USENIX FAST '25, work-in-progress.
