// Governance Check – plain JavaScript, no build step.
// All content comes from questions.js (window.GOVERNANCE_DATA).
"use strict";

/* ===================================================================
   data: loading and checking questions.js
   =================================================================== */

const LEVELS = ["green", "amber", "red"];
const UNKNOWN = "unknown"; // reserved option ID for "I don't know"
const OWN = "own"; // reserved mode ID for "My own use case"

// Returns a list of readable error messages; empty when the data is fine.
function validateData(data) {
  const errors = [];
  const err = (where, msg) => errors.push(where + ": " + msg);
  const isText = (v) => typeof v === "string" && v.trim() !== "";
  const isCount = (v) => Number.isInteger(v) && v >= 0;
  const at = (list, i, item) =>
    list + "[" + i + "]" + (item && isText(item.id) ? " (" + item.id + ")" : "");

  if (!data || typeof data !== "object") {
    return ["questions.js: window.GOVERNANCE_DATA is missing. " +
      "The file did not load, or it has a syntax error (missing comma, quote or bracket)."];
  }

  const lists = ["areas", "questions", "rules", "signoffs", "verdicts", "scenarios", "tests"];
  lists.forEach((key) => {
    if (!Array.isArray(data[key])) err(key, "must be a list [ … ]");
  });
  if (errors.length) return errors;

  ["title", "subtitle", "intro", "privacyNote", "disclaimer", "signoffsTitle", "noSignoffs", "areaClear"].forEach((key) => {
    if (!isText(data[key])) err(key, "text is missing");
  });

  if (!data.ownCase || !isText(data.ownCase.label) || !isText(data.ownCase.titleLabel)) {
    err("ownCase", "needs label and titleLabel");
  }

  LEVELS.forEach((level) => {
    if (!data.levels || !data.levels[level] || !isText(data.levels[level].label)) {
      err("levels." + level, "label is missing");
    }
  });

  const u = data.unknown;
  if (!u || !isText(u.text) || !isText(u.finding) || !isText(u.fix)) {
    err("unknown", "needs text, finding and fix");
  } else if (!LEVELS.includes(u.level)) {
    err("unknown.level", "\"" + u.level + "\" is not one of " + LEVELS.join(", "));
  }
  const w = data.unknownWarning;
  if (!w || !Number.isInteger(w.min) || w.min < 1 || !isText(w.text)) {
    err("unknownWarning", "needs min (a number from 1) and text");
  }

  // Unique IDs per list
  const ids = (key) => {
    const seen = new Set();
    data[key].forEach((item, i) => {
      if (!item || !isText(item.id)) return err(at(key, i), "id is missing");
      if (seen.has(item.id)) err(at(key, i, item), "id is used twice");
      seen.add(item.id);
    });
    return seen;
  };
  const areaIds = ids("areas");
  ids("questions");
  const ruleIds = ids("rules");
  const signoffIds = ids("signoffs");
  const verdictIds = ids("verdicts");
  ids("scenarios");

  // Areas and questions
  data.areas.forEach((area, i) => {
    if (!isText(area.name) || !isText(area.question)) err(at("areas", i, area), "needs name and question");
    if (!data.questions.some((q) => q && q.area === area.id)) err(at("areas", i, area), "has no questions");
  });

  const optionIds = {}; // question ID -> Set of option IDs
  data.questions.forEach((q, i) => {
    const where = at("questions", i, q);
    if (!q) return;
    if (!areaIds.has(q.area)) err(where, "area \"" + q.area + "\" does not exist");
    if (!isText(q.text)) err(where, "text is missing");
    if (q.help !== undefined && !isText(q.help)) err(where, "help must be text");
    if (!Array.isArray(q.options) || q.options.length === 0) return err(where, "needs a list of options");
    const seen = new Set();
    q.options.forEach((o, j) => {
      const owhere = where + "." + at("options", j, o);
      if (!o || !isText(o.id)) return err(owhere, "id is missing");
      if (o.id === UNKNOWN) err(owhere, "\"" + UNKNOWN + "\" is reserved for \"I don't know\"; use another id");
      if (seen.has(o.id)) err(owhere, "id is used twice in this question");
      seen.add(o.id);
      if (!isText(o.text)) err(owhere, "text is missing");
      if (!LEVELS.includes(o.level)) err(owhere, "level \"" + o.level + "\" is not one of " + LEVELS.join(", "));
      if (o.finding !== undefined && (!isText(o.finding) || !isText(o.fix))) err(owhere, "a finding needs a fix");
    });
    if (isText(q.id)) optionIds[q.id] = seen;
  });

  // Conditions: { questionId: [optionId, …], … }
  const checkCondition = (cond, where) => {
    if (!cond || typeof cond !== "object" || Array.isArray(cond) || Object.keys(cond).length === 0) {
      return err(where, "must be an object like { \"G1\": [\"internal\"] }");
    }
    Object.keys(cond).forEach((qid) => {
      if (!optionIds[qid]) return err(where, "question \"" + qid + "\" does not exist");
      const list = cond[qid];
      if (!Array.isArray(list) || list.length === 0) return err(where + "." + qid, "must be a non-empty list");
      list.forEach((oid) => {
        if (oid === UNKNOWN) err(where + "." + qid, "\"" + UNKNOWN + "\" never counts as a match; remove it");
        else if (!optionIds[qid].has(oid)) err(where + "." + qid, "option \"" + oid + "\" does not exist in " + qid);
      });
    });
  };

  data.rules.forEach((rule, i) => {
    const where = at("rules", i, rule);
    if (!rule) return;
    if (!areaIds.has(rule.area)) err(where, "area \"" + rule.area + "\" does not exist");
    if (!LEVELS.includes(rule.level)) err(where, "level \"" + rule.level + "\" is not one of " + LEVELS.join(", "));
    if (!isText(rule.finding) || !isText(rule.fix)) err(where, "needs finding and fix");
    checkCondition(rule.when, where + ".when");
  });

  data.signoffs.forEach((s, i) => {
    const where = at("signoffs", i, s);
    if (!s) return;
    if (!isText(s.label)) err(where, "label is missing");
    if (!Array.isArray(s.anyOf) || s.anyOf.length === 0) return err(where, "anyOf must be a non-empty list");
    s.anyOf.forEach((cond, j) => checkCondition(cond, where + ".anyOf[" + j + "]"));
  });

  // Verdicts: every combination of red and amber areas must find a verdict
  let verdictsOk = true;
  data.verdicts.forEach((v, i) => {
    const where = at("verdicts", i, v);
    if (!v) return;
    if (!isText(v.title) || !isText(v.text)) err(where, "needs title and text");
    if (!LEVELS.includes(v.level)) err(where, "level \"" + v.level + "\" is not one of " + LEVELS.join(", "));
    ["minRed", "maxRed", "minAmber", "maxAmber"].forEach((key) => {
      if (v[key] !== undefined && !isCount(v[key])) {
        err(where + "." + key, "must be a whole number from 0");
        verdictsOk = false;
      }
    });
  });
  if (verdictsOk) {
    const n = data.areas.length;
    for (let red = 0; red <= n; red++) {
      for (let amber = 0; amber <= n - red; amber++) {
        if (!data.verdicts.some((v) => v && verdictMatches(v, red, amber))) {
          err("verdicts", "no verdict fits " + red + " red and " + amber + " amber areas");
        }
      }
    }
  }

  const r = data.reference;
  if (!r || !isText(r.title) || !isText(r.yours) || !isText(r.label) || !isText(r.none)) {
    err("reference", "needs title, yours, label and none");
  }
  const cmp = data.comparison;
  if (!cmp || !isText(cmp.title) || !isText(cmp.different) || !isText(cmp.same) || !isText(cmp.closing)) {
    err("comparison", "needs title, different, same and closing");
  } else if (cmp.expectDifferent !== undefined) {
    if (!Array.isArray(cmp.expectDifferent)) err("comparison.expectDifferent", "must be a list of area ids");
    else cmp.expectDifferent.forEach((id) => {
      if (!areaIds.has(id)) err("comparison.expectDifferent", "area \"" + id + "\" does not exist");
    });
  }

  // Answer sets in scenarios and tests must answer every question
  const checkAnswers = (answers, where, allowUnknown) => {
    if (!answers || typeof answers !== "object") return err(where, "must be an object of answers");
    Object.keys(optionIds).forEach((qid) => {
      if (!(qid in answers)) err(where, "question " + qid + " is not answered");
    });
    Object.keys(answers).forEach((qid) => {
      const oid = answers[qid];
      if (!optionIds[qid]) err(where, "question \"" + qid + "\" does not exist");
      else if (oid === UNKNOWN && allowUnknown) return;
      else if (!optionIds[qid].has(oid)) err(where + "." + qid, "option \"" + oid + "\" does not exist in " + qid);
    });
  };

  data.scenarios.forEach((s, i) => {
    const where = at("scenarios", i, s);
    if (!s) return;
    if (s.id === OWN) err(where, "\"" + OWN + "\" is reserved for the own use case; use another id");
    if (!isText(s.label) || !isText(s.short) || !isText(s.briefingTitle)) err(where, "needs label, short and briefingTitle");
    if (!Array.isArray(s.briefing) || s.briefing.length === 0 || !s.briefing.every(isText)) {
      err(where, "briefing must be a list of paragraphs");
    }
    checkAnswers(s.reference, where + ".reference", false);
  });

  data.tests.forEach((t, i) => {
    const where = "tests[" + i + "]" + (t && isText(t.name) ? " (" + t.name + ")" : "");
    if (!t) return;
    if (!isText(t.name)) err(where, "name is missing");
    checkAnswers(t.answers, where + ".answers", true);
    const e = t.expect;
    if (!e || typeof e !== "object") return err(where, "expect is missing");
    if (e.areas !== undefined) {
      Object.keys(e.areas).forEach((aid) => {
        if (!areaIds.has(aid)) err(where + ".expect.areas", "area \"" + aid + "\" does not exist");
        if (!LEVELS.includes(e.areas[aid])) err(where + ".expect.areas." + aid, "level \"" + e.areas[aid] + "\" is not valid");
      });
    }
    if (e.verdict !== undefined && !verdictIds.has(e.verdict)) err(where + ".expect.verdict", "verdict \"" + e.verdict + "\" does not exist");
    const checkIds = (key, known) => {
      if (e[key] === undefined) return;
      if (!Array.isArray(e[key])) return err(where + ".expect." + key, "must be a list");
      e[key].forEach((id) => {
        if (!known.has(id)) err(where + ".expect." + key, "\"" + id + "\" does not exist");
      });
    };
    checkIds("signoffs", signoffIds);
    checkIds("rules", ruleIds);
    if (e.unknownCount !== undefined && !isCount(e.unknownCount)) err(where + ".expect.unknownCount", "must be a whole number");
    if (e.unknownWarning !== undefined && typeof e.unknownWarning !== "boolean") err(where + ".expect.unknownWarning", "must be true or false");
  });

  return errors;
}

