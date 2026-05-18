/* ====================================================================
 * BabyBlend Lab — fictional genetics-inspired simulator
 * Vanilla HTML/CSS/JS + DiceBear (illustrated avatars).
 * ==================================================================== */

import { createAvatar }    from 'https://esm.sh/@dicebear/core@9';
import * as loreleiStyle   from 'https://esm.sh/@dicebear/lorelei@9';
import * as bigSmileStyle  from 'https://esm.sh/@dicebear/big-smile@9';

const DICEBEAR_STYLES = {
  lorelei:  { module: loreleiStyle,  label: 'Lorelei',   supportsFreckles: true  },
  bigSmile: { module: bigSmileStyle, label: 'Big Smile', supportsFreckles: false }
};

/* ---------- Trait ladders & color maps ---------- */

const EYE_LADDER  = ['blue', 'green', 'hazel', 'brown', 'dark brown'];
const HAIR_LADDER = ['blonde', 'light brown', 'brown', 'dark brown', 'black', 'red'];
const TEX_LADDER  = ['straight', 'wavy', 'curly', 'coily'];
const SKIN_LADDER = ['very fair', 'fair', 'medium', 'olive', 'brown', 'dark brown'];
const FACE_LADDER = ['round', 'oval', 'heart', 'square', 'long'];
const FRECK_LADDER = ['none', 'light', 'lots'];
const DIMPLE_LADDER = ['no', 'yes'];

const HAIR_HEX = {
  'blonde':      '#d8b96b',
  'light brown': '#8e6238',
  'brown':       '#5a3825',
  'dark brown':  '#3a2210',
  'black':       '#1a120a',
  'red':         '#a44222'
};
const SKIN_HEX = {
  'very fair':  '#fde7d4',
  'fair':       '#f3d2ad',
  'medium':     '#dbac82',
  'olive':      '#c89972',
  'brown':      '#9a6a44',
  'dark brown': '#5d3a22'
};
const EYE_HEX = {
  'blue':       '#3870b8',
  'green':      '#2e7a52',
  'hazel':      '#a07043',
  'brown':      '#4f2a14',
  'dark brown': '#2a1606'
};

/* ---------- DiceBear trait mappings ---------- */

// Group each style's hair variants into our 4 textures.
const HAIR_BUCKETS = {
  lorelei: {
    straight: ['variant01','variant02','variant03','variant04','variant05','variant06','variant07','variant08','variant09','variant10','variant11','variant12'],
    wavy:     ['variant13','variant14','variant15','variant16','variant17','variant18','variant19','variant20','variant21','variant22','variant23','variant24'],
    curly:    ['variant25','variant26','variant27','variant28','variant29','variant30','variant31','variant32','variant33','variant34','variant35','variant36'],
    coily:    ['variant37','variant38','variant39','variant40','variant41','variant42','variant43','variant44','variant45','variant46','variant47','variant48']
  },
  bigSmile: {
    straight: ['shortHair','straightHair','bowlCutHair','halfShavedHead','shavedHead'],
    wavy:     ['wavyBob','bangs'],
    curly:    ['curlyBob','curlyShortHair'],
    coily:    ['froBun','braids','bunHair','mohawk']
  }
};

// Lorelei has 4 head shapes — our 5 face shapes map approximately.
const LORELEI_HEAD = {
  'round':  'variant01',
  'oval':   'variant02',
  'heart':  'variant03',
  'square': 'variant04',
  'long':   'variant02'
};

// Social slider (1–10) → mouth expression.
const LORELEI_MOUTH = [
  'happy09', 'sad01', 'sad05', 'happy01', 'happy04',
  'happy07', 'happy10', 'happy12', 'happy14', 'happy16', 'happy18'
];
const BIGSMILE_MOUTH = [
  'gapSmile', 'openSad', 'unimpressed', 'awkwardSmile', 'awkwardSmile',
  'gapSmile', 'kawaii', 'openedSmile', 'openedSmile', 'teethSmile', 'teethSmile'
];

