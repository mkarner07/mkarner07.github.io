---
title: "Why Digitalization Projects Really Fail (And What We Miss)"
description: "For the last ten years, I’ve been involved in many projects - most of them with some kind of digitalization aspect. I’ve seen projects that worked really well. But I’ve also seen quite a few that were successfully implemented… only to be abandoned a few months later. That raises a simple question: Why do digitalization projects fail?"
date: 2026-07-02
excerpt_separator: "<!--more-->"
categories:
  - Tools in the Real World

tags:
  - Tools in the Real World
  - Digitalization
  - Projects
  - Methods

---

For the last ten years, I’ve been involved in many projects - most of them with some kind of digitalization aspect.

I’ve seen projects that worked really well.  
But I’ve also seen quite a few that were successfully implemented… only to be abandoned a few months later.

That raises a simple question: **Why do digitalization projects fail?**

| ![image](/assets/images/thisisengineering-Digitalization-unsplash.jpg) |
|:--:|
| *Photo by ThisisEngineering on Unsplash* |

### It’s not what we usually blame

When people talk about failed projects, the usual suspects are:

- Technical issues
- Poor requirements
- Lack of user acceptance

And yes, these play a role sometimes. But in my experience, they are rarely the _real_ reason.

There is something more fundamental that often gets overlooked:

**Change.**
### A simple example

Let’s take a typical scenario.

A team implements a software add-on to an existing production system. 
The requirements are carefully discussed. The solution is implemented properly.  
Change management is done, users are trained and the system goes live.

Everything looks good.

But after some time, problems start to appear.

Why?

Because the software tried to cover everything and did so in a very rigid way. The underlying process was built directly into the system, step by step and with very little room for deviation.

At first, that can feel like a strength, but in reality, processes don’t stay stable.

They change.
Often.  
And sometimes in ways no one expected.
### When change breaks the system

Now imagine that just one step in that process changes.

If the software isn’t designed to handle that change, it quickly becomes a problem.  
Small deviations lead to workarounds. Workarounds become complex and finally complexity becomes cost (especially if you at some point go to a system upgrade to some extent).

And at some point, a decision is made: **“It’s not worth it anymore.”**

The system gets abandoned.

Not because it was technically bad.  
Not because people didn’t try hard enough.
But because it wasn’t built to adapt.

### Why requirements are never “complete”

Before we continue with change, let's get into another (closly-linked) issue: requirements.

In many projects, requirements are incomplete or even wrong. But not because people are careless.

The real reason is simpler: **People cannot fully describe what they actually want upfront.**

They see the surface of a system. They don’t know how it works underneath (they cannot see or anticipate that). So they describe what they imagine, based on their current understanding.

Then someone with a technical view interprets these requirements and turns them into a system.

This gap (between what users mean and what gets implemented) creates friction.

### Why agile helps (but doesn’t solve everything)

This is exactly where agile approaches bring value.

By working iteratively (MVPs & continuous feedback) requirements can evolve as the system grows. Users don’t have to get everything right upfront. They learn along the way how the system actually works and doesn't work.

This leads to solutions that are much closer to what is actually needed.

However, this alone is not enough. Even agile systems can fail if they are too tightly bound to a fixed process.

### The real issue: rigidity

Earlier in my career, when I built software myself, I had a clear goal: Make it as convenient as possible. I didn't leave room for user error.

So I designed systems where the process was strictly enforced. Users had to follow predefined steps and the system ensured everything ran “correctly".

But over time, I realized the downside: **The more rigid the system, the less resilient it becomes.**

Even small changes in the process can break it.

### A different way to think about solutions

Today, I try to approach this differently.

When designing a solution, I look at the process, but I don’t try to lock it in completely.

Instead, I ask:

- Where are the critical intersections between steps?
- Where is change most likely to happen?
- Where do we need flexibility later on?

And then I deliberately leave room there. Sometimes this means not automating everything. Sometimes it means keeping a few manual steps, even if it feels less “optimal” at first.


### Why manual steps are not a failure

In digitalization, there is often a strong push to automate everything.

But full automation comes at a price: reduced flexibility.

A small manual step can act as a buffer. It allows the system to keep running even when the process around it changes.

You can always automate further later (as an add-on to the process). But if you remove all flexibility upfront, adapting becomes very expensive.

### The takeaway

Digitalization projects don’t fail because of technology.

They fail because they are built for a world that doesn’t change.

But reality is different.

Processes evolve.  
Requirements shift.  
Understanding grows over time.

If systems are not designed to handle that, they won’t survive long.

And this is especially true if you don't think of theses system in isolation, but as being a part of a larger solution-ecosytems.

### A simple principle to keep in mind

When building digital solutions: **Don’t optimize only for efficiency. Optimize for change.**

That often means:
- Iterative development instead of big upfront design
- Flexible processes instead of rigid ones
- And sometimes even accepting a bit of manual work

Because in the long run, adaptability is what keeps a solution alive.