/* ===================================================================
   logic: pure functions, no DOM access
   =================================================================== */

function verdictMatches(verdict, red, amber) {
  return (verdict.minRed === undefined || red >= verdict.minRed) &&
    (verdict.maxRed === undefined || red <= verdict.maxRed) &&
    (verdict.minAmber === undefined || amber >= verdict.minAmber) &&
    (verdict.maxAmber === undefined || amber <= verdict.maxAmber);
}

const RANK = { green: 0, amber: 1, red: 2 };
const KIND_ORDER = { rule: 0, option: 1, unknown: 1 }; // rule findings first within a level

function worse(a, b) {
  return RANK[b] > RANK[a] ? b : a;
}

// AND across questions, OR within each list. "I don't know" never matches.
function conditionMet(cond, answers) {
  return Object.keys(cond).every((qid) =>
    answers[qid] !== UNKNOWN && cond[qid].includes(answers[qid]));
}

function isAnswered(question, answer) {
  return answer === UNKNOWN || question.options.some((o) => o.id === answer);
}

// progress(answers, data) → { answered, total, complete, areas: [{ id, name, answered, total }] }
function progress(answers, data) {
  const areas = data.areas.map((area) => {
    const questions = data.questions.filter((q) => q.area === area.id);
    return {
      id: area.id,
      name: area.name,
      total: questions.length,
      answered: questions.filter((q) => isAnswered(q, answers[q.id])).length
    };
  });
  const answered = areas.reduce((sum, a) => sum + a.answered, 0);
  const total = data.questions.length;
  return { answered, total, complete: answered === total, areas };
}