// Big Smile has no eyesColor — vary eye expression by eye-color slider instead.
const BIGSMILE_EYES = ['normal','cheery','winking','starstruck','sleepy'];

// Lorelei hair: variants curated by length within each texture bucket
// (measured by max-Y of the hair path's bounding box).
const LORELEI_HAIR_BY_GENDER = {
  female: {
    straight: ['variant05','variant01','variant09'],
    wavy:     ['variant17','variant16','variant18','variant23','variant22'],
    curly:    ['variant30','variant35','variant32','variant29','variant25'],
    coily:    ['variant44','variant48','variant42','variant47','variant37']
  },
  male: {
    straight: ['variant04','variant02','variant12','variant06','variant08'],
    wavy:     ['variant24','variant20','variant21','variant19','variant14'],
    curly:    ['variant27','variant34','variant26','variant33','variant36'],
    coily:    ['variant39','variant43','variant46','variant38','variant41']
  }
};

// Big Smile hair subsets by gender (within each texture bucket).
const BIGSMILE_HAIR_BY_GENDER = {
  female: {
    straight: ['straightHair'],
    wavy:     ['wavyBob'],
    curly:    ['curlyBob'],
    coily:    ['braids','bunHair','froBun']
  },
  male: {
    straight: ['shortHair','bowlCutHair','shavedHead','halfShavedHead'],
    wavy:     ['bangs'],
    curly:    ['curlyShortHair'],
    coily:    ['mohawk']
  }
};

const GENDER_LABEL = { female: 'Female', male: 'Male', surprise: 'Surprise' };

/* ---------- Parent form schema ---------- */

const PARENT_FIELDS = [
  { key: 'name',       label: 'Name',                type: 'text',   defA: 'Alex',  defB: 'Bea' },
  { key: 'height',     label: 'Height (cm)',         type: 'number', min: 140, max: 210, defA: 170, defB: 175 },
  { key: 'eyeColor',   label: 'Eye color',           type: 'select', options: EYE_LADDER,   defA: 'blue',   defB: 'brown' },
  { key: 'hairColor',  label: 'Hair color',          type: 'select', options: HAIR_LADDER,  defA: 'blonde', defB: 'dark brown' },
  { key: 'hairType',   label: 'Hair type',           type: 'select', options: TEX_LADDER,   defA: 'straight', defB: 'curly' },
  { key: 'skinTone',   label: 'Skin tone',           type: 'select', options: SKIN_LADDER,  defA: 'fair',   defB: 'medium' },
  { key: 'faceShape',  label: 'Face shape',          type: 'select', options: FACE_LADDER,  defA: 'oval',   defB: 'round' },
  { key: 'freckles',   label: 'Freckles',            type: 'select', options: FRECK_LADDER, defA: 'none',   defB: 'light' },
  { key: 'dimples',    label: 'Dimples',             type: 'select', options: DIMPLE_LADDER, defA: 'no',    defB: 'yes' },
  { key: 'creativity', label: 'Creativity',          type: 'range',  min: 1, max: 10, defA: 6, defB: 7 },
  { key: 'athletic',   label: 'Athletic',            type: 'range',  min: 1, max: 10, defA: 5, defB: 6 },
  { key: 'calmness',   label: 'Calmness',            type: 'range',  min: 1, max: 10, defA: 7, defB: 5 },
  { key: 'social',     label: 'Social energy',       type: 'range',  min: 1, max: 10, defA: 6, defB: 8 },
  { key: 'curiosity',  label: 'Curiosity',           type: 'range',  min: 1, max: 10, defA: 8, defB: 7 }
];

/* ---------- Slider definitions ---------- */
/* Each baby slider is built dynamically with a min/max/default derived from parents. */

