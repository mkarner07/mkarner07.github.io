---
title: "Part 2: Building a Decision-Centric Productivity System - Workflows & Weekly Synthesis"
description: "In Part 1, I walked through the core principles behind my decision-centric productivity system and the five layers it's built on: Home, Meta pages, Projects, Knowledge elements, and Logs. That structure is really just scaffolding, though. What makes it useful is what flows through it. In this post, I'll get into the mechanics"
date: 2026-08-20
excerpt_separator: "<!--more-->"
categories:
  - Personal Operating Systems
tags:
  - Personal Operating Systems
  - Leadership as a System
  - Notetaking
  - Decision
  - Methods

---

In [Part 1]({% post_url 2026-08-20-Part-1-Building-a-Decision-Centric-Productivity-System %}), I walked through the core principles behind my decision-centric productivity system and the five layers it's built on: Home, Meta pages, Projects, Knowledge elements, and Logs.

That structure is really just scaffolding, though.

What makes it useful is what flows through it.

| ![image](/assets/images/kelly-sikkema-workflow-unsplash.jpg) |
|:--:|
| *Photo by Kelly Sikkema on Unsplash* |

In this post, I'll get into the mechanics:
- how I capture information from meetings and emails
- how that raw information turns into knowledge elements, and
- how a short Friday review turns the whole week into something I can actually act on.

## 3. Processes & workflow

Now you know the basic structure of the system. However, what awakens the system are the processes and workflows:

- Capturing information
- Post-processing

### 3.1. Capturing information

This is the most essential process of every productivity, note-taking, or decision-supporting system, because at the core of every action and decision there is information and knowledge.

#### Meetings

In the corporate world (and beyond), meetings are standard procedure. I don't want to discuss here that many meetings are not that productive (and some could have been an email), but rather how you can make use of the knowledge created during meetings.

It starts with basic note-taking.

And since you are reading an article about productivity systems, I assume you are already taking notes during the meetings you attend.

If you don't, please start. In my opinion, it's one of the most valuable outcomes of any meeting.

Many productivity systems encourage you to use specific templates. I don't think so. Meetings can be diverse, and there is no "one-size-fits-all" template that works well across all types of meetings.

So just try to take rough notes.

Pay attention to key takeaways such as decisions, risks, dependencies and next steps. And while you are at the meeting, try to hold onto two questions:

- What am I learning?
- What should happen next?

If you ask yourself these questions during the meeting, it even has an immediate effect on the meeting's quality.

Write your notes wherever you want, but I'd encourage you to keep them digital. This will make post-processing much easier.

Not every meeting note has to become a knowledge element. In many cases, it makes more sense to combine insights from multiple meetings into a single knowledge element. Sometimes it's even useful to incorporate information from one or two emails or documents to create a more complete picture.

#### Emails

Please don't process all your emails within the productivity system. If you do, it will quickly become cluttered with too much information.

Instead:

1. Filter aggressively.
2. Only process emails that:
    - influence decisions
    - contain information that will still be valuable two or more weeks from now
3. Don't extract information immediately. Instead, move potentially interesting emails to a separate folder such as _"Knowledge Candidates."_

Just for comparison, I receive about 100-400 emails per week, and only 2–6 of them actually make it into my knowledge system.

#### Other information capture

With meeting notes and emails, you probably cover 90% of the information in a managerial role within the corporate world. However, there are (of course) other forms of information as well, such as phone calls, notes on articles you read, conference talks or informal conversations.

In those cases, I'd treat them just like meeting notes.

### 3.2 Post-processing: from information to knowledge

Only during post-processing do you create real knowledge to be used within your system, based on the raw information you captured. As I already described in the section on knowledge elements, it is important to convert raw information into a format that is easier to use in the future. Through many iterations, I found that the following structure works well:

- **Context**: Where is this knowledge relevant?
- **Core Insight** (or Decision / Risk): The actual knowledge.
- **Implications** (Consequences): What does this knowledge imply?
- **References**: Links to the raw information sources.
- **Related**: Links to other relevant knowledge.

