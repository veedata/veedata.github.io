---
layout: page
title: Filesystems and Distributed Caches
description: Keeps a globally distributed client-side cache strongly consistent by handing out and revoking cache tokens.
monogram: CF
importance: 3
group: research
topics:
  - Filesystems
  - Distributed caching
  - Consistency
icon: layers
question: >
  How do you hold a globally distributed, client-side cache coherent, and
  what is the system underneath actually costing you?
evidence:
  - CacheFS @ HPE Labs
  - FUSE · RDMA · eBPF
  - 2 patents under review
---

Work done at **HPE Labs, Systems Architecture Lab**. Caching on the client is easy until you need every client to agree on what it is caching. CacheFS is a filesystem that keeps a globally distributed client-sided cache strongly consistent. Published at HPE TechCon '26 (82 of 1036 submissions accepted). Two related inventions are currently under internal disclosure review, with patent filing on approval.

### What it sits on

Building the filesystem meant first understanding what the layers beneath it actually cost:

- **FUSE.** Linux's Filesystem in Userspace turns out to lose meaningful performance to kernel scheduling decisions. Characterising those slowdowns produced a set of optimisations now under development, and a prototype RDMA-based in-memory filesystem on top of FUSE used to test them.
- **eBPF.** Instrumentation is not free, and the standard practice of measuring a system with eBPF probes perturbs the thing being measured. *Probe Less, Learn More* characterises that overhead and corrects for it. To appear at the ProTools workshop at SC '26.
- **Message latency.** Characterising sustained low-level message latency, presented at the Cray User Group '26.

*There is a lot that can be added here. In due time :)*
