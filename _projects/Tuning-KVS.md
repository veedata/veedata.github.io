---
layout: page
title: Language Models as Systems Operators
description: Closes an LLM-driven observe-decide-apply loop over RocksDB's configuration, then maps where that ability runs out.
monogram: TK
importance: 1
group: research
topics:
  - Key-value stores
  - LLM agents
  - Auto-tuning
icon: sparkle
question: >
  Can an LLM tune a storage engine end to end, and where exactly does that
  capability stop?
evidence:
  - HotStorage '24 — Best Paper
  - SYSTOR '26
  - ELMo-Tune · TellyTune
---

An LSM-based key-value store like RocksDB exposes more than 200 interrelated configuration options. Getting them right requires understanding both the workload and the internals of the engine, and the right answer changes as the workload does. Tuning is therefore expert work that is never finished.

The question is how to tune a system like this at all: what an automated tuner has to observe, how it decides what to change, and how it knows whether the change helped. That question is older than any particular technique, and it outlives them. Large Language models are the instrument I have been using to probe this question. They are a convenient one, since they arrive already carrying the documentation and folklore that a human expert would otherwise supply, which makes it possible to build a closed loop quickly and then study the loop itself. Other instruments, including learned models trained directly on the engine's own behaviour, are the next step; that work is in progress.

The line runs in two directions: build a tuner that closes the loop without a human in it, then push on it hard enough to see which parts of tuning it actually solves and which parts it only appears to.

### ELMo-Tune: creating the loop

The framework ingests the store's documentation, source, and runtime telemetry, proposes a configuration, benchmarks it, reads the resulting logs, and iterates. A full observe-decide-apply cycle with no human in between.

- **ELMo-Tune**, the original study: *Can* Modern LLMs Tune and Configure LSM-based Key-Value Stores? HotStorage '24, where it received the **SK Hynix Best Paper Award**. [Code](https://github.com/asu-idi/ELMo-Tune), [Paper](https://dl.acm.org/doi/10.1145/3655038.3665954)
- **ELMo-Tune-V2**, full-cycle auto-tuning, from workload observation through configuration application and re-evaluation. [Code](https://github.com/asu-idi/ELMo-Tune-V2) · [Paper](https://arxiv.org/abs/2502.17606)

### TellyTune: finding the edge

If an LLM can tune a storage engine, the more useful question is where that ability runs out. TellyTune pushes LLM-driven tuning across workloads, engines, and configuration surfaces to find the boundary between what the model genuinely reasons about and what it merely pattern-matches.

The short version, **broad reasoning, but narrow control**. The model is good at reading a workload and naming the knob that matters. It is simply worse at holding a long-horizon control loop stable once the knobs interact.

- **TellyTune**, published at SYSTOR '26 (19th ACM International Systems and Storage Conference). [Code](https://github.com/asu-idi/TellyTune), [Paper](https://dl.acm.org/doi/10.1145/3793230.3839381)