// evaluate(answers, data) → { areas: { <id>: { level, findings[] } }, verdict,
//   signoffs[], rules[], unknownCount, unknownWarning }
// Unanswered questions and answers that no longer exist in the data are skipped.
function evaluate(answers, data) {
  const areas = {};
  data.areas.forEach((area) => {
    areas[area.id] = { level: "green", findings: [] };
  });

  let unknownCount = 0;
  data.questions.forEach((q) => {
    const answer = answers[q.id];
    const area = areas[q.area];
    if (answer === UNKNOWN) {
      unknownCount++;
      area.level = worse(area.level, data.unknown.level);
      area.findings.push({
        level: data.unknown.level,
        text: data.unknown.finding.replace("{question}", q.text),
        fix: data.unknown.fix,
        source: q.id,
        kind: "unknown"
      });
      return;
    }
    const option = q.options.find((o) => o.id === answer);
    if (!option) return;
    area.level = worse(area.level, option.level);
    if (option.finding) {
      area.findings.push({ level: option.level, text: option.finding, fix: option.fix, source: q.id, kind: "option" });
    }
  });

  // Rules can only raise an area's level, never lower it.
  const rules = [];
  data.rules.forEach((rule) => {
    if (!conditionMet(rule.when, answers)) return;
    rules.push(rule.id);
    const area = areas[rule.area];
    area.level = worse(area.level, rule.level);
    area.findings.push({ level: rule.level, text: rule.finding, fix: rule.fix, source: rule.id, kind: "rule" });
  });

  let red = 0;
  let amber = 0;
  Object.keys(areas).forEach((id) => {
    const area = areas[id];
    // Array.prototype.sort is stable, so question order is kept within a group.
    area.findings.sort((x, y) =>
      (RANK[y.level] - RANK[x.level]) || (KIND_ORDER[x.kind] - KIND_ORDER[y.kind]));
    if (area.level === "red") red++;
    if (area.level === "amber") amber++;
  });

  const verdict = data.verdicts.find((v) => verdictMatches(v, red, amber)) || null;
  const signoffs = data.signoffs
    .filter((s) => s.anyOf.some((cond) => conditionMet(cond, answers)))
    .map((s) => ({ id: s.id, label: s.label }));

  return {
    areas,
    verdict,
    signoffs,
    rules,
    unknownCount,
    unknownWarning: unknownCount >= data.unknownWarning.min
  };
}

// Evaluates the reference answers of all variants side by side.
// → { columns: [{ id, short, label, result }], different: [areaId], same: [areaId], sentence }
function compareScenarios(data) {
  const columns = data.scenarios.map((s) =>
    ({ id: s.id, short: s.short, label: s.label, result: evaluate(s.reference, data) }));
  const different = [];
  const same = [];
  data.areas.forEach((area) => {
    const levels = columns.map((c) => c.result.areas[area.id].level);
    (levels.every((l) => l === levels[0]) ? same : different).push(area.id);
  });
  const names = (ids) => ids.map((id) => data.areas.find((a) => a.id === id).name).join(", ") + ".";
  const parts = [];
  if (different.length) parts.push(data.comparison.different + " " + names(different));
  if (same.length) parts.push(data.comparison.same + " " + names(same));
  return { columns, different, same, sentence: parts.join(" ") };
}