const SLIDER_DEFS = [
  { key: 'height',     label: 'Height potential',  unit: 'cm',     kind: 'continuous', hardMin: 140, hardMax: 210, expand: 5  },
  { key: 'eyeColor',   label: 'Eye color blend',                   kind: 'ladder', ladder: EYE_LADDER  },
  { key: 'hairColor',  label: 'Hair color blend',                  kind: 'ladder', ladder: HAIR_LADDER },
  { key: 'hairType',   label: 'Hair texture blend',                kind: 'ladder', ladder: TEX_LADDER  },
  { key: 'skinTone',   label: 'Skin tone blend',                   kind: 'ladder', ladder: SKIN_LADDER },
  { key: 'faceShape',  label: 'Face shape blend',                  kind: 'ladder', ladder: FACE_LADDER },
  { key: 'freckles',   label: 'Freckles likelihood',  unit: '%',   kind: 'likelihood', parentKey: 'freckles', ladder: FRECK_LADDER },
  { key: 'dimples',    label: 'Dimples likelihood',   unit: '%',   kind: 'likelihood', parentKey: 'dimples',  ladder: DIMPLE_LADDER },
  { key: 'creativity', label: 'Creativity',           unit: '/10', kind: 'continuous', hardMin: 1,   hardMax: 10, expand: 1 },
  { key: 'athletic',   label: 'Athletic tendency',    unit: '/10', kind: 'continuous', hardMin: 1,   hardMax: 10, expand: 1 },
  { key: 'calmness',   label: 'Calmness',             unit: '/10', kind: 'continuous', hardMin: 1,   hardMax: 10, expand: 1 },
  { key: 'social',     label: 'Social energy',        unit: '/10', kind: 'continuous', hardMin: 1,   hardMax: 10, expand: 1 },
  { key: 'curiosity',  label: 'Curiosity',            unit: '/10', kind: 'continuous', hardMin: 1,   hardMax: 10, expand: 1 }
];

/* ---------- Application state ---------- */

const state = {
  parents: { A: {}, B: {} },
  ranges: {},          // per-slider { min, max, def, step, kind, ... }
  baby: {},            // current baby slider values
  codename: '',
  surprise: 0,
  style: 'lorelei',    // 'lorelei' | 'bigSmile'
  gender: 'surprise'   // 'female' | 'male' | 'surprise'
};

/* ---------- Helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const titleCase = s => s.replace(/(^|\s)\S/g, c => c.toUpperCase());

function randInt(lo, hi) { return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
function randFloat(lo, hi) { return Math.random() * (hi - lo) + lo; }

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2*l - 1)) * s;
  const x = c * (1 - Math.abs((h/60) % 2 - 1));
  const m = l - c/2;
  let r, g, b;
  if      (h <  60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return toHex(r) + toHex(g) + toHex(b);
}

/* ====================================================================
 * 1. Build parent forms
 * ==================================================================== */

function buildParentForms() {
  const container = $('#parents');
  ['A', 'B'].forEach(letter => {
    const card = document.createElement('div');
    card.className = 'parent-card';
    card.dataset.parent = letter;
    card.innerHTML = `<h3>Parent ${letter}</h3>`;
    PARENT_FIELDS.forEach(f => {
      const id = `p${letter}_${f.key}`;
      const def = letter === 'A' ? f.defA : f.defB;
      const field = document.createElement('div');
      field.className = 'field' + (f.type === 'range' ? ' field-range-wrap' : '');
      if (f.type === 'text') {
        field.innerHTML = `
          <label for="${id}">${f.label}</label>
          <input id="${id}" name="${f.key}" type="text" value="${def}" maxlength="20" />`;
      } else if (f.type === 'number') {
        field.innerHTML = `
          <label for="${id}">${f.label}</label>
          <input id="${id}" name="${f.key}" type="number" min="${f.min}" max="${f.max}" value="${def}" />`;
      } else if (f.type === 'select') {
        const opts = f.options.map(o => `<option value="${o}" ${o===def?'selected':''}>${titleCase(o)}</option>`).join('');
        field.innerHTML = `
          <label for="${id}">${f.label}</label>
          <select id="${id}" name="${f.key}">${opts}</select>`;
      } else if (f.type === 'range') {
        field.innerHTML = `
          <label for="${id}">${f.label} <span class="hint">(1–10)</span></label>
          <div class="field-range">
            <input id="${id}" name="${f.key}" type="range" min="${f.min}" max="${f.max}" value="${def}" step="1" />
            <span class="val" id="${id}_val">${def}</span>
          </div>`;
      }
      card.appendChild(field);
    });
    container.appendChild(card);
  });

  // Live update of range value displays in the parent form
  $$('.parent-card input[type="range"]').forEach(r => {
    const valEl = $('#' + r.id + '_val');
    r.addEventListener('input', () => { valEl.textContent = r.value; });
  });
}

