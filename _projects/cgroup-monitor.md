---
layout: page
title: cgroup-monitor
description: Resource limits and measurements that live in the same script.
monogram: CG
importance: 9
group: engineering
topics:
  - Linux systems
  - Benchmarking
  - Tooling
---

Benchmarking a storage system often requires constraining the resources it has access to (capping its memory, pinning its CPU, throttling its I/O) and then watching what it does inside those bounds. Linux control groups provide an elegant mechanism to solve this problem. However, current libraries did both setup and monitor cgroups. This project was quick and dirty solution to the problem.

`cgroup-monitor` is a small Python library that launches a process directly into a cgroup and monitors its resource consumption from there, so an experiment can be described in the same script that runs it rather than in a pile of shell setup around it. Written in 2024, out of the research work tuning LSM-KVS, this project has as of 2026, garnered over 11,000 downloads. [Source](https://github.com/veedata/cgroup-monitor)

*P.S. It seriously needs to be updated. Something I plan to pick up in late 2026.*