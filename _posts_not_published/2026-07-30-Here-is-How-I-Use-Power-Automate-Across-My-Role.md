---
title: "Here's How I Use Power Automate Across My Role"
description: "I sit in about 30-40 meetings a week. On top of that, dozens of emails land in my inbox every day, most of them repetitive, plain, admin-style stuff. Many don't creativity - it just needs to get done."
date: 2026-07-30
excerpt_separator: "<!--more-->"
categories:
  - Tools in the Real World

tags:
  - Tools in the Real World
  - Digitalization
  - Tech
  - AI
  

---

I sit in about 30-40 meetings a week. On top of that, dozens of emails land in my inbox every day, most of them repetitive, plain, admin-style stuff. Many don't "creativity" - it just needs to get done.

| ![image](/assets/images/lenny-kuhne-automotive-robotics-unsplash.jpg) |
|:--:|
| *Photo by Lenny Kuhne on Unsplash* |

AI helps a lot with the harder, more creative parts of my job (as I explored in [this post](https://matthiaskarner.com/2026/01/Powerful-Copilot-Workflows/)). And yes, I use it daily.

For a long time there have been few methods available to automate the other tasks: Outlook rules exist for a couple of years already, but they fail as soon as a task becomes a bit more complex. On the other hand, full software integration for automating smaller tasks often isn't worth the effort.

So, there is that "hole" for tasks that can be hardly automated and still eat up (when combined) a good portion of the time and energy.

But there is a tool that can help: Microsoft Power Automate.

I started using it back in 2025, but mid 2026 I've built a couple of workflows that save me multiple hours per week. And, honestly, building them didn't take much longer than one day. So, the payback came quickly, and more than 3 months in, the time investment has already paid for itself four-fold.

## What is Power Automate?

If you've never heard about it, in a nutshell, Power Automate is a software that connects to the Microsoft products you already use daily (your Outlook, OneDrive and others) and helps you build workflows that either run on a scheduled basis or when a trigger is activated.

Workflows can be as simple as extracting an attachment from an email and storing it in a particular folder. But they can also be highly complex, integrated with SharePoint lists, used by more than just yourself and effectively function as their own IT systems (you could build a lot of the functionality of a CRM system with such flows, as I recently discussed with a colleague).

## Why use it

If your company uses Microsoft products, I can highly encourage you to give Power Automate a try. Even if you just set up one simple flow supporting you in managing your emails, it can quickly free up a couple of hours per month.

The barrier to using it is also quite small. You don't need deep IT know-how and you definitely don't need to be able to code. It's a graphical interface where you design workflows by arranging functional blocks together.

Simple flows often don't need more than 4 elements.

And the best thing: you can have Microsoft Copilot help you build your custom Power Automate flows.

One honest caveat: basic flows are usually included in your Microsoft 365 license, but some connectors (SharePoint, HTTP-requests, AI Builder credits) are "premium" and need extra licensing. Worth checking with your IT department before you get too excited about a flow that turns out to cost extra.

And it's not all smooth sailing. Flows can break silently when a connector changes or a permission expires and debugging isn't always intuitive. Nothing dramatic, but it's not "set it up once and forget about it forever" either.

## Some examples

But I don't want to leave it with a blank recommendation. I also want to show you some flows I currently use.

### Inbox triage + attachment handling

This flow goes deeper than what you could do with Outlook rules. It triggers when I receive a new email. Based on the subject and the sender, a simple rule is executed:
- If it's an important topic (a pre-set list of mine) or comes from an important stakeholder (e.g. my boss), the email stays in my inbox.
- If the email isn't considered that important by the rules stated above, it's moved to a separate folder in my inbox: "Non-priority".

Additionally, every attachment in an email is stored in a OneDrive folder.

**The impact**: I don't think email-based communication is that efficient. If you constantly monitor your inbox, it can eat up a lot of time quickly. So I made it a habit to only check my inbox every couple of hours. The triage helps me quickly scan through what's really important and leave the rest of the emails for those "empty" hours that emerge throughout the day when, for example, a meeting finishes earlier.

### Email to knowledge base

In my role as an IT lead, I'm participating in a lot of different projects. Currently, one of these projects has gotten quite big. I receive dozens of project-emails every day and it's difficult to keep all the topics in one place.

I built a flow that recognizes emails tied to this project and extracts all the text into an HTML file (that grows over time). Attachments are stored in the project folder and linked to from the HTML file.

**The impact**: With the HTML file, I have one place where all the (communication) information relevant to that project is stored. It's a great knowledge base and highly useful if I (or an AI agent) need to retrieve information about the project.

## The AI add-on

Power Automate has one more (very interesting) feature: you can add AI capability to it. Within your workflows, you can add a "prompt" task that runs a prompt while using information that comes in when triggered.

Sounds complex, but it isn't.

I use it to build a "Meeting Preparation Bot".

### Meeting preparation bot

Every week I participate in about 30-40 meetings and I don't want to attend unprepared. But with back-to-back meetings, it's often hard to find the time to prepare.

That's when I came up with this automation.

15 minutes before a meeting starts (that's the trigger), the flow runs. It reads the meeting title and a couple of note files that store important information about current projects, priorities, risks and decisions (that's actually based on my knowledge system: if you're interested, there are some posts coming in the next weeks).

This input is fed into a prompt that's tasked with processing all the information and condensing it into a short (3-5 bullet points) answer. This answer is then sent to my Teams chat.

**The impact**: For every meeting, I get a short Teams message preparing me for what's coming, saving me about 3 hours of preparation time every week.

## The bottom line

In my opinion, Power Automate is a great tool. And in some way, I think it's underrated, coming to popularity at a time when AI seems omnipresent. But for many tasks you don't need the power of AI. On the contrary - a more fixed workflow is even better (and more reliable) for some tasks.

And if you combine both (the reliability of Power Automate with the capability of AI) you can build great flows that automate huge chunks of recurring tasks and save you time every week.

If you want to get started, don't try to build your Meeting Preparation Bot on day one. Start with something small: an Outlook triage flow, or just auto-saving attachments to a folder. That's a 15-minute build, and it'll show you quickly whether the tool clicks for you before you invest time into anything more complex.