/* ====================================================================
 * 2. Collect parent data
 * ==================================================================== */

function collectParentData() {
  const out = { A: {}, B: {} };
  ['A', 'B'].forEach(letter => {
    PARENT_FIELDS.forEach(f => {
      const el = $('#p' + letter + '_' + f.key);
      let v = el.value;
      if (f.type === 'number' || f.type === 'range') v = Number(v);
      out[letter][f.key] = v;
    });
  });
  return out;
}

/* ====================================================================
 * 3. Generate slider ranges from parents
 * ==================================================================== */

function generateSliderRanges(parents) {
  const ranges = {};

  SLIDER_DEFS.forEach(def => {
    if (def.kind === 'continuous') {
      const a = parents.A[def.key], b = parents.B[def.key];
      const lo = clamp(Math.min(a, b) - def.expand, def.hardMin, def.hardMax);
      const hi = clamp(Math.max(a, b) + def.expand, def.hardMin, def.hardMax);
      const center = (a + b) / 2;
      ranges[def.key] = {
        kind: 'continuous',
        min: lo, max: hi,
        step: def.hardMax <= 10 ? 1 : 1,
        def: Math.round(center),
        unit: def.unit || ''
      };
    } else if (def.kind === 'ladder') {
      const ladder = def.ladder;
      const ai = ladder.indexOf(parents.A[def.key]);
      const bi = ladder.indexOf(parents.B[def.key]);
      let lo = Math.min(ai, bi);
      let hi = Math.max(ai, bi);
      // If both parents identical, allow ±1 of variation as "uncertainty"
      if (lo === hi) {
        lo = Math.max(0, lo - 1);
        hi = Math.min(ladder.length - 1, hi + 1);
      }
      // Always allow a one-step expansion so blending feels possible
      lo = Math.max(0, lo);
      hi = Math.min(ladder.length - 1, hi);
      const center = Math.round((ai + bi) / 2);
      ranges[def.key] = {
        kind: 'ladder',
        ladder,
        min: lo, max: hi,
        step: 1,
        def: clamp(center, lo, hi)
      };
    } else if (def.kind === 'likelihood') {
      const ladder = def.ladder;
      const ai = ladder.indexOf(parents.A[def.key]);
      const bi = ladder.indexOf(parents.B[def.key]);
      // average index normalized to 0..1
      const norm = ((ai + bi) / 2) / (ladder.length - 1);
      // Range around the average, widening with parental disagreement
      const spread = 25 + Math.abs(ai - bi) * 15;
      const center = Math.round(norm * 100);
      const lo = clamp(center - spread, 0, 100);
      const hi = clamp(center + spread, 0, 100);
      ranges[def.key] = {
        kind: 'likelihood',
        min: lo, max: hi,
        step: 1,
        def: center,
        unit: '%'
      };
    }
  });

  return ranges;
}

/* ====================================================================
 * 4. Compute genetic surprise (depends only on parents)
 * ==================================================================== */

