---
title: "Tools for LENS"
description: "People keep asking what LENS runs on. The honest answer is: two different setups. LENS was born at work, and I later brought it into my private notes. It is the same system, but I use different tools."
date: 2026-10-29
excerpt_separator: "<!--more-->"
categories:
  - Tools in the Real World

tags:
  - Tools in the Real World
  - Leadership as a System
  - Notetaking
  - Decision
  - Methods
  - Digitalization
  - Tech
  - AI

---

People keep asking what LENS runs on. The honest answer is: two different setups. LENS was born at work, and I later brought it into my private notes. It is the same system, but I use different tools.

| ![image](/assets/images/diego-ph-lightbulb-unsplash.jpg) |
|:--:|
| *Photo by Diego Ph on Unsplash* |

## Same system, different plumbing
LENS is built around decisions, not software. If you can't say which decision a note supports, no tool will fix that. I'd say that running it in two very different environments is the best evidence I have for that. Both setups are Obsidian-based, but everything around it differs.

## Work: OneNote to Obsidian on OneDrive

LENS started here.

I used OneNote first. An honestly, it is a great piece of software: it seamlessly syncs between devices, gives you a lot of freedom on how to structure your notes and supports many different media types (even good handwriting support). But I, nevertheless, switched to Obsidian. You might ask why and the answer is simple: proprietary of notes and lack of AI-support (there is within OneNote, but the information cannot be accessed from outside of OneNote).

I moved to Obsidian and kept the vault files in my M365 OneDrive. The upside is actually boring in a good way: no server to run, sync just works, and it sits inside an supported environment. The downside: the Obsidian app on my phone doesn't support it. If I want to work with my notes on my phone, I must use a different markdown-writing app. 

The agent layer lives on OneDrive too. I use Microsoft Copilot Studio at work, and it has access to the LENS vault. That's the whole trick: the structure from [Part 1]({% post_url 2026-08-20-Part-1-Building-a-Decision-Centric-Productivity-System %}) and [Part 2]({% 2026-09-03-Part-2-Building-a-Decision-Centric-Productivity-System %}) is what makes it useful. Copilot is just what my employer gives me. Any other AI assistant that can read your files would do the same job. [Part 3]({% 2026-10-01-Part-3-Building-a-Decision-Centric-Productivity-System %}) covers the details, so I won't repeat them.

### A few Python scripts

At work I also added a handful of simple Python scripts to manage my notes.
- Combine markdown files (to create bigger *.md files handed over to "simple" agents)
- Create an index of knowledge elements

Nothing clever. They save me time for repetitive steps.

The following example is a script that combines all *.md files from a SOURCE_FOLDER and pastes their content in one file (OUTPUT_FILE) to be saved in the TARGET_FOLDER.

```python
from pathlib import Path

# ==========================================
# Parameter
# ==========================================

SOURCE_FOLDER = ...     # folder-directory with .md files
TARGET_FOLDER = ...

OUTPUT_FILE = "knowledge-elements-combined.txt"

# ==========================================
# Verarbeitung
# ==========================================

source_path = Path(SOURCE_FOLDER)
target_path = Path(TARGET_FOLDER)

target_path.mkdir(parents=True, exist_ok=True)

output_file = target_path / OUTPUT_FILE
temp_file = target_path / f"{OUTPUT_FILE}.tmp"

try:

    # Zuerst in temporäre Datei schreiben
    with open(temp_file, "w", encoding="utf-8") as outfile:

        # Dateien alphabetisch verarbeiten
        for index, md_file in enumerate(sorted(source_path.glob("*.md"))):

            if index > 0:
                outfile.write("\n\n---\n\n# ")
            else:
                outfile.write("# ")

            # Dateiname ohne Endung
            outfile.write(f"{md_file.stem}\n\n")

            # Read-Only Zugriff auf Quelldatei
            with open(md_file, "r", encoding="utf-8") as infile:
                outfile.write(infile.read().strip())

    # Bestehende Datei atomar ersetzen
    temp_file.replace(output_file)

    print(f"Datei erstellt: {output_file}")

except PermissionError:
    print(
        f"ERROR: '{output_file}' is opend or locked.\n"
        f"Please close the file and re-run this script."
    )

except Exception as e:
    print(f"Error: {e}")
```


If you can't code, this is a good place to start with AI help. Describe what you want, get a script, test it on a copy of your vault. I did do a lot of Python programming some years ago, but I am not very fast anymore, so I did create the scripts with AI-support, and it worked well (and saved me one or two hours).

## Private: Notion to Obsidian on my NAS