function answerText(question, optionId, data) {
  if (optionId === UNKNOWN) return data.unknown.text;
  const option = question.options.find((o) => o.id === optionId);
  return option ? option.text : "";
}

// Questions where the answers differ from a variant's reference answers.
function deviations(answers, reference, data) {
  return data.questions
    .filter((q) => answers[q.id] !== reference[q.id])
    .map((q) => ({
      id: q.id,
      question: q.text,
      answer: answerText(q, answers[q.id], data),
      reference: answerText(q, reference[q.id], data)
    }));
}

// Marks the briefing paragraphs that not every variant shares.
function briefingParagraphs(scenario, data) {
  return scenario.briefing.map((text) => ({
    text,
    own: data.scenarios.some((other) => other !== scenario && !other.briefing.includes(text))
  }));
}

// Plain-text block for the field "Reality" in the Use-Case Canvas; only the top finding per area.
function canvasText(result, data, title, date) {
  const lines = [
    data.title + ": " + title + " (" + date + ")",
    "Result: " + result.verdict.title
  ];
  data.areas.forEach((area) => {
    const a = result.areas[area.id];
    const top = a.findings[0];
    lines.push(area.name + ": " + a.level.toUpperCase() + (top ? " – " + top.text : ""));
  });
  lines.push("Sign-offs: " + (result.signoffs.length
    ? result.signoffs.map((s) => s.label).join(", ")
    : data.noSignoffs));
  return lines.join("\n");
}

// Runs every entry of data.tests through evaluate and compares what is given in expect.
function runSelfTests(data) {
  const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
  const show = (v) => (Array.isArray(v) ? (v.length ? v.join(", ") : "none") : String(v));

  const results = data.tests.map((test) => {
    const result = evaluate(test.answers, data);
    const e = test.expect;
    const checks = [];
    const check = (label, expected, actual, pass) =>
      checks.push({ label, expected: show(expected), actual: show(actual), pass });

    if (e.areas) {
      Object.keys(e.areas).forEach((id) => {
        check("area " + id, e.areas[id], result.areas[id].level, e.areas[id] === result.areas[id].level);
      });
    }
    if (e.verdict !== undefined) {
      const actual = result.verdict ? result.verdict.id : "none";
      check("verdict", e.verdict, actual, e.verdict === actual);
    }
    if (e.signoffs) {
      const actual = result.signoffs.map((s) => s.id);
      check("sign-offs", e.signoffs, actual, sameSet(e.signoffs, actual));
    }
    if (e.rules) check("rules", e.rules, result.rules, sameSet(e.rules, result.rules));
    if (e.unknownCount !== undefined) {
      check("unknown answers", e.unknownCount, result.unknownCount, e.unknownCount === result.unknownCount);
    }
    if (e.unknownWarning !== undefined) {
      check("open-questions warning", e.unknownWarning, result.unknownWarning, e.unknownWarning === result.unknownWarning);
    }
    return { name: test.name, pass: checks.every((c) => c.pass), checks };
  });

  if (data.comparison.expectDifferent && data.scenarios.length >= 2) {
    const cmp = compareScenarios(data);
    const e = data.comparison.expectDifferent;
    const pass = sameSet(e, cmp.different);
    results.push({
      name: data.comparison.title + " (reference answers)",
      pass,
      checks: [{ label: "areas that differ", expected: show(e), actual: show(cmp.different), pass }]
    });
  }
  return results;
}

/* ===================================================================
   storage: localStorage with in-memory fallback
   =================================================================== */

const STORAGE_KEY = "governance-check:v1";
let memoryState = null; // used when localStorage is not available

// State: { cases: { <mode>: { title, answers: { <questionId>: <optionId> } } } }
function emptyState() {
  return { cases: {} };
}

function cleanState(raw) {
  const state = emptyState();
  if (!raw || typeof raw !== "object" || !raw.cases || typeof raw.cases !== "object") return state;
  Object.keys(raw.cases).forEach((mode) => {
    const c = raw.cases[mode];
    if (!c || typeof c !== "object") return;
    const answers = {};
    if (c.answers && typeof c.answers === "object") {
      Object.keys(c.answers).forEach((qid) => {
        if (typeof c.answers[qid] === "string") answers[qid] = c.answers[qid];
      });
    }
    state.cases[mode] = { title: typeof c.title === "string" ? c.title : "", answers };
  });
  return state;
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return cleanState(JSON.parse(raw));
  } catch (e) {
    // Blocked storage or broken JSON: fall back to memory
  }
  return memoryState || emptyState();
}

function saveState(state) {
  memoryState = state;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Keep working with the in-memory copy
  }
}

function getCase(state, mode) {
  if (!state.cases[mode]) state.cases[mode] = { title: "", answers: {} };
  return state.cases[mode];
}

/* ===================================================================
   render: builds DOM from prepared results, computes nothing itself
   =================================================================== */