function computeSurprise(parents) {
  const diffs = [];

  // continuous & range traits
  const contKeys = [
    { key: 'height',     span: 50 },
    { key: 'creativity', span: 9 },
    { key: 'athletic',   span: 9 },
    { key: 'calmness',   span: 9 },
    { key: 'social',     span: 9 },
    { key: 'curiosity',  span: 9 }
  ];
  contKeys.forEach(k => {
    const d = Math.abs(parents.A[k.key] - parents.B[k.key]) / k.span;
    diffs.push(clamp(d, 0, 1));
  });

  // ladder traits
  const ladderKeys = [
    { key: 'eyeColor',  ladder: EYE_LADDER  },
    { key: 'hairColor', ladder: HAIR_LADDER },
    { key: 'hairType',  ladder: TEX_LADDER  },
    { key: 'skinTone',  ladder: SKIN_LADDER },
    { key: 'faceShape', ladder: FACE_LADDER },
    { key: 'freckles',  ladder: FRECK_LADDER },
    { key: 'dimples',   ladder: DIMPLE_LADDER }
  ];
  ladderKeys.forEach(k => {
    const ai = k.ladder.indexOf(parents.A[k.key]);
    const bi = k.ladder.indexOf(parents.B[k.key]);
    const d = Math.abs(ai - bi) / (k.ladder.length - 1);
    diffs.push(clamp(d, 0, 1));
  });

  const avg = diffs.reduce((s, v) => s + v, 0) / diffs.length;
  // base 8% so it's never zero — life always has uncertainty
  return Math.round(clamp(avg * 90 + 8, 0, 100));
}

/* ====================================================================
 * 5. Render sliders
 * ==================================================================== */

function renderSliders(ranges) {
  const container = $('#sliders');
  container.innerHTML = '';

  SLIDER_DEFS.forEach(def => {
    const r = ranges[def.key];
    const row = document.createElement('div');
    row.className = 'slider-row';
    row.dataset.key = def.key;

    const headValSpan = `<span class="slider-value" id="val_${def.key}"></span>`;
    let footLabels = '';
    if (r.kind === 'ladder') {
      footLabels = `<div class="slider-foot"><span>${titleCase(r.ladder[r.min])}</span><span>${titleCase(r.ladder[r.max])}</span></div>`;
    } else if (r.kind === 'continuous') {
      footLabels = `<div class="slider-foot"><span>${r.min}${r.unit||''}</span><span>${r.max}${r.unit||''}</span></div>`;
    } else if (r.kind === 'likelihood') {
      footLabels = `<div class="slider-foot"><span>${r.min}%</span><span>${r.max}%</span></div>`;
    }

    row.innerHTML = `
      <div class="slider-head">
        <span class="slider-label">${def.label}</span>
        ${headValSpan}
      </div>
      <input type="range" id="s_${def.key}" min="${r.min}" max="${r.max}" step="${r.step}" value="${r.def}" />
      ${footLabels}
    `;
    container.appendChild(row);

    const input = $('#s_' + def.key, row);
    input.addEventListener('input', () => {
      state.baby[def.key] = Number(input.value);
      updateBabyPreview();
    });

    state.baby[def.key] = r.def;
  });
}

/* ====================================================================
 * 6. Update baby preview (stats, archetype, avatar)
 * ==================================================================== */

