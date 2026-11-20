---
permalink: /Advanced+Generative+AI+Lab+Day/
title: "Lab Day: AI-Assisted Fault Report Triage"
author_profile: true
description: "A hands-on case for building an LLM triage workflow in n8n + Gemini or Power Automate + Copilot."
---

A hands-on lab built around one realistic industrial case, with two interchangeable tool stacks. It is part of my guest lecture in *Advanced & Generative AI* at FH JOANNEUM.

[Download the guide (PDF)]({{ '/assets/pdf/lab-day-fault-triage.pdf' | relative_url }})

Download the data:
- [in CSV]({{ '/assets/data/lab-day-fault-triage-tickets.csv' | relative_url }})
- [in JSON]({{ '/assets/data/lab-day-fault-triage-tickets.json' | relative_url }})

## The case

It is 02:10 on the night shift. The grinding belt on line 3 runs unevenly, and the operator posts a one-line message to the maintenance group chat. Nobody reads it before 06:00. By then the planner faces 41 messages: real faults, duplicates, questions, and a complaint about the coffee machine. Sorting them into tickets takes about two hours.

The task is narrow on purpose. We do not build "an AI for maintenance". We automate first-level triage and keep humans in the decision:

1. A free-text fault report comes in (German, English or a mix).
2. A language model turns it into a structured ticket: machine, category, priority, safety relevance, summary, next step.
3. Simple workflow logic routes it. High priority or safety relevant means immediate escalation. Everything else is logged.
4. The planner gets a clean ticket instead of a chat log.

## Two stacks, one workflow

| | Stream A | Stream B |
|---|---|---|
| Automation | n8n | Microsoft Power Automate |
| Model | Google Gemini (free API tier) | Copilot / AI prompt action |
| Typical context | Prototyping, teams with IT freedom | Microsoft-centric corporations |
| Main learning | The building blocks | Working within the limits of a corporate stack |

Data model, prompt, routing rules and test reports are identical in both streams, so results stay comparable.

## What is in the guide

- The full case story and the constraints that make it hard in practice
- Ticket data model, priority rules and the shared prompt
- Prerequisites and a five-minute pre-check for each stream
- Step-by-step build instructions for both stacks
- Extension levels: human in the loop, context and SOPs, evaluation
- Test reports in mixed German and English, including deliberately difficult cases
- Troubleshooting and a comparison of the two stacks

## Prerequisites in short

- **Stream A:** a Google account with an AI Studio API key, and either an n8n Cloud trial or a local n8n via Docker.
- **Stream B:** a Microsoft work or school account with access to Power Automate, Teams and Excel Online. The AI prompt action depends on your tenant's licences, so check this first. If it is missing, use Stream A.
- **Everyone:** a laptop with a current browser. Use synthetic data only, no real company data.

## Notes

- The company in the case is fictional. Names and numbers are invented for the exercise.
- Tool menus and licence conditions change often. If something in the guide does not match your version, search the node or action by function.
- Feedback and corrections are welcome.