// Interface wording that is not content (content lives in questions.js)
const UI = {
  answered: (n, total) => n + " of " + total + " answered",
  areaAnswered: (name, n, total) => name + ": " + n + " of " + total + " answered",
  showResult: "Show result",
  back: "← Back to start",
  editAnswers: "Edit answers",
  startOver: "Start over",
  confirmStartOver: "Delete all answers in this browser and start over?",
  backShort: "← Back",
  print: "Print / PDF",
  copyForCanvas: "Copy for canvas",
  copied: "Copied. Paste it into the field \"Reality\" of the Use-Case Canvas.",
  copyManual: "The browser blocked the clipboard. The text is selected: copy it with Ctrl+C (⌘C on a Mac).",
  different: "(different)",
  signoffCount: (n) => n + (n === 1 ? " sign-off" : " sign-offs")
};

// el("p", { class: "x" }, "text", childNode, …)
function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  Object.keys(attrs || {}).forEach((key) => {
    const value = attrs[key];
    if (value === null || value === undefined || value === false) return;
    if (key === "class") node.className = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? "" : value);
  });
  children.flat().forEach((child) => {
    if (child === null || child === undefined || child === false) return;
    node.append(child instanceof Node ? child : String(child));
  });
  return node;
}

// Decorative mark: the three level shapes (circle, triangle, square)
function logoMark() {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 60 20");
  svg.setAttribute("class", "logo-mark");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML =
    '<circle cx="9" cy="10" r="7" class="shape-green"/>' +
    '<path d="M30 3 L38 17 L22 17 Z" class="shape-amber"/>' +
    '<rect x="44" y="3" width="14" height="14" rx="1.5" class="shape-red"/>';
  return svg;
}

// Level marker: shape, colour and (next to it) a word – never colour alone
function levelIcon(level) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("class", "level-icon icon-" + level);
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = {
    green: '<circle cx="10" cy="10" r="8.5"/>',
    amber: '<path d="M10 1.5 L19 18 L1 18 Z"/>',
    red: '<rect x="1.5" y="1.5" width="17" height="17" rx="2"/>'
  }[level];
  return svg;
}

function levelBadge(data, level) {
  return el("span", { class: "level level-" + level }, levelIcon(level), data.levels[level].label);
}

function renderHeader(data) {
  document.title = data.title;
  const title = document.getElementById("app-title");
  title.replaceChildren(el("a", { href: "#", class: "title-link" }, logoMark(), data.title));
  document.getElementById("app-subtitle").textContent = data.subtitle;
  const link = document.getElementById("home-link");
  if (data.homeLink && data.homeLink.url && data.homeLink.label) {
    link.href = data.homeLink.url;
    link.textContent = data.homeLink.label;
    link.hidden = false;
  }
}

function renderDataErrors(root, errors) {
  root.replaceChildren(el("section", { class: "panel error-panel", role: "alert" },
    el("h2", null, "questions.js has " + errors.length + (errors.length === 1 ? " error" : " errors")),
    el("p", null, "Fix the places listed below and reload the page."),
    el("ul", null, errors.map((e) => el("li", null, e)))
  ));
}

function renderSelfTest(root, results) {
  const passed = results.filter((r) => r.pass).length;
  const allPass = passed === results.length;
  root.replaceChildren(el("section", { class: "panel" },
    el("h2", null, "Self-test"),
    el("p", { class: "selftest-summary " + (allPass ? "is-pass" : "is-fail") },
      passed + " of " + results.length + " tests passed"),
    results.map((r) => el("div", { class: "test" },
      el("h3", { class: "test-name" },
        el("span", { class: "badge " + (r.pass ? "is-pass" : "is-fail") }, r.pass ? "pass" : "fail"),
        r.name),
      el("table", { class: "checks" },
        el("thead", null, el("tr", null,
          el("th", { scope: "col" }, "Check"),
          el("th", { scope: "col" }, "Expected"),
          el("th", { scope: "col" }, "Actual"),
          el("th", { scope: "col" }, "Result"))),
        el("tbody", null, r.checks.map((c) => el("tr", { class: c.pass ? "" : "is-fail" },
          el("td", null, c.label),
          el("td", null, c.expected),
          el("td", null, c.actual),
          el("td", null, c.pass ? "pass" : "fail"))))
      )
    ))
  ));
}

// Splits "Name – Variant A: tools" into a title and a subline for the entry cards.
function splitLabel(label) {
  const i = label.indexOf(": ");
  return i === -1 ? { title: label, sub: "" } : { title: label.slice(0, i), sub: label.slice(i + 2) };
}

// entries: [{ mode, label, progress }]
function renderStart(root, data, entries, showCompare) {
  root.replaceChildren(el("div", { class: "view view-start" },
    el("section", { class: "hero" },
      el("h2", { class: "hero-title", tabindex: "-1" }, data.intro)
    ),
    el("ul", { class: "entries" }, entries.map((entry) => {
      const parts = splitLabel(entry.label);
      const p = entry.progress;
      return el("li", null,
        el("a", { class: "entry" + (entry.mode === OWN ? " entry-own" : ""), href: "#questions/" + entry.mode },
          el("span", { class: "entry-title" }, parts.title),
          parts.sub ? el("span", { class: "entry-sub" }, parts.sub) : null,
          el("span", { class: "entry-foot" },
            el("span", { class: "entry-progress" }, p.answered > 0 ? UI.answered(p.answered, p.total) : ""),
            el("span", { class: "entry-arrow", "aria-hidden": "true" }, "→"))
        ));
    })),
    showCompare
      ? el("p", { class: "start-compare" }, el("a", { href: "#compare" }, data.comparison.title + " →"))
      : null,
    el("div", { class: "start-notes" },
      el("p", null, data.privacyNote),
      el("p", null, data.disclaimer))
  ));
}