function updateBabyPreview() {
  const b = state.baby;

  // resolve display values
  const display = {
    height:    `${Math.round(b.height)} cm`,
    eyeColor:  titleCase(EYE_LADDER[b.eyeColor] || 'unknown'),
    hairColor: titleCase(HAIR_LADDER[b.hairColor] || 'unknown'),
    hairType:  titleCase(TEX_LADDER[b.hairType] || 'unknown'),
    skinTone:  titleCase(SKIN_LADDER[b.skinTone] || 'unknown'),
    faceShape: titleCase(FACE_LADDER[b.faceShape] || 'unknown'),
    freckles:  `${b.freckles}%`,
    dimples:   `${b.dimples}%`,
    creativity: `${b.creativity}/10`,
    athletic:   `${b.athletic}/10`,
    calmness:   `${b.calmness}/10`,
    social:     `${b.social}/10`,
    curiosity:  `${b.curiosity}/10`
  };

  // update slider value labels
  SLIDER_DEFS.forEach(def => {
    const el = $('#val_' + def.key);
    if (el) el.textContent = display[def.key];
  });

  // update stats panel
  const statsEl = $('#baby-stats');
  statsEl.innerHTML = `
    <dt>Sex</dt>                <dd>${GENDER_LABEL[state.gender] || 'Surprise'}</dd>
    <dt>Height</dt>             <dd>~ ${display.height}</dd>
    <dt>Eye color</dt>          <dd>${display.eyeColor}</dd>
    <dt>Hair color</dt>         <dd>${display.hairColor}</dd>
    <dt>Hair texture</dt>       <dd>${display.hairType}</dd>
    <dt>Skin tone</dt>          <dd>${display.skinTone}</dd>
    <dt>Face shape</dt>         <dd>${display.faceShape}</dd>
    <dt>Freckles</dt>           <dd>${display.freckles}</dd>
    <dt>Dimples</dt>            <dd>${display.dimples}</dd>
    <dt>Creativity</dt>         <dd>${display.creativity}</dd>
    <dt>Athletic</dt>           <dd>${display.athletic}</dd>
    <dt>Calmness</dt>           <dd>${display.calmness}</dd>
    <dt>Social energy</dt>      <dd>${display.social}</dd>
    <dt>Curiosity</dt>          <dd>${display.curiosity}</dd>
  `;

  // archetype
  const archetype = calculateArchetype(b);
  $('#archetype').textContent = archetype;
  state.archetype = archetype;

  // avatar
  updateAvatar(b);
}

/* ====================================================================
 * 7. Archetype scoring
 * ==================================================================== */