During post-processing, I also add header information (a YAML header, in programming lingo) at the top of each knowledge element. This is particularly helpful when working with different note-taking applications (e.g. Obsidian, Logseq, and others).

I personally use the following metadata:

- type: Insight / Risk / Decision / Guide / Concept
- area: {broad topic}
- subarea: {detailed topic}
- impact: high / medium / low
- date:
- update:

Area and subarea are used to create additional structure. I'd consider them optional, but they can help with the transition if you're coming from a more folder-based note-taking system.

For my role as Head of Information Technology, I defined a fixed set of categories. For **area**, I use around eight broad categories (I intentionally keep the number small), such as:

- Projects
- Budget & Reporting
- IT Management
- People
- Digitalization
- OT

These represent my major areas of responsibility.

**Subareas** are more specific and include things such as individual IT systems, major projects, technologies, or other niche topics.

For **date**, I always use the creation date. The **update** field is empty when I first create a knowledge element and is only filled once the element is modified later on.

#### Make post-processing faster

Post-processing information into knowledge is powerful, but it comes with a certain amount of effort.

Just for comparison, over the past four weeks, I accumulated about 60 knowledge elements. So if it takes you about 10 minutes per element, that's more than a workday per month just for creating knowledge elements.

To reduce this time, I recently added an AI layer to my post-processing workflow.

In our corporate setup, we use Microsoft Copilot, and I set up an agent (the type of agent you can easily build with a Pro license) that helps me with post-processing. The workflow now looks like this:

- I take the raw information (e.g. meeting notes, a concluding email to the participants, ...)
- I add a short prompt
- The agent generates a knowledge element (already formatted in Markdown for easy integration into my Obsidian environment)

Of course, I still review the generated knowledge element and refine it to ensure it will be valuable in the future.

But instead of spending 10+ minutes per knowledge element, I now need only about two minutes.

For emails, I additionally created a Power Automate flow that automatically generates a knowledge element based on a trigger (when I flag a particular email).

With these measures, I reduced the time it takes me to create knowledge elements by about 70%.

So don't be afraid that this approach will consume too much of your time. Processing information into knowledge does require some effort, and in my experience, spending roughly 30 minutes per week on creating valuable knowledge elements is one of the best investments I make in my own effectiveness.

## 4. Weekly aggregation & synthesis

This is where the system transcends being a note-taking system and becomes a decision-support system. On Fridays, I spend about 30 minutes doing a weekly review.

I go through the knowledge elements I created during the week and ask myself a couple of questions:

- **Developments relevant to management**
    - Where did things truly change?
    - Where did I gain more clarity?
    - Where did new uncertainty emerge?
- **Logging all knowledge elements**
    - Which knowledge elements changed?
    - Which knowledge elements are new?
- **Open topics and tensions**
    - Where are we lacking a decision?
    - Where are there contradictory signals?
    - Is an escalation likely somewhere?
- **Interconnections**
    - e.g. _"Decision X influences Risk Y"_

I don't do this in isolation, but with all the knowledge elements I created during the week in mind (and with a little support from AI to identify linkages and combine related knowledge elements).

This is where the system truly comes alive.

With this workflow, I gain three benefits:

- I get a high-quality recap of the week.
- The most important information is summarized on a weekly log page, ready to be retrieved later.
- The information helps me plan the upcoming week and serves as a quick way to boot up my RAM on Monday morning.

## Key takeaways

1. **Clarity beats completeness**
2. **Insights beat raw information**
3. **Connections beat isolated knowledge**
4. **Decisions are the real output**

## Final thought

Most systems help you **remember things**.

This system helps you:

> **understand, decide, and act in complex environments**

---

That covers the system as I run it manually today - structure in Part 1, workflow here in Part 2.

There's a third piece I'm still building: making the system AI-ready, with an agent that can sit across the knowledge elements, logs and stakeholder context and actually help with decisions rather than just retrieving notes. It's not there yet, so I'll save that for its own post once it's actually working rather than just sketched out.