// Builds the questions view; returns handles that updateProgress() refreshes in place.
function renderQuestions(root, data, view, handlers) {
  const answers = view.answers;

  const segments = view.progress.areas.map((a, i) => el("button", {
    type: "button",
    class: "segment",
    onclick: () => handlers.onJump(a.id)
  },
    el("span", { class: "segment-name" }, el("span", { class: "segment-index" }, i + 1), a.name),
    el("span", { class: "segment-pips" },
      Array.from({ length: a.total }, () => el("span", { class: "pip" })))
  ));
  const count = el("span", { class: "progress-count", "aria-live": "polite" });
  const topButton = el("button", { type: "button", class: "btn btn-primary", onclick: handlers.onShowResult }, UI.showResult);
  const bottomButton = el("button", { type: "button", class: "btn btn-primary btn-large", onclick: handlers.onShowResult }, UI.showResult);
  const bottomCount = el("span", { class: "progress-count" });

  const titleField = view.mode === OWN ? el("div", { class: "panel title-panel" },
    el("label", { for: "case-title" }, data.ownCase.titleLabel),
    el("input", {
      id: "case-title", type: "text", maxlength: "120", autocomplete: "off",
      value: view.title,
      oninput: (e) => handlers.onTitle(e.target.value)
    })
  ) : null;

  const sections = data.areas.map((area, i) => el("section", {
    class: "area", id: "area-" + area.id, "aria-labelledby": "area-title-" + area.id
  },
    el("header", { class: "area-head" },
      el("span", { class: "area-index", "aria-hidden": "true" }, i + 1),
      el("div", null,
        el("h3", { id: "area-title-" + area.id, tabindex: "-1" }, area.name),
        el("p", { class: "area-question" }, area.question))
    ),
    data.questions.filter((q) => q.area === area.id).map((q) => {
      const name = "q-" + q.id;
      const option = (id, text, extraClass) => el("label", { class: "option" + (extraClass || "") },
        el("input", {
          type: "radio", name, value: id,
          checked: answers[q.id] === id,
          onchange: () => handlers.onAnswer(q.id, id)
        }),
        el("span", { class: "option-text" }, text)
      );
      return el("fieldset", { class: "question", "aria-describedby": q.help ? "help-" + q.id : null },
        el("legend", null, el("span", { class: "qid" }, q.id), el("span", { class: "qtext" }, q.text)),
        q.help ? el("p", { class: "help", id: "help-" + q.id }, q.help) : null,
        el("div", { class: "options" },
          q.options.map((o) => option(o.id, o.text)),
          option(UNKNOWN, data.unknown.text, " option-unknown"))
      );
    })
  ));

  const main = el("div", { class: "questions-main" },
    titleField,
    el("div", { class: "progress-bar" },
      count,
      el("div", { class: "segments" }, segments),
      topButton),
    sections,
    el("div", { class: "form-end" }, bottomCount, bottomButton),
    el("p", { class: "notice" }, data.disclaimer)
  );

  // Variants: briefing above the questions, or as a fixed column on wide screens
  const b = view.briefing;
  const briefing = b ? el("aside", { class: "briefing", "aria-labelledby": "briefing-title" },
    el("h3", { id: "briefing-title" }, b.title),
    b.paragraphs.map((p) => el("p", { class: p.own ? "briefing-own" : null },
      p.own ? el("span", { class: "briefing-tag" }, b.short) : null,
      p.text))
  ) : null;

  root.replaceChildren(el("div", { class: "view view-questions" + (briefing ? " has-briefing" : "") },
    el("a", { class: "back-link", href: "#" }, UI.back),
    el("h2", { class: "case-title", tabindex: "-1" }, view.label),
    briefing ? el("div", { class: "questions-grid" }, briefing, main) : main
  ));

  return { count, bottomCount, segments, buttons: [topButton, bottomButton] };
}

function updateProgress(handles, p) {
  const text = UI.answered(p.answered, p.total);
  handles.count.textContent = text;
  handles.bottomCount.textContent = text;
  p.areas.forEach((a, i) => {
    const seg = handles.segments[i];
    seg.classList.toggle("is-done", a.answered === a.total);
    seg.setAttribute("aria-label", UI.areaAnswered(a.name, a.answered, a.total));
    Array.from(seg.querySelectorAll(".pip")).forEach((pip, j) => pip.classList.toggle("is-on", j < a.answered));
  });
  handles.buttons.forEach((b) => { b.disabled = !p.complete; });
}

