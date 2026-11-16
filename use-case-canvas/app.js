/* Use-Case Canvas – plain JavaScript, no dependencies, no build step. */
(function () {
  'use strict';

  // Canvas sections in display order. Labels and questions are reused for exports.
  const SECTIONS = [
    {
      key: 'startingPoint', label: 'Starting point', type: 'text',
      question: 'What is the situation today? Who is affected, and what does it cost (time, errors, money)?'
    },
    {
      key: 'solutionOptions', label: 'Solution options', type: 'text',
      question: 'Which approaches could work? What would you discuss with your team before deciding?'
    },
    {
      key: 'data', label: 'Data', type: 'text',
      question: 'What input does the solution need, where does it come from, and in what quality?'
    },
    {
      key: 'tool', label: 'Tool', type: 'text',
      question: 'Which tool fits your environment (e.g. n8n + Gemini, Power Automate + Copilot), and what are its limits?'
    },
    {
      key: 'risks', label: 'Risks', type: 'risks',
      question: 'What could go wrong? Likelihood, impact, mitigation.'
    },
    {
      key: 'reality', label: 'Reality', type: 'text',
      question: 'How would this run in practice: who owns it, how is it introduced, what do approval and governance require?'
    },
    {
      key: 'benefit', label: 'Benefit', type: 'text',
      question: 'What is better afterwards, and how would you measure it?'
    }
  ];

  const TEXT_KEYS = SECTIONS.filter(function (s) { return s.type === 'text'; })
    .map(function (s) { return s.key; });

  // One canvas per browser. The version suffix allows a future schema change (e.g. several canvases).
  const STORAGE_KEY = 'use-case-canvas:v1';
  const SAVE_DELAY_MS = 400;
  const BACKUP_APP_ID = 'use-case-canvas';
  const BACKUP_VERSION = 1;

  const LEVELS = ['low', 'medium', 'high'];
  const RATING_LABELS = { low: 'Low risk', medium: 'Medium risk', high: 'High risk' };

  // ---------- State ----------

  function today() {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function emptyState() {
    const fields = {};
    TEXT_KEYS.forEach(function (k) { fields[k] = ''; });
    return { title: '', name: '', date: today(), fields: fields, kpi: '', risks: [] };
  }

  let idCounter = 0;

  function newRisk() {
    idCounter += 1;
    return {
      id: 'r' + Date.now().toString(36) + idCounter,
      description: '', likelihood: 'medium', impact: 'medium', mitigation: ''
    };
  }

  // Score = likelihood x impact on a 1-3 scale; 6+ is high, 3-4 medium, 1-2 low.
  function rating(risk) {
    const score = (LEVELS.indexOf(risk.likelihood) + 1) * (LEVELS.indexOf(risk.impact) + 1);
    if (score >= 6) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  }

  function findRisk(id) {
    return state.risks.find(function (r) { return r.id === id; });
  }

  function str(value) {
    return typeof value === 'string' ? value : '';
  }

  function level(value) {
    return LEVELS.indexOf(value) >= 0 ? value : 'medium';
  }

  // Turns untrusted data (storage, backup files) into a clean state object.
  function normalize(raw) {
    if (!raw || typeof raw !== 'object') throw new Error('Invalid canvas data.');
    const s = emptyState();
    ['title', 'name', 'kpi'].forEach(function (k) { s[k] = str(raw[k]); });
    if (typeof raw.date === 'string') s.date = raw.date;
    const fields = raw.fields && typeof raw.fields === 'object' ? raw.fields : {};
    TEXT_KEYS.forEach(function (k) { s.fields[k] = str(fields[k]); });
    if (Array.isArray(raw.risks)) {
      s.risks = raw.risks.filter(function (r) { return r && typeof r === 'object'; }).map(function (r) {
        const risk = newRisk();
        risk.description = str(r.description);
        risk.likelihood = level(r.likelihood);
        risk.impact = level(r.impact);
        risk.mitigation = str(r.mitigation);
        return risk;
      });
    }
    return s;
  }

  let state = emptyState();

  // ---------- DOM helpers ----------

  function el(tag, attrs) {
    const node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      const v = attrs[k];
      if (v === false || v === null || v === undefined) return;
      node.setAttribute(k, v === true ? '' : v);
    });
    for (let i = 2; i < arguments.length; i++) node.append(arguments[i]);
    return node;
  }

  // ---------- Rendering ----------

  function renderSections() {
    const canvas = document.getElementById('canvas');
    SECTIONS.forEach(function (s) {
      const card = el('section', { class: 'card card-' + s.key, 'aria-labelledby': 'heading-' + s.key });

      if (s.type === 'risks') {
        card.append(
          el('h2', { id: 'heading-' + s.key }, s.label),
          el('p', { class: 'question', id: 'risks-question' }, s.question),
          el('p', { class: 'risk-empty', id: 'risk-empty' }, 'No risks yet. Add the first one.'),
          el('div', { class: 'risk-list', id: 'risk-list' }),
          el('button', { type: 'button', class: 'btn', 'data-action': 'add-risk' }, '+ Add risk')
        );
      } else {
        card.append(
          el('h2', { id: 'heading-' + s.key }, el('label', { for: 'field-' + s.key }, s.label)),
          el('textarea', { id: 'field-' + s.key, 'data-field': s.key, placeholder: s.question, rows: 6 })
        );
      }

      if (s.key === 'benefit') {
        card.append(el('div', { class: 'kpi' },
          el('label', { for: 'field-kpi' }, 'Measurable KPI (optional)'),
          el('input', {
            id: 'field-kpi', type: 'text', 'data-meta': 'kpi',
            placeholder: 'e.g. Processing time per invoice drops from 12 to 4 minutes'
          })
        ));
      }

      canvas.append(card);
    });
  }

  function levelSelect(id, prop, value) {
    const select = el('select', { id: id, 'data-risk-prop': prop });
    LEVELS.forEach(function (level) {
      select.append(el('option', { value: level }, level));
    });
    select.value = value;
    return select;
  }

  function riskCell(cls, id, labelText, control) {
    return el('div', { class: 'risk-cell ' + cls }, el('label', { for: id }, labelText), control);
  }

  function riskRow(risk, index) {
    const n = index + 1;
    const base = 'risk-' + risk.id;
    const r = rating(risk);

    const description = el('textarea', { id: base + '-description', 'data-risk-prop': 'description', rows: 2,
      placeholder: 'e.g. The model misreads amounts on scanned invoices' });
    description.value = risk.description;
    const mitigation = el('textarea', { id: base + '-mitigation', 'data-risk-prop': 'mitigation', rows: 2,
      placeholder: 'e.g. Human review for amounts above 5,000 EUR' });
    mitigation.value = risk.mitigation;

    return el('div', { class: 'risk', 'data-id': risk.id, 'data-rating': r, role: 'group', 'aria-label': 'Risk ' + n },
      el('div', { class: 'risk-head' },
        el('span', { class: 'risk-number' }, 'Risk ' + n),
        el('span', { class: 'risk-badge' }, RATING_LABELS[r]),
        el('button', { type: 'button', class: 'btn btn-small btn-ghost', 'data-action': 'remove-risk',
          'aria-label': 'Remove risk ' + n }, 'Remove')
      ),
      el('div', { class: 'risk-grid' },
        riskCell('risk-description', base + '-description', 'Description', description),
        riskCell('risk-level', base + '-likelihood', 'Likelihood', levelSelect(base + '-likelihood', 'likelihood', risk.likelihood)),
        riskCell('risk-level', base + '-impact', 'Impact', levelSelect(base + '-impact', 'impact', risk.impact)),
        riskCell('risk-mitigation', base + '-mitigation', 'Mitigation', mitigation)
      )
    );
  }

  function renderRisks() {
    const list = document.getElementById('risk-list');
    list.replaceChildren.apply(list, state.risks.map(riskRow));
    document.getElementById('risk-empty').hidden = state.risks.length > 0;
  }

  function updateRating(row, risk) {
    const r = rating(risk);
    row.dataset.rating = r;
    row.querySelector('.risk-badge').textContent = RATING_LABELS[r];
  }

  function fillForm() {
    document.querySelectorAll('[data-meta]').forEach(function (input) {
      input.value = state[input.dataset.meta] || '';
    });
    document.querySelectorAll('[data-field]').forEach(function (input) {
      input.value = state.fields[input.dataset.field] || '';
    });
    renderRisks();
  }

  // ---------- Export helpers ----------

  function slug(text) {
    const s = String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
    return s || 'untitled';
  }

  function fileBase() {
    return 'use-case-' + slug(state.title);
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type: type + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = el('a', { href: url, download: filename });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function titleOrDefault() {
    return state.title.trim() || 'Untitled use case';
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // ---------- Markdown ----------

  function mdCell(text) {
    return String(text).trim().replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>') || '–';
  }

  // Keep the student's line breaks: Markdown needs two trailing spaces for a hard break.
  function mdText(text) {
    return String(text).trim().replace(/[ \t]*\r?\n/g, '  \n');
  }

  function toMarkdown() {
    const out = ['# ' + titleOrDefault(), ''];
    out.push('**Name:** ' + (state.name.trim() || '–') + '  ');
    out.push('**Date:** ' + (state.date || '–'), '');

    SECTIONS.forEach(function (s) {
      out.push('## ' + s.label, '');
      if (s.type === 'risks') {
        if (state.risks.length === 0) {
          out.push('_No risks listed._', '');
        } else {
          out.push('| # | Risk | Likelihood | Impact | Rating | Mitigation |');
          out.push('|---|---|---|---|---|---|');
          state.risks.forEach(function (r, i) {
            out.push('| ' + [i + 1, mdCell(r.description), capitalize(r.likelihood), capitalize(r.impact),
              capitalize(rating(r)), mdCell(r.mitigation)].join(' | ') + ' |');
          });
          out.push('');
        }
      } else {
        out.push(mdText(state.fields[s.key]) || '_Not filled in yet._', '');
      }
      if (s.key === 'benefit') {
        out.push('**Measurable KPI:** ' + (state.kpi.trim() || '–'), '');
      }
    });

    out.push('---', '', '_Created with Use-Case Canvas_', '');
    return out.join('\n');
  }

  function exportMarkdown() {
    download(fileBase() + '.md', toMarkdown(), 'text/markdown');
    setStatus('Markdown file downloaded');
  }

  // ---------- PDF (via the browser's print dialog) ----------

  function printText(text, emptyText) {
    const value = String(text).trim();
    return value
      ? el('p', { class: 'print-text' }, value)
      : el('p', { class: 'print-text print-empty' }, emptyText);
  }

  function printRisks() {
    if (state.risks.length === 0) return printText('', 'No risks listed.');
    const head = el('tr', {});
    ['#', 'Risk', 'Likelihood', 'Impact', 'Rating', 'Mitigation'].forEach(function (h) {
      head.append(el('th', { scope: 'col' }, h));
    });
    const body = el('tbody', {});
    state.risks.forEach(function (r, i) {
      const rt = rating(r);
      body.append(el('tr', {},
        el('td', {}, String(i + 1)),
        el('td', { class: 'print-text' }, r.description.trim() || '–'),
        el('td', {}, capitalize(r.likelihood)),
        el('td', {}, capitalize(r.impact)),
        el('td', {}, el('span', { class: 'print-badge', 'data-rating': rt }, capitalize(rt))),
        el('td', { class: 'print-text' }, r.mitigation.trim() || '–')
      ));
    });
    return el('table', { class: 'print-risks' }, el('thead', {}, head), body);
  }

  function buildPrintView() {
    const view = document.getElementById('print-view');
    const parts = [
      el('h1', {}, titleOrDefault()),
      el('p', { class: 'print-meta' },
        'Name: ' + (state.name.trim() || '–') + '   ·   Date: ' + (state.date || '–'))
    ];
    SECTIONS.forEach(function (s) {
      const section = el('section', { class: 'print-section' }, el('h2', {}, s.label));
      section.append(s.type === 'risks' ? printRisks() : printText(state.fields[s.key], 'Not filled in yet.'));
      if (s.key === 'benefit') {
        section.append(el('p', { class: 'print-kpi' }, el('strong', {}, 'Measurable KPI: '), state.kpi.trim() || '–'));
      }
      parts.push(section);
    });
    parts.push(el('p', { class: 'print-footer' }, 'Created with Use-Case Canvas'));
    view.replaceChildren.apply(view, parts);
  }

  // The document title becomes the suggested PDF file name in most browsers.
  const originalTitle = document.title;

  function beforePrint() {
    buildPrintView();
    document.title = fileBase();
  }

  function afterPrint() {
    document.title = originalTitle;
  }

  function exportPdf() {
    setStatus('Choose "Save as PDF" in the print dialog');
    window.print();
  }

  // ---------- JSON backup ----------

  function hasContent() {
    return Boolean(state.title.trim() || state.name.trim() || state.kpi.trim() || state.risks.length ||
      TEXT_KEYS.some(function (k) { return state.fields[k].trim(); }));
  }

  function saveBackup() {
    const backup = {
      app: BACKUP_APP_ID,
      version: BACKUP_VERSION,
      savedAt: new Date().toISOString(),
      canvas: {
        title: state.title, name: state.name, date: state.date,
        fields: state.fields, kpi: state.kpi,
        risks: state.risks.map(function (r) {
          return { description: r.description, likelihood: r.likelihood, impact: r.impact, mitigation: r.mitigation };
        })
      }
    };
    download(fileBase() + '.json', JSON.stringify(backup, null, 2), 'application/json');
    setStatus('Backup downloaded');
  }

  function parseBackup(text) {
    let raw;
    try {
      raw = JSON.parse(text);
    } catch (e) {
      throw new Error('This file is not valid JSON.');
    }
    if (!raw || raw.app !== BACKUP_APP_ID || !raw.canvas) {
      throw new Error('This file is not a Use-Case Canvas backup.');
    }
    if (typeof raw.version !== 'number' || raw.version > BACKUP_VERSION) {
      throw new Error('This backup was created with a newer version of the tool.');
    }
    return normalize(raw.canvas);
  }

  function loadBackup() {
    document.getElementById('backup-file').click();
  }

  function onBackupFile(event) {
    const input = event.target;
    const file = input.files && input.files[0];
    input.value = ''; // allow choosing the same file again
    if (!file) return;
    file.text().then(function (text) {
      const next = parseBackup(text);
      if (hasContent() && !window.confirm('Replace the current canvas with the backup "' + file.name + '"?')) return;
      state = next;
      fillForm();
      save();
      setStatus('Backup loaded');
    }).catch(function (err) {
      setStatus('Could not load backup: ' + err.message, true);
    });
  }

  // ---------- Reset ----------

  function resetCanvas() {
    if (hasContent() && !window.confirm('Start a new canvas? All current content will be deleted. ' +
      'Save a backup first if you want to keep it.')) return;
    state = emptyState();
    fillForm();
    save();
    setStatus('New canvas started');
    document.getElementById('field-title').focus();
  }

  // ---------- Events ----------

  function onInput(event) {
    const t = event.target;
    if (t.dataset.meta) {
      state[t.dataset.meta] = t.value;
    } else if (t.dataset.field) {
      state.fields[t.dataset.field] = t.value;
    } else if (t.dataset.riskProp) {
      const row = t.closest('.risk');
      const risk = findRisk(row.dataset.id);
      if (!risk) return;
      risk[t.dataset.riskProp] = t.value;
      if (t.dataset.riskProp === 'likelihood' || t.dataset.riskProp === 'impact') updateRating(row, risk);
    } else {
      return;
    }
    changed();
  }

  function addRisk() {
    const risk = newRisk();
    state.risks.push(risk);
    renderRisks();
    document.getElementById('risk-' + risk.id + '-description').focus();
    changed();
  }

  function removeRisk(button) {
    const id = button.closest('.risk').dataset.id;
    const index = state.risks.findIndex(function (r) { return r.id === id; });
    if (index < 0) return;
    state.risks.splice(index, 1);
    renderRisks();
    // Keep keyboard focus in a sensible place.
    const rows = document.querySelectorAll('.risk');
    const next = rows[Math.min(index, rows.length - 1)];
    (next ? next.querySelector('[data-action="remove-risk"]') : document.querySelector('[data-action="add-risk"]')).focus();
    changed();
  }

  const ACTIONS = {
    'add-risk': addRisk,
    'remove-risk': removeRisk,
    'export-md': exportMarkdown,
    'export-pdf': exportPdf,
    'save-backup': saveBackup,
    'load-backup': loadBackup,
    'reset': resetCanvas
  };

  function onClick(event) {
    const button = event.target.closest('[data-action]');
    if (!button || !ACTIONS[button.dataset.action]) return;
    ACTIONS[button.dataset.action](button);
  }

  // ---------- Persistence ----------

  let saveTimer = null;

  function setStatus(text, isError) {
    const status = document.getElementById('status');
    status.textContent = text;
    status.classList.toggle('is-error', Boolean(isError));
  }

  function save() {
    clearTimeout(saveTimer);
    saveTimer = null;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStatus('Saved in this browser');
    } catch (e) {
      setStatus('Not saved: browser storage is unavailable', true);
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return normalize(JSON.parse(raw));
    } catch (e) {
      // Broken or blocked storage: start with an empty canvas.
    }
    return emptyState();
  }

  function changed() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, SAVE_DELAY_MS);
  }

  function flushSave() {
    if (saveTimer) save();
  }

  // ---------- Start ----------

  state = load();
  renderSections();
  fillForm();
  window.addEventListener('pagehide', flushSave);
  // Also covers Ctrl+P / Cmd+P, not only the PDF button.
  window.addEventListener('beforeprint', beforePrint);
  window.addEventListener('afterprint', afterPrint);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') flushSave();
  });
  document.addEventListener('input', onInput);
  document.addEventListener('click', onClick);
  document.getElementById('backup-file').addEventListener('change', onBackupFile);
})();