function calculateArchetype(b) {
  const { creativity, athletic, calmness, social, curiosity } = b;
  const scores = {
    'Tiny Engineer':         curiosity * 1.2 + calmness * 0.8 - athletic * 0.4,
    'Wild Artist':           creativity * 1.5 - calmness * 0.6 + social * 0.3,
    'Calm Explorer':         curiosity * 1.0 + calmness * 1.2,
    'Social Spark':          social * 1.4 + creativity * 0.6,
    'Mini Strategist':       curiosity * 0.9 + calmness * 0.9 + creativity * 0.4 + athletic * 0.3,
    'Chaos Scientist':       curiosity * 1.3 + creativity * 0.9 - calmness * 0.5,
    'Gentle Genius':         curiosity * 1.0 + calmness * 1.1 - social * 0.4,
    'Athletic Firecracker':  athletic * 1.4 + social * 0.7
  };
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/* ====================================================================
 * 8. Avatar updates (SVG)
 * ==================================================================== */

function updateAvatar(b) {
  const host = document.getElementById('avatar-host');
  if (!host) return;
  const styleName = state.style;
  const cfg = DICEBEAR_STYLES[styleName] || DICEBEAR_STYLES.lorelei;
  const g = state.gender;

  const skinHex = SKIN_HEX[SKIN_LADDER[b.skinTone]].replace('#','');
  const hairHex = HAIR_HEX[HAIR_LADDER[b.hairColor]].replace('#','');
  const eyeHex  = EYE_HEX[EYE_LADDER[b.eyeColor]].replace('#','');
  const texName  = TEX_LADDER[b.hairType];
  const faceName = FACE_LADDER[b.faceShape];

  // Universal — every personality / number slider gets a visible effect.
  const scaleVal  = Math.round(92 + ((b.height - 140) / 70) * 22);          // height → 92–114
  const rotateVal = Math.round(((b.curiosity - 1) / 9) * 12);                // curiosity → 0–12° tilt

  // Background derives from calmness, athletic, freckles, dimples — so all four
  // sliders are visible even on styles that lack their own dial.
  const bgHue   = 30 + (b.calmness - 1) * (200/9) + (b.freckles - 50) * 0.25;
  const bgLight = 60 + b.athletic * 2 + (b.dimples - 50) * 0.06;
  const bgHex   = hslToHex(bgHue, 45, Math.max(48, Math.min(86, bgLight)));
  const bgType  = b.creativity >= 6 ? 'gradientLinear' : 'solid';            // creativity → gradient on

  const seed = `${state.codename || 'baby'}|${b.hairType}|${b.faceShape}|${b.eyeColor}`;

  const options = {
    seed,
    skinColor: [skinHex],
    hairColor: [hairHex],
    backgroundColor: [bgHex],
    backgroundType: [bgType],
    scale: scaleVal,
    rotate: rotateVal
  };

  // Hair bucket + gender bias — both styles use curated subsets now.
  let bucket = HAIR_BUCKETS[styleName]?.[texName];
  if (bucket && (g === 'female' || g === 'male')) {
    if (styleName === 'lorelei') {
      bucket = LORELEI_HAIR_BY_GENDER[g][texName] || bucket;
    } else if (styleName === 'bigSmile') {
      bucket = BIGSMILE_HAIR_BY_GENDER[g][texName] || bucket;
    }
  }
  if (bucket) options.hair = bucket;

  if (styleName === 'lorelei') {
    options.eyesColor = [eyeHex];
    options.head  = [LORELEI_HEAD[faceName] || 'variant02'];
    options.mouth = [LORELEI_MOUTH[b.social] || 'happy09'];
    options.frecklesProbability = Math.round(b.freckles);
    options.beardProbability = 0;  // babies don't have beards, period
    options.glassesProbability = 0; // and no glasses on infants by default

    // Creativity → eyebrows variant (1–13)
    const browIdx = Math.max(1, Math.min(13, Math.round((b.creativity - 1) / 9 * 12) + 1));
    options.eyebrows = [`variant${String(browIdx).padStart(2, '0')}`];

    // Dimples → nose variant (1–6)
    const noseIdx = Math.max(1, Math.min(6, Math.floor(b.dimples / 17) + 1));
    options.nose = [`variant${String(noseIdx).padStart(2, '0')}`];

    if (g === 'female') {
      options.hairAccessoriesProbability = 100;
      options.earringsProbability = 100;
    } else if (g === 'male') {
      options.hairAccessoriesProbability = 0;
      options.earringsProbability = 0;
    } else {
      options.hairAccessoriesProbability = 35;
      options.earringsProbability = 20;
    }
  } else if (styleName === 'bigSmile') {
    options.mouth = [BIGSMILE_MOUTH[b.social] || 'gapSmile'];
    options.eyes  = [BIGSMILE_EYES[b.eyeColor] || 'normal'];
    if (g === 'female') {
      options.accessoriesProbability = 40;
      options.accessories = ['sailormoonCrown'];
    } else {
      options.accessoriesProbability = 0;
    }
  }

  try {
    const svg = createAvatar(cfg.module, options).toString();
    host.innerHTML = svg;
  } catch (e) {
    host.innerHTML = '<div class="avatar-error">Avatar failed to load</div>';
    console.error('DiceBear render failed:', e);
  }
}

/* ====================================================================
 * 9. Codename
 * ==================================================================== */

function generateCodename(parents) {
  const a = (parents.A.name || 'A').trim();
  const bp = (parents.B.name || 'B').trim();
  const aLet = (a[0] || 'A').toUpperCase();
  const bLet = (bp[0] || 'B').toUpperCase();
  const num = String(randInt(1, 99)).padStart(2, '0');
  return `Tiny Prototype ${aLet}${bLet}-${num}`;
}

/* ====================================================================
 * 10. Action buttons
 * ==================================================================== */

function randomizeBaby() {
  SLIDER_DEFS.forEach(def => {
    const r = state.ranges[def.key];
    const v = randInt(r.min, r.max);
    state.baby[def.key] = v;
    const slider = $('#s_' + def.key);
    if (slider) slider.value = v;
  });
  updateBabyPreview();
}

function resetBaby() {
  SLIDER_DEFS.forEach(def => {
    const r = state.ranges[def.key];
    state.baby[def.key] = r.def;
    const slider = $('#s_' + def.key);
    if (slider) slider.value = r.def;
  });
  updateBabyPreview();
}

function copyProfile() {
  const p = state.parents;
  const b = state.baby;
  const lines = [
    `BabyBlend Lab — ${state.codename}`,
    ``,
    `Parents: ${p.A.name || 'Parent A'} × ${p.B.name || 'Parent B'}`,
    `Sex: ${GENDER_LABEL[state.gender] || 'Surprise'}`,
    `Genetic surprise factor: ${state.surprise}%`,
    `Archetype: ${state.archetype}`,
    ``,
    `— Likely Traits —`,
    `Height (possible):       ~${Math.round(b.height)} cm`,
    `Eye color (likely):       ${titleCase(EYE_LADDER[b.eyeColor])}`,
    `Hair color (likely):      ${titleCase(HAIR_LADDER[b.hairColor])}`,
    `Hair texture (likely):    ${titleCase(TEX_LADDER[b.hairType])}`,
    `Skin tone (likely):       ${titleCase(SKIN_LADDER[b.skinTone])}`,
    `Face shape (likely):      ${titleCase(FACE_LADDER[b.faceShape])}`,
    `Freckles likelihood:      ${b.freckles}%`,
    `Dimples likelihood:       ${b.dimples}%`,
    ``,
    `— Personality —`,
    `Creativity:    ${b.creativity}/10`,
    `Athletic:      ${b.athletic}/10`,
    `Calmness:      ${b.calmness}/10`,
    `Social energy: ${b.social}/10`,
    `Curiosity:     ${b.curiosity}/10`,
    ``,
    `(Fictional simulation — not a real genetic prediction. Real traits`,
    `are shaped by many genes, environment, chance, culture, health,`,
    `and life experience.)`
  ];
  const text = lines.join('\n');
  const status = $('#copy-status');
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); status.textContent = 'Copied to clipboard ✓'; }
    catch { status.textContent = 'Couldn’t copy automatically — please copy from the alert.'; alert(text); }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => { status.textContent = 'Copied to clipboard ✓'; })
      .catch(fallback);
  } else { fallback(); }
  setTimeout(() => { if (status.textContent.startsWith('Copied')) status.textContent = ''; }, 2200);
}