// view: { mode, name, deviations (variants only), compare, canvas }; result: output of evaluate()
// Returns handles for the copy box.
function renderResult(root, data, view, result, handlers) {
  const verdict = result.verdict;
  const n = result.signoffs.length;
  const copyBox = el("div", { class: "copy-box", hidden: true });

  const cards = data.areas.map((area) => {
    const a = result.areas[area.id];
    return el("section", { class: "area-card card-" + a.level, "aria-labelledby": "card-" + area.id },
      el("header", { class: "area-card-head" },
        el("h3", { id: "card-" + area.id }, area.name),
        levelBadge(data, a.level)),
      el("p", { class: "area-question" }, area.question),
      a.findings.length
        ? el("ul", { class: "findings" }, a.findings.map((f) => el("li", { class: "finding" },
          levelIcon(f.level),
          el("span", { class: "sr-only" }, data.levels[f.level].label + ": "),
          el("div", null,
            el("p", { class: "finding-text" }, f.text),
            el("p", { class: "finding-fix" }, "→ " + f.fix)))))
        : el("p", { class: "area-clear" }, data.areaClear)
    );
  });

  root.replaceChildren(el("div", { class: "view view-result" },
    el("p", { class: "result-case" }, view.name),
    result.unknownWarning
      ? el("p", { class: "unknown-warning" }, levelIcon("amber"), data.unknownWarning.text)
      : null,
    el("section", { class: "verdict verdict-" + verdict.level, "aria-labelledby": "verdict-title" },
      el("div", { class: "verdict-icon" }, levelIcon(verdict.level)),
      el("div", null,
        el("h2", { id: "verdict-title", tabindex: "-1" }, verdict.title),
        el("p", null, verdict.text))),
    el("div", { class: "area-cards" }, cards),
    el("section", { class: "panel signoffs", "aria-labelledby": "signoffs-title" },
      el("h3", { id: "signoffs-title" }, data.signoffsTitle,
        n ? el("span", { class: "count-badge" }, UI.signoffCount(n)) : null),
      n
        ? el("ul", { class: "signoff-list" }, result.signoffs.map((s) => el("li", null, s.label)))
        : el("p", null, data.noSignoffs)),
    view.deviations ? renderDeviations(data, view.deviations) : null,
    el("div", { class: "result-actions" },
      el("a", { class: "btn btn-primary", href: "#questions/" + view.mode }, UI.editAnswers),
      view.compare ? el("a", { class: "btn", href: "#compare" }, data.comparison.title) : null,
      view.canvas ? el("button", { type: "button", class: "btn", onclick: handlers.onCopy }, UI.copyForCanvas) : null,
      el("button", { type: "button", class: "btn", onclick: handlers.onPrint }, UI.print),
      el("button", { type: "button", class: "btn btn-quiet", onclick: handlers.onStartOver }, UI.startOver)),
    copyBox,
    el("p", { class: "notice" }, data.disclaimer)
  ));
  return { copyBox };
}

function renderDeviations(data, list) {
  if (!list.length) {
    return el("section", { class: "panel deviations" }, el("p", { class: "deviations-none" }, data.reference.none));
  }
  return el("details", { class: "panel deviations" },
    el("summary", null, data.reference.title, el("span", { class: "count-badge" }, list.length)),
    el("ul", { class: "deviation-list" }, list.map((d) => el("li", null,
      el("p", { class: "deviation-question" }, el("span", { class: "qid" }, d.id), d.question),
      el("p", null, el("span", { class: "deviation-label" }, data.reference.yours), " ", d.answer),
      el("p", { class: "deviation-reference" }, el("span", { class: "deviation-label" }, data.reference.label), " ", d.reference)
    )))
  );
}

// Shows the canvas text in a selected text field; returns the status line and the field.
function showCopyBox(box, text) {
  const status = el("p", { class: "copy-status", role: "status" });
  const field = el("textarea", {
    class: "copy-text", readonly: true, rows: String(text.split("\n").length + 1), "aria-label": UI.copyForCanvas
  });
  field.value = text;
  box.replaceChildren(status, field);
  box.hidden = false;
  field.select();
  return { status, field };
}

// cmp: output of compareScenarios()
function renderCompare(root, data, cmp, backHref) {
  root.replaceChildren(el("div", { class: "view view-compare" },
    el("a", { class: "back-link", href: backHref }, UI.backShort),
    el("h2", { class: "compare-title", tabindex: "-1" }, data.comparison.title),
    el("div", { class: "compare-grid", style: "--cols: " + cmp.columns.length },
      cmp.columns.map((col) => {
        const parts = splitLabel(col.label);
        const verdict = col.result.verdict;
        return el("section", { class: "compare-col", "aria-labelledby": "col-" + col.id },
          el("h3", { id: "col-" + col.id }, col.short),
          el("p", { class: "compare-tools" }, parts.sub || parts.title),
          el("div", { class: "compare-verdict verdict-" + verdict.level }, levelIcon(verdict.level), el("span", null, verdict.title)),
          el("ul", { class: "compare-areas" }, data.areas.map((area) => {
            const different = cmp.different.includes(area.id);
            return el("li", { class: "compare-row" + (different ? " is-different" : "") },
              el("span", { class: "compare-area" }, area.name,
                different ? el("span", { class: "sr-only" }, " " + UI.different) : null),
              levelBadge(data, col.result.areas[area.id].level));
          })),
          el("p", { class: "compare-signoffs" }, UI.signoffCount(col.result.signoffs.length)));
      })),
    el("p", { class: "compare-sentence" }, cmp.sentence),
    el("p", { class: "compare-closing" }, data.comparison.closing)
  ));
}

/* ===================================================================
   ui: start-up, routing and event handling
   =================================================================== */

const app = { data: null, root: null, state: null, handles: null, mode: null, lastHash: "" };