My private notes lived in Notion. I migrated about 1,000 notes to Obsidian - not because I didn't enjoy Notion (it's actually quite good), but because I wanted to move away from a cloud-based solution for my notes.

Here I wanted full control, so I sync with Obsidian LiveSync against a CouchDB instance I host on a Ugreen [NAS](https://matthiaskarner.com/2026/03/Why-a-NAS-Is-Now-a-Must-Have-in-My-Digital-Life/) at home. Desktop and phone stay in sync and the notes never leave my own hardware.

Was it worth it? 

Yes, it was. I now have a local setupan am not reliant on a cloud service. I wasn't afraid of "losing" the data, but I do like the knowledge of my files living on my own storage much more. But it was not all sunshine and rainbows. It took some time to set up (but there are many good tutorials on how to setup LiveSync) and the sync only works when all devices are on the same network. So when I am on the go my notes from my phone will stay on my phone until it logs back into my home wifi.

If you don't care where your notes live, the (paid) built-in Obsidian sync is the sane choice.

On the private side I'm also experimenting with Claude Desktop against the vault. It's still early and I'm building it out, so I won't claim results yet. The bet is that the same structure that works with Copilot at work carries over. I'll report back once it's tested.

## What LENS asks of any tool

Two setups, same requirements:
- Notes are portable, ideally plain text.
- Metadata is structured, so you (and an agent) can filter by it.
- You can script or automate around it.
- It works on your phone, because decisions don't wait for your desk.
- An AI assistant can read it. Which one is secondary, as the structure is what matters.

OneNote and Notion both struggled with at least one of these - OneNote notes aren't really portable and, Notion is only cloud-based and both lack AI connectivity (both have integrated AI, though). Obsidian meets all requirements in both environments.

## What didn't work

In my private setup I iterated a lot between different ideas for syncing. At first I thought of just using Obsidian on my private PC, but it seemed off in the age of AI to not even have synchronization between devices. But I didn't want to pay for Obsidian sync, because I wasn't sure if I'd stay with Obsidian. Therefore, I researched a bit and found the plugin LiveSync. I implemented it - it wasn't to hard, but I had to set aside about an hour to get it running on my NAS. The plugin works fine (most of the time), but it is not perfect as there is no synchronization from my phone when I am not in my home Wi-Fi. But it will sync as soon as my phone logs into my home Wi-Fi.

And the syncing works quite well. Even if there pops up a conflict within a note (because it was changed from different systems at the same time) it can be easily resolved. And honestly, that doesn't happen all too often for the system.

At work the agent-based functionalities were first very limited to the "simple" agents you can build with the Microsoft Copilot Pro version. The issue was that it is limited to about 50 different files - with a vault of 250+ files that's not covered. There are workarounds (as I closed with my Python script), but it is not optimal. But since I moved over to a more powerful agent provided from Microsoft Copilot Studio it unveiled the true power of an agent-supported working style.

In my private setup I went back and forth a lot on syncing. At first, I thought about just using Obsidian on my private PC, but in the age of AI it felt off to have no synchronization between devices. I didn't want to pay for Obsidian Sync either, because I wasn't sure I'd stay with Obsidian. So, I did some research and found the LiveSync plugin. It wasn't too hard, but I had to set aside about an hour to get it running on my NAS.
The plugin works fine, most of the time. The catch: my phone doesn't sync when I'm outside my home Wi-Fi. It catches up as soon as it's back on it. And the sync itself works quite well. If a note gets changed on two systems at once, the conflict is easy to resolve. Honestly, that doesn't happen all that often.

At work, the agent side was very limited at first. The simple agents you can build with Copilot Pro handle about 50 files, and my vault has 250+. There are workarounds (as I closed with my Python script shown above), but they're not optimal. Then I moved to a more powerful agent in Microsoft Copilot Studio, and that showed me what an agent-supported way of working can really do.

## If you're starting tomorrow

Skip most of this.

Install Obsidian, make three note types, no plugins, no sync server, no agent.

Use it for two weeks.

Once your notes have a consistent structure, a small script or an AI assistant becomes useful almost immediately (but not before). Add a tool only when a specific pain shows up and not because a blog post mentioned it (including this one). If your company has already given you OneDrive, that's a fine place to start.

---

#### More about LENS
You can find the full system on the [LENS hub]({% 2026-10-01-LENS-a decision-centric-approach-to-knowledge-and-productivity %}). [Part 3]({% 2026-10-01-Part-3-Building-a-Decision-Centric-Productivity-System %}) covers the agent layer. In the next post I'll write about the "LENS Register" - an addition to LENS for list-like data (e.g. supplier lists).