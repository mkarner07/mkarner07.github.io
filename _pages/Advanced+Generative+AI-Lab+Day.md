---
permalink: /Advanced+Generative+AI+Lab+Day/
title: "Lab Day: Report Triage - from Workflow to Dashboard"
author_profile: true
description: "A hands-on lab built around one industrial case. Part of my guest lecture in Advanced & Generative AI at FH JOANNEUM."
---

A hands-on lab built around one industrial case. Part of my guest lecture in *Advanced & Generative AI* at FH JOANNEUM.

Downloads: [PDF guide]({{ '/assets/pdf/lab-day-fault-triage.pdf' | relative_url }}) · ticket data ([CSV]({{ '/assets/data/lab-day-fault-triage-tickets.csv' | relative_url }}), [JSON]({{ '/assets/data/lab-day-fault-triage-tickets.json' | relative_url }}))

## The case

02:10, night shift. An operator posts in the group chat that the grinding belt on line 3 is running unevenly. By 06:00 the planner has 41 messages in front of him: real faults, duplicates, questions and one complaint about the coffee machine. Sorting them takes about two hours.

At the 07:30 shift meeting the plant manager asks one question: what happened overnight, and what is critical? A list of tickets doesn't answer that. A single screen does.

The lab covers both steps: first-level triage, then the overview. Humans still make the decisions.

## Part 1 – The triage workflow

1. A free-text fault report comes in (German, English or mixed).
2. A language model turns it into a structured ticket: machine, category, priority, safety relevance, summary, next step.
3. Simple rules route it. High-priority or safety-relevant reports are escalated immediately, and everything else is logged.
4. The planner gets a clean ticket instead of a chat log.

**Two stacks, one workflow**

| | Stream A | Stream B |
|---|---|---|
| Tools | n8n + Google Gemini (free API tier) | Power Automate + Copilot / AI prompt action |
| Suited to | Prototyping, teams with IT freedom | Microsoft-centric corporations |
| Main learning | The building blocks | Working within corporate stack limits |

Both streams use the same data model, prompt, routing rules and test reports, so the results are comparable.

## Part 2 – The dashboard, built with AI

Here you stop configuring and start building. You use an AI assistant or coding tool to write the dashboard. You don't need to be a developer, but you have to check what the AI gives you.

**Level 1 – One prompt.** Give the sample ticket data to your AI assistant and ask for a single HTML file that shows tickets by priority and by machine, with the open safety-relevant ones on top. You'll see how far one prompt gets you and where it starts to break.

**Level 2 – Iterate.** Refine the dashboard step by step with an AI coding tool (e.g. Claude Code or GitHub Copilot): filters, a view per shift, a detail panel. Then check every number against the raw data. AI-generated dashboards look convincing even when the counts are wrong.

**Level 3 – Connect and publish.** Point the dashboard at your own workflow output from Part 1 and publish it on GitHub Pages. Now others can open it, so before you publish, ask the governance questions: what data does it show, who sees it, and who maintains it?

You can do Part 2 with the sample data alone. You don't need a working workflow from Part 1 to start it.

## What the guide contains

- The full case and its practical constraints
- Ticket data model, priority rules and the shared prompt
- Prerequisites and a five-minute pre-check for each stream and for the dashboard part
- Step-by-step build instructions for both workflow stacks
- Workflow extension levels: human in the loop, context and SOPs, evaluation
- Dashboard levels 1–3 with example prompts and a checklist for verifying results
- Test reports in mixed German and English, including deliberately hard cases
- Troubleshooting and a comparison of the two stacks

## Prerequisites

- **Stream A:** a Google account with an AI Studio API key, plus an n8n Cloud trial or local n8n via Docker.
- **Stream B:** a Microsoft work or school account with Power Automate, Teams and Excel Online. Whether you have the AI prompt action depends on your tenant's licensing, so check first. If it isn't available, use Stream A.
- **Dashboard:** at least one AI assistant (Copilot, Gemini, ChatGPT or Claude). An AI coding tool helps for Level 2. You need a GitHub account only if you want to publish (Level 3).
- **Everyone:** a laptop with a current browser. Synthetic data only, never real company data. Anything you publish on GitHub Pages is public.

## Notes

- The company in the case is fictional. Names and numbers are invented.
- Tool menus and licence terms change often. If the guide doesn't match your version, search for the node or action by what it does.
- Feedback and corrections are welcome.