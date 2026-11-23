// Content and rules for the Governance Check. Data only, no logic.
// Edit by hand; app.js checks this file on load and reports mistakes.
window.GOVERNANCE_DATA = {
  "title": "Governance Check",
  "subtitle": "Would this use case get approved?",
  "disclaimer": "Teaching tool. Generic criteria, not legal advice and not the policy of any specific company.",
  "homeLink": { "url": "/", "label": "matthiaskarner.com" },
  "intro": "Pick an example or your own AI use case, answer twelve questions, and see where an approval would get stuck.",
  "privacyNote": "Your answers stay in this browser.",
  "ownCase": { "label": "My own use case", "titleLabel": "Use case title" },

  "levels": {
    "green": { "label": "OK" },
    "amber": { "label": "Clarify" },
    "red":   { "label": "Blocker" }
  },

  "areas": [
    { "id": "governance", "name": "Governance", "question": "Which data goes where, and who is responsible?" },
    { "id": "approval",   "name": "Approval",   "question": "Who has to sign off?" },
    { "id": "legacy",     "name": "Legacy",     "question": "Which systems does it have to connect to?" },
    { "id": "data",       "name": "Data",       "question": "Is the data there, and is the output right?" },
    { "id": "operations", "name": "Operations", "question": "Who runs it, and what happens when it fails?" },
    { "id": "value",      "name": "Value",      "question": "Does it pay off, for someone who owns a budget?" }
  ],

  "questions": [
    {
      "id": "G1",
      "area": "governance",
      "text": "How sensitive is the data the workflow touches?",
      "help": "Take the most sensitive item: inputs, documents the model can read, and outputs.",
      "options": [
        { "id": "public", "text": "Public or non-sensitive (published information, test data)", "level": "green" },
        { "id": "internal", "text": "Internal business data (machine states, order numbers, internal reports)", "level": "green" },
        { "id": "confidential", "text": "Confidential (customer data, prices, contracts, drawings)", "level": "green" },
        { "id": "strict", "text": "Strictly confidential or regulated (trade secrets, export-controlled, security-relevant)", "level": "amber",
          "finding": "Strictly confidential data needs an explicit decision by the data owner, wherever it runs.",
          "fix": "Get the data owner's decision in writing before you build." }
      ]
    },
    {
      "id": "G2",
      "area": "governance",
      "text": "Where does the data end up?",
      "help": "Take the weakest link: the workflow tool and the model both count.",
      "options": [
        { "id": "onprem", "text": "On company infrastructure (self-hosted tool and model)", "level": "green" },
        { "id": "tenant", "text": "In the company's own cloud tenant, on a platform it already uses", "level": "green" },
        { "id": "vendor", "text": "In a vendor's cloud under a company contract (including a data processing agreement)", "level": "green" },
        { "id": "personal", "text": "In a free tier, a personal account or on a private device", "level": "amber",
          "finding": "There is no contract between your company and the provider. Fine for learning with public data, not for company work.",
          "fix": "Rebuild it on a platform your company has a contract for." }
      ]
    },
    {
      "id": "A1",
      "area": "approval",
      "text": "Is the tool approved in the company?",
      "options": [
        { "id": "approved", "text": "Yes, approved and licensed for this kind of use", "level": "green" },
        { "id": "other", "text": "Approved for another purpose, or a pilot is possible", "level": "amber",
          "finding": "Approved elsewhere is not approved here.",
          "fix": "Ask for a pilot with a small, clearly described scope." },
        { "id": "process", "text": "Not approved, but there is a process to request it", "level": "amber",
          "finding": "Plan for the approval process: weeks to months, not days.",
          "fix": "Start the request now and keep the first scope small." },
        { "id": "rejected", "text": "Not approved: a new kind of tool, or something similar was rejected before", "level": "red",
          "finding": "New tool classes need a full review. Without a sponsor this stalls.",
          "fix": "Find a sponsor in management, or use a tool that is already approved." }
      ]
    },
    {
      "id": "A2",
      "area": "approval",
      "text": "Does it process data about people?",
      "help": "Employees, customers, suppliers. Names in a free-text field count.",
      "options": [
        { "id": "none", "text": "No", "level": "green" },
        { "id": "incidental", "text": "Incidentally (names or user IDs appear in the data)", "level": "amber",
          "finding": "Personal data needs a data protection check, even when it is only incidental.",
          "fix": "Involve data protection early, or remove names before the model sees the text." },
        { "id": "systematic", "text": "Systematically (the workflow is about people's data)", "level": "amber",
          "finding": "Expect a data protection assessment and the involvement of employee representatives.",
          "fix": "Describe purpose, data fields and retention before you ask for approval." },
        { "id": "evaluation", "text": "It evaluates or ranks people (performance, behaviour, applicants)", "level": "red",
          "finding": "Evaluating people with AI is the most regulated case and can fall under the high-risk rules of the EU AI Act.",
          "fix": "Talk to legal and employee representatives before anything is built." }
      ]
    },
    {
      "id": "L1",
      "area": "legacy",
      "text": "Which company systems does it touch?",
      "options": [
        { "id": "none", "text": "None. It works on files or text that people copy in", "level": "green" },
        { "id": "read", "text": "It reads from company systems", "level": "green" },
        { "id": "write", "text": "It writes to supporting systems (tickets, mail, chat, lists)", "level": "green" },
        { "id": "core", "text": "It writes to core systems (ERP, MES) or controls machines", "level": "amber",
          "finding": "Writing to core systems needs the system owner, a test system and a rollback plan.",
          "fix": "Start read-only, or write to a staging area that a person releases." }
      ]
    },
    {
      "id": "L2",
      "area": "legacy",
      "text": "How does it connect?",
      "options": [
        { "id": "manual", "text": "No technical connection: copy and paste, or file upload", "level": "green" },
        { "id": "service", "text": "Standard connector or official API with a service account", "level": "green" },
        { "id": "personalacct", "text": "Standard connector or API, but under my own user account or token", "level": "amber",
          "finding": "It runs with your rights and stops when you leave or your password changes.",
          "fix": "Ask IT for a service account with only the rights the workflow needs." },
        { "id": "custom", "text": "An external service must reach into the company network, or the legacy system must be changed", "level": "red",
          "finding": "Opening the network for an external service, or changing a legacy system, is a project of its own.",
          "fix": "Look for an official interface, or move the workflow to where the system already is." }
      ]
    },
    {
      "id": "D1",
      "area": "data",
      "text": "Where is the input data, and in what shape?",
      "options": [
        { "id": "ready", "text": "In one system, structured, and I have access", "level": "green" },
        { "id": "spread", "text": "Spread over several systems or exports, usable with effort", "level": "amber",
          "finding": "Expect most of the effort here: different keys, units and timestamps.",
          "fix": "Join a small real sample by hand before you automate anything." },
        { "id": "messy", "text": "Free text, mails, Excel, people's heads; quality unknown", "level": "amber",
          "finding": "\"Available\" is not the same as \"usable\".",
          "fix": "Check a real sample of 50 records before you build." },
        { "id": "missing", "text": "It does not exist yet and must be collected first", "level": "red",
          "finding": "No data, no use case.",
          "fix": "Start with data collection and come back later." }
      ]
    },
    {
      "id": "D2",
      "area": "data",
      "text": "How do you know the output is right?",
      "options": [
        { "id": "testset", "text": "A test set of real cases with expected results", "level": "green" },
        { "id": "expert", "text": "An expert spot-checks results regularly", "level": "amber",
          "finding": "Spot checks find obvious errors, not slow drift.",
          "fix": "Turn 20 to 30 real cases into a test set and rerun it after every change." },
        { "id": "feels", "text": "I tried a few examples and it looked good", "level": "red",
          "finding": "A few good examples are a demo, not a test.",
          "fix": "Collect real cases, including difficult ones, and write down the expected result." },
        { "id": "nocheck", "text": "Nobody can check it: there is no reference for what is correct", "level": "red",
          "finding": "If nobody can tell right from wrong, nobody can take responsibility for it.",
          "fix": "Define with an expert what a correct result looks like." }
      ]
    },
    {
      "id": "O1",
      "area": "operations",
      "text": "Who runs it after go-live?",
      "options": [
        { "id": "itops", "text": "A named owner plus IT operations or a support process", "level": "green" },
        { "id": "dept", "text": "A named owner in the department, best effort", "level": "amber",
          "finding": "Best effort is fine for a pilot, not for something production depends on.",
          "fix": "Write down who is called when it fails, and what \"best effort\" means." },
        { "id": "builder", "text": "Me, the person who built it", "level": "amber",
          "finding": "A one-person system. Who takes over during holidays, or when you change jobs?",
          "fix": "Name a second person and document how to restart and how to change it." },
        { "id": "nobody", "text": "Nobody yet", "level": "red",
          "finding": "No owner, no go-live.",
          "fix": "Find an owner before you ask for approval." }
      ]
    },
    {
      "id": "O2",
      "area": "operations",
      "text": "What happens when it is wrong or down?",
      "options": [
        { "id": "review", "text": "A person reviews every result before anything happens, and the manual process still works", "level": "green" },
        { "id": "auto_easy", "text": "It acts automatically, errors are easy to spot and undo, and the manual process still works", "level": "green" },
        { "id": "auto_hard", "text": "It acts automatically, and errors are costly or hard to notice", "level": "amber",
          "finding": "Costly errors that nobody notices are the expensive kind.",
          "fix": "Add a human check for the costly cases and monitoring for the rest." },
        { "id": "impact", "text": "Errors can affect safety, customers or money, and nobody checks first", "level": "red",
          "finding": "No automation without a check where safety, customers or money are involved.",
          "fix": "Put a person in the loop, or reduce what the workflow is allowed to do." }
      ]
    },
    {
      "id": "V1",
      "area": "value",
      "text": "How do you know it pays off?",
      "options": [
        { "id": "measured", "text": "A measured baseline and a KPI that the budget owner agreed to", "level": "green" },
        { "id": "estimated", "text": "An estimated benefit, plausible, with a named beneficiary", "level": "amber",
          "finding": "Without a baseline you cannot prove the saving later.",
          "fix": "Measure the current state now: time per case, cases per week, error rate." },
        { "id": "vague", "text": "It should help, but there is no number and nobody is asking for it", "level": "red",
          "finding": "Unclear business value is one of the main reasons AI projects are dropped after the pilot.",
          "fix": "Find the person who has the problem and agree on one number." },
        { "id": "cool", "text": "Mainly because the technology is interesting", "level": "red",
          "finding": "A solution looking for a problem.",
          "fix": "Keep it as a learning project, or find a real problem for it." }
      ]
    },
    {
      "id": "V2",
      "area": "value",
      "text": "Who pays for building and running it?",
      "options": [
        { "id": "budgeted", "text": "The cost is known and a budget owner has agreed", "level": "green" },
        { "id": "known", "text": "The cost is known, but there is no budget yet", "level": "amber",
          "finding": "Known cost without a budget is still a no.",
          "fix": "Put cost and benefit on one page for the budget owner." },
        { "id": "unpriced", "text": "The cost is unknown (per-use pricing, licences, scaling)", "level": "amber",
          "finding": "Per-use pricing surprises at scale.",
          "fix": "Estimate volume times price for one year before the pilot." },
        { "id": "free", "text": "It is free, so cost does not matter", "level": "amber",
          "finding": "Free tiers end: rate limits, changed terms, no support. And your time is not free.",
          "fix": "Calculate what it costs on a paid plan, including the hours to run it." }
      ]
    }
  ],

  "unknown": {
    "text": "I don't know",
    "level": "amber",
    "finding": "Open question: {question}",
    "fix": "Find out who can answer this in your company."
  },
  "unknownWarning": {
    "min": 4,
    "text": "Too many open questions for a reliable result. Find out first."
  },

  "rules": [
    { "id": "R1", "when": { "G2": ["personal"], "G1": ["internal", "confidential", "strict"] },
      "area": "governance", "level": "red",
      "finding": "Company data leaves the company without a contract.",
      "fix": "Move to an approved platform, or reduce the workflow to public or synthetic data." },
    { "id": "R2", "when": { "G2": ["vendor"], "G1": ["confidential"] },
      "area": "governance", "level": "amber",
      "finding": "Confidential data at an external vendor: data owner and IT security must agree to this vendor explicitly.",
      "fix": "Ask whether this vendor is cleared for confidential data." },
    { "id": "R3", "when": { "G2": ["vendor"], "G1": ["strict"] },
      "area": "governance", "level": "red",
      "finding": "Strictly confidential data usually may not leave the company's own environment.",
      "fix": "Keep it in the company's own environment, or leave this data out." },
    { "id": "R4", "when": { "G2": ["personal"], "A2": ["incidental", "systematic", "evaluation"] },
      "area": "approval", "level": "red",
      "finding": "Personal data in a service without a data processing agreement.",
      "fix": "Use a platform with a contract, or remove personal data before it leaves." },
    { "id": "R5", "when": { "L1": ["core"], "O2": ["auto_hard", "impact"] },
      "area": "legacy", "level": "red",
      "finding": "Automatic writes to core systems without a review.",
      "fix": "Let a person release every write, or write to a staging area first." },
    { "id": "R6", "when": { "G2": ["onprem"], "O1": ["builder", "nobody"] },
      "area": "operations", "level": "red",
      "finding": "Self-hosting means patching, backups and monitoring. That needs an operations team, not one person.",
      "fix": "Get IT operations on board, or use a managed platform." }
  ],

  "signoffsTitle": "Sign-offs you will probably need",
  "noSignoffs": "None beyond your own manager.",
  "areaClear": "Nothing blocks this area.",
  "signoffs": [
    { "id": "security", "label": "IT security",
      "anyOf": [ { "A1": ["other", "process", "rejected"] }, { "G2": ["vendor", "personal"] },
                 { "L1": ["core"] }, { "L2": ["custom"] } ] },
    { "id": "privacy", "label": "Data protection",
      "anyOf": [ { "A2": ["incidental", "systematic", "evaluation"] } ] },
    { "id": "council", "label": "Employee representatives (works council)",
      "anyOf": [ { "A2": ["systematic", "evaluation"] } ] },
    { "id": "legal", "label": "Legal and procurement",
      "anyOf": [ { "A1": ["process", "rejected"] }, { "G2": ["personal"] }, { "A2": ["evaluation"] } ] },
    { "id": "sysowner", "label": "Owner of each connected system",
      "anyOf": [ { "L1": ["read", "write", "core"] } ] },
    { "id": "dataowner", "label": "Data owner",
      "anyOf": [ { "G1": ["confidential", "strict"] } ] },
    { "id": "budget", "label": "Budget owner",
      "anyOf": [ { "V2": ["known", "unpriced", "free"] } ] }
  ],

  "verdicts": [
    { "id": "blocked", "level": "red", "minRed": 1,
      "title": "Blocked as it stands",
      "text": "Fix the red areas first. Everything else can wait." },
    { "id": "homework", "level": "amber", "maxRed": 0, "minAmber": 3,
      "title": "Approvable, with homework",
      "text": "Nothing blocks it, but expect several rounds before go-live." },
    { "id": "pilot", "level": "green", "maxRed": 0, "maxAmber": 2,
      "title": "Ready for a pilot",
      "text": "Ask for a pilot with a small scope. A pilot is not a go-live." }
  ],

  "reference": {
    "title": "Where your answers differ from the reference",
    "yours": "Your answer:",
    "label": "Reference answer:",
    "none": "All your answers match the reference."
  },
  "comparison": {
    "title": "Compare variants A and B",
    "different": "Different in:",
    "same": "The same in:",
    "closing": "The tool changes some of the lights. The rest is homework, whatever tool you choose.",
    "expectDifferent": ["governance", "approval"]
  },

  "scenarios": [
    {
      "id": "A",
      "short": "Variant A",
      "label": "Fault report triage – Variant A: n8n cloud + free Gemini API",
      "briefingTitle": "Fault report triage",
      "briefing": [
        "A manufacturing company with about 400 employees. Machine operators report faults as free text, about 40 reports per day. A report contains the machine ID, a description and the name of the operator.",
        "The workflow reads each report, lets a language model extract machine, fault category and priority, creates a ticket in the company's service desk and notifies the maintenance on-call for high-priority faults. The service desk is a cloud service with an official API. The workflow connects with the API token of the engineer who built it.",
        "Tickets are created automatically. The maintenance planner goes through the queue every morning and corrects wrong categories. If the workflow is down, operators call the maintenance desk, as they do today.",
        "A process engineer built it and looks after it. The maintenance manager wants it and estimates five minutes saved per report. Nobody has measured the current effort.",
        "It runs on n8n cloud with the engineer's own account and the free tier of the Gemini API. The company has no contract with either provider and has not approved the tools, but there is a process to request new tools. It costs nothing at the moment."
      ],
      "reference": {
        "G1": "internal", "G2": "personal",
        "A1": "process", "A2": "incidental",
        "L1": "write", "L2": "personalacct",
        "D1": "messy", "D2": "expert",
        "O1": "builder", "O2": "auto_easy",
        "V1": "estimated", "V2": "free"
      }
    },
    {
      "id": "B",
      "short": "Variant B",
      "label": "Fault report triage – Variant B: Power Automate + Copilot in the company tenant",
      "briefingTitle": "Fault report triage",
      "briefing": [
        "A manufacturing company with about 400 employees. Machine operators report faults as free text, about 40 reports per day. A report contains the machine ID, a description and the name of the operator.",
        "The workflow reads each report, lets a language model extract machine, fault category and priority, creates a ticket in the company's service desk and notifies the maintenance on-call for high-priority faults. The service desk is a cloud service with an official API. The workflow connects with the API token of the engineer who built it.",
        "Tickets are created automatically. The maintenance planner goes through the queue every morning and corrects wrong categories. If the workflow is down, operators call the maintenance desk, as they do today.",
        "A process engineer built it and looks after it. The maintenance manager wants it and estimates five minutes saved per report. Nobody has measured the current effort.",
        "It runs on Power Automate and Copilot in the company's Microsoft 365 tenant. Both are approved and licensed. The additional licence cost is known, but nobody has a budget for it yet."
      ],
      "reference": {
        "G1": "internal", "G2": "tenant",
        "A1": "approved", "A2": "incidental",
        "L1": "write", "L2": "personalacct",
        "D1": "messy", "D2": "expert",
        "O1": "builder", "O2": "auto_easy",
        "V1": "estimated", "V2": "known"
      }
    }
  ],

  "tests": [
    { "name": "Reference A",
      "answers": { "G1": "internal", "G2": "personal", "A1": "process", "A2": "incidental", "L1": "write", "L2": "personalacct",
                   "D1": "messy", "D2": "expert", "O1": "builder", "O2": "auto_easy", "V1": "estimated", "V2": "free" },
      "expect": { "areas": {"governance": "red", "approval": "red", "legacy": "amber", "data": "amber", "operations": "amber", "value": "amber"},
                  "verdict": "blocked",
                  "signoffs": ["security", "privacy", "legal", "sysowner", "budget"],
                  "rules": ["R1", "R4"],
                  "unknownCount": 0 } },
    { "name": "Reference B",
      "answers": { "G1": "internal", "G2": "tenant", "A1": "approved", "A2": "incidental", "L1": "write", "L2": "personalacct",
                   "D1": "messy", "D2": "expert", "O1": "builder", "O2": "auto_easy", "V1": "estimated", "V2": "known" },
      "expect": { "areas": {"governance": "green", "approval": "amber", "legacy": "amber", "data": "amber", "operations": "amber", "value": "amber"},
                  "verdict": "homework",
                  "signoffs": ["privacy", "sysowner", "budget"],
                  "rules": [],
                  "unknownCount": 0 } },
    { "name": "Best case",
      "answers": { "G1": "public", "G2": "tenant", "A1": "approved", "A2": "none", "L1": "none", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "itops", "O2": "review", "V1": "measured", "V2": "budgeted" },
      "expect": { "areas": {"governance": "green", "approval": "green", "legacy": "green", "data": "green", "operations": "green", "value": "green"},
                  "verdict": "pilot",
                  "signoffs": [],
                  "rules": [],
                  "unknownCount": 0,
                  "unknownWarning": false } },
    { "name": "R1: company data in a personal account",
      "answers": { "G1": "internal", "G2": "personal", "A1": "approved", "A2": "none", "L1": "none", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "itops", "O2": "review", "V1": "measured", "V2": "budgeted" },
      "expect": { "areas": {"governance": "red", "approval": "green", "legacy": "green", "data": "green", "operations": "green", "value": "green"},
                  "verdict": "blocked",
                  "signoffs": ["security", "legal"],
                  "rules": ["R1"] } },
    { "name": "R2: confidential data at a vendor",
      "answers": { "G1": "confidential", "G2": "vendor", "A1": "approved", "A2": "none", "L1": "none", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "itops", "O2": "review", "V1": "measured", "V2": "budgeted" },
      "expect": { "areas": {"governance": "amber", "approval": "green", "legacy": "green", "data": "green", "operations": "green", "value": "green"},
                  "verdict": "pilot",
                  "signoffs": ["security", "dataowner"],
                  "rules": ["R2"] } },
    { "name": "R3: strictly confidential data at a vendor",
      "answers": { "G1": "strict", "G2": "vendor", "A1": "approved", "A2": "none", "L1": "none", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "itops", "O2": "review", "V1": "measured", "V2": "budgeted" },
      "expect": { "areas": {"governance": "red", "approval": "green", "legacy": "green", "data": "green", "operations": "green", "value": "green"},
                  "verdict": "blocked",
                  "signoffs": ["security", "dataowner"],
                  "rules": ["R3"] } },
    { "name": "R4: personal data in a personal account",
      "answers": { "G1": "public", "G2": "personal", "A1": "approved", "A2": "incidental", "L1": "none", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "itops", "O2": "review", "V1": "measured", "V2": "budgeted" },
      "expect": { "areas": {"governance": "amber", "approval": "red", "legacy": "green", "data": "green", "operations": "green", "value": "green"},
                  "verdict": "blocked",
                  "signoffs": ["security", "privacy", "legal"],
                  "rules": ["R4"] } },
    { "name": "R5: automatic writes to core systems",
      "answers": { "G1": "public", "G2": "tenant", "A1": "approved", "A2": "none", "L1": "core", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "itops", "O2": "auto_hard", "V1": "measured", "V2": "budgeted" },
      "expect": { "areas": {"governance": "green", "approval": "green", "legacy": "red", "data": "green", "operations": "amber", "value": "green"},
                  "verdict": "blocked",
                  "signoffs": ["security", "sysowner"],
                  "rules": ["R5"] } },
    { "name": "R6: self-hosted, run by the builder",
      "answers": { "G1": "public", "G2": "onprem", "A1": "approved", "A2": "none", "L1": "none", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "builder", "O2": "review", "V1": "measured", "V2": "budgeted" },
      "expect": { "areas": {"governance": "green", "approval": "green", "legacy": "green", "data": "green", "operations": "red", "value": "green"},
                  "verdict": "blocked",
                  "signoffs": [],
                  "rules": ["R6"] } },
    { "name": "Four unknowns trigger no rule and no sign-off",
      "answers": { "G1": "confidential", "G2": "unknown", "A1": "unknown", "A2": "unknown", "L1": "none", "L2": "manual",
                   "D1": "ready", "D2": "testset", "O1": "itops", "O2": "review", "V1": "measured", "V2": "unknown" },
      "expect": { "areas": {"governance": "amber", "approval": "amber", "legacy": "green", "data": "green", "operations": "green", "value": "amber"},
                  "verdict": "homework",
                  "signoffs": ["dataowner"],
                  "rules": [],
                  "unknownCount": 4,
                  "unknownWarning": true } }
  ]
};
