---
layout: page
title: Mapping Online Child Exploitation
description: Crawls the dark web to measure online child abuse across India, for a submission to India's Parliament.
img: assets/img/landscape-analysis-thumbnail.jpg
importance: 5
group: applied
topics:
  - Web crawling
  - Child safety
  - Policy
---

Publicly available data on the internet, both surface web and deep web, is an efficient source of information for understanding Online Child Sexual Abuse (OCSA) and Online Child Sexual Exploitation (OCSE). The Landscape report is a snapshot of reported incidence and of the forms that abuse has taken as online technology has spread: which platforms are most prevalent, how far they reach, and how often each has been an enabler.

The program ran at Somaiya Vidyavihar with **USD 91,666.80** in funding from the Children's Investment Fund Foundation (CIFF), U.K., where I worked as a Junior Researcher leading a team of six. Beyond the report itself, the work contributed to a submission to the National Commission for Protection of Child Rights, which was placed before the Rajya Sabha of the Indian Parliament.

Saying anything defensible about reach and incidence meant actually going and looking. That split the work in two: building the crawling stack that could reach the data at all, and making what came back stand up as evidence.

### Reaching the data

The dark web has no complete index, and most of what a crawler wants on it sits behind a form. Both had to be solved before anything could be counted.

- **Link Harvesting on the Dark Web**, the discovery layer: harvesting links to Tor hidden services at scale, following them outward, and mapping the structure that results. It defines the population everything else in the program measures. *IBSSC '21.* [DOI](https://doi.org/10.1109/IBSSC53889.2021.9673428)
- **FLASH**, Web-Form's Logical Analysis & Session Handling: classifies a form by what it is asking for, fills it appropriately, and handles the session that follows, on both the surface web and Tor hidden services. The crawling substrate the program's data collection ran on. *Robotic Process Automation, Wiley, 2023.* [DOI](https://doi.org/10.1002/9781394166954.ch5)

### Making it hold up as evidence

A finding headed for a national commission has to name a harm, and has to be able to say *why* it reached its conclusion.

- **Recognizing Child Unsafe Apps through User Reviews**, treating the Google Play Store review corpus as a signal channel: learns to recognize child-unsafe apps from what users actually report (grooming through chat, unmoderated content, predatory monetization), without depending on the developer's self-declared age rating. *Advanced Computing and Intelligent Technologies, Springer, 2022.* [DOI](https://doi.org/10.1007/978-981-16-2164-2_9)
- **Explainability using Decision Trees and Monte Carlo Simulations**, pairing trees for a structure a human can follow with simulation for how stable that structure stays under variation, rather than on one fixed dataset. *ICAST '21.* [DOI](https://doi.org/10.2139/ssrn.3868707)