function modes(data) {
  return [{ mode: OWN, label: data.ownCase.label }]
    .concat(data.scenarios.map((s) => ({ mode: s.id, label: s.label })))
    // Spec order: variants first, own use case last
    .sort((a, b) => (a.mode === OWN) - (b.mode === OWN));
}

// "#questions/A" → { view: "questions", mode: "A" }; anything unknown → start
function parseRoute(hash, data) {
  const parts = hash.replace(/^#/, "").split("/");
  const known = modes(data).map((m) => m.mode);
  if ((parts[0] === "questions" || parts[0] === "result") && known.includes(parts[1])) {
    return { view: parts[0], mode: parts[1] };
  }
  if (parts[0] === "compare" && data.scenarios.length >= 2) return { view: "compare" };
  return { view: "start" };
}

function focusHeading() {
  const heading = app.root.querySelector("h2[tabindex]");
  if (heading) heading.focus({ preventScroll: true });
}

function route() {
  const { data, root } = app;
  const r = parseRoute(location.hash, data);
  const previous = app.lastHash;
  app.lastHash = location.hash;
  app.handles = null;
  app.mode = r.mode || null;

  if (r.view === "compare") {
    const back = previous && !previous.startsWith("#compare") ? previous : "#";
    renderCompare(root, data, compareScenarios(data), back);
  } else if (r.view === "start") {
    const entries = modes(data).map((m) => ({
      mode: m.mode,
      label: m.label,
      progress: progress(getCase(app.state, m.mode).answers, data)
    }));
    renderStart(root, data, entries, data.scenarios.length >= 2);
  } else {
    const c = getCase(app.state, r.mode);
    const label = modes(data).find((m) => m.mode === r.mode).label;
    const p = progress(c.answers, data);
    const scenario = data.scenarios.find((s) => s.id === r.mode);
    const view = {
      mode: r.mode, label, title: c.title, answers: c.answers, progress: p,
      briefing: scenario
        ? { title: scenario.briefingTitle, short: scenario.short, paragraphs: briefingParagraphs(scenario, data) }
        : null
    };
    if (r.view === "result" && p.complete) {
      const name = r.mode === OWN && c.title.trim() ? c.title.trim() : label;
      app.handles = renderResult(root, data, {
        mode: r.mode,
        name,
        deviations: scenario ? deviations(c.answers, scenario.reference, data) : null,
        compare: !!scenario && data.scenarios.length >= 2,
        canvas: r.mode === OWN
      }, evaluate(c.answers, data), {
        onStartOver: startOver,
        onCopy: copyForCanvas,
        onPrint: () => window.print()
      });
    } else {
      if (r.view === "result") history.replaceState(null, "", "#questions/" + r.mode);
      app.handles = renderQuestions(root, data, view, {
        onAnswer: answerChanged,
        onTitle: titleChanged,
        onJump: jumpToArea,
        onShowResult: () => { location.hash = "#result/" + app.mode; }
      });
      updateProgress(app.handles, p);
    }
  }
  window.scrollTo(0, 0);
  focusHeading();
}

function answerChanged(questionId, optionId) {
  const c = getCase(app.state, app.mode);
  c.answers[questionId] = optionId;
  saveState(app.state);
  updateProgress(app.handles, progress(c.answers, app.data));
}

function titleChanged(title) {
  getCase(app.state, app.mode).title = title;
  saveState(app.state);
}

function startOver() {
  if (!window.confirm(UI.confirmStartOver)) return;
  app.state = emptyState();
  saveState(app.state);
  if (location.hash && location.hash !== "#") location.hash = "";
  else route();
}

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

function selectAndCopy(field) {
  try {
    field.focus();
    field.select();
    return document.execCommand("copy");
  } catch (e) {
    return false;
  }
}

// Clipboard API first; under file:// it may be missing or refused, then fall back to the selected field.
function copyForCanvas() {
  const c = getCase(app.state, OWN);
  const text = canvasText(evaluate(c.answers, app.data), app.data, c.title.trim() || app.data.ownCase.label, today());
  const { status, field } = showCopyBox(app.handles.copyBox, text);
  const done = (copied) => {
    status.textContent = copied ? UI.copied : UI.copyManual;
    if (!copied) {
      field.focus();
      field.select();
    }
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => done(true), () => done(selectAndCopy(field)));
  } else {
    done(selectAndCopy(field));
  }
}

function jumpToArea(areaId) {
  const section = document.getElementById("area-" + areaId);
  if (!section) return;
  section.scrollIntoView({ behavior: "auto", block: "start" });
  const heading = section.querySelector("h3");
  if (heading) heading.focus({ preventScroll: true });
}

function boot() {
  const root = document.getElementById("app");
  try {
    const data = window.GOVERNANCE_DATA;
    const errors = validateData(data);
    if (errors.length) return renderDataErrors(root, errors);
    renderHeader(data);
    if (new URLSearchParams(location.search).has("selftest")) {
      return renderSelfTest(root, runSelfTests(data));
    }
    Object.assign(app, { data, root, state: loadState() });
    window.addEventListener("hashchange", route);
    route();
  } catch (e) {
    // Never leave an empty page
    renderDataErrors(root, ["Unexpected error: " + (e && e.message ? e.message : e)]);
    throw e;
  }
}

if (typeof document !== "undefined") boot();