/* ====================================================================
 * 11. Surprise UI
 * ==================================================================== */

function renderSurprise(pct) {
  $('#surprise-pct').textContent = pct + '%';
  $('#surprise-fill').style.width = pct + '%';
  const note = pct < 25
    ? 'Parents are similar across most traits — fewer wild blends.'
    : pct < 55
      ? 'A balanced mix — expect some traits to lean toward either parent.'
      : pct < 80
        ? 'Parents are quite different — many possible blends.'
        : 'Wildly different parents — almost anything goes within this space.';
  $('#surprise-note').textContent = note;
}

/* ====================================================================
 * 12. Wire everything up
 * ==================================================================== */

function generate() {
  state.parents = collectParentData();
  state.ranges  = generateSliderRanges(state.parents);
  state.surprise = computeSurprise(state.parents);
  state.codename = generateCodename(state.parents);

  $('#codename').textContent = state.codename;
  renderSliders(state.ranges);
  resetBaby();             // sets to parent-average defaults + triggers preview
  renderSurprise(state.surprise);

  const results = $('#results');
  results.hidden = false;
  // smooth scroll on first reveal
  requestAnimationFrame(() => {
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function setupPillToggle(btnSelector, stateKey) {
  $$(btnSelector).forEach(btn => {
    btn.addEventListener('click', () => {
      $$(btnSelector).forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      state[stateKey] = btn.dataset[stateKey];
      if (state.codename) {
        updateAvatar(state.baby);
        updateBabyPreview();   // refresh stats line that includes the new value
      }
    });
  });
}

function init() {
  buildParentForms();
  setupPillToggle('.style-btn', 'style');
  setupPillToggle('.gender-btn', 'gender');
  $('#generate-btn').addEventListener('click', generate);
  $('#randomize-btn').addEventListener('click', randomizeBaby);
  $('#reset-btn').addEventListener('click', resetBaby);
  $('#copy-btn').addEventListener('click', copyProfile);
}

document.addEventListener('DOMContentLoaded', init);
