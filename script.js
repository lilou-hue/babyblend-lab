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

/* ---------- Flavor pools ---------- */

const FUNNY_TITLES = [
  'Chaos Gremlin', 'Future Space Pirate', 'Tiny Philosopher', 'Galactic Menace',
  'Certified Goober', 'Mini Strategist', 'Cosmic Researcher', 'Pocket Scientist',
  'Local Cryptid', 'Aspiring Wizard', 'Tiny Bureaucrat', 'Future CEO of Cats',
  'Galaxy-Brained Toddler', 'Backup Main Character', 'Tiny Tax Evader',
  'Professional Cousin', 'Stealth Comedian', 'Aspiring Lawyer of Crumbs',
  'Future Documentary Subject', 'Tiny Conspiracy Theorist', 'Junior Cartographer',
  'Designated Driver of the Family', 'Future Internet Mystery', 'Resident Cool Aunt-In-Training',
  'Lowercase Genius', 'Tiny Method Actor', 'Pocket-Sized Visionary', 'Heir to the Couch Fort',
  'Future Forager', 'Sleeper Agent of Joy', 'Future Sourdough Influencer',
  'Tiny Cult Leader (Wholesome)', 'Local Vibe Curator', 'Future Hobby Collector',
  'Backseat Driver of Destiny', 'Junior Sky Inspector', 'Tiny Dragon Negotiator',
  'Tomorrow’s Roller-Skating Champion', 'Future Spreadsheet Wizard',
  'Junior Time-Travel Skeptic', 'Tiny Patron of the Arts', 'Future Whittler of Tiny Things'
];

// Future-path predictions, tagged with personality bias keys (O/C/E/A/N/athletic).
// Tagging is loose — at runtime we pick from the full pool with the bias as a soft weight.
const FUTURE_PATHS = [
  { text: 'Probably starts three unfinished novels.',                          tag: 'O' },
  { text: 'Will attempt to build a robot at age 11.',                          tag: 'O' },
  { text: 'Most likely to accidentally become famous online.',                 tag: 'E' },
  { text: 'Will get into 47 hobbies and finish 0.5 of them.',                  tag: 'O' },
  { text: 'Future expert in obscure cheeses.',                                 tag: 'O' },
  { text: 'Will own a slightly haunted plant.',                                tag: 'O' },
  { text: 'Will form a strong opinion about whether a hot dog is a sandwich.', tag: 'A' },
  { text: 'Almost certainly invents a board game no one understands.',         tag: 'C' },
  { text: 'Will alphabetize the spice rack at age 9.',                         tag: 'C' },
  { text: 'Probably keeps a meticulous log of every dream they’ve had.',   tag: 'C' },
  { text: 'Becomes the family’s designated planner of everything.',        tag: 'C' },
  { text: 'Will have a five-year plan by age 7.',                              tag: 'C' },
  { text: 'Future class president, slightly suspiciously.',                    tag: 'E' },
  { text: 'Talks to strangers at the bus stop and learns their life story.',   tag: 'E' },
  { text: 'Will throw the loudest, weirdest birthday parties.',                tag: 'E' },
  { text: 'Becomes the kid everyone has a crush on but is oblivious.',         tag: 'E' },
  { text: 'Will run an underground trading economy in elementary school.',     tag: 'E' },
  { text: 'Becomes the family peacemaker before age 6.',                       tag: 'A' },
  { text: 'Will adopt every stray animal in a 10-mile radius.',                tag: 'A' },
  { text: 'Sends handwritten thank-you notes unprompted.',                     tag: 'A' },
  { text: 'Will be voted "best to call when you’re sad."',                 tag: 'A' },
  { text: 'Forms a deeply parasocial relationship with one specific celebrity.', tag: 'N' },
  { text: 'Will worry about the structural integrity of the bouncy castle.',   tag: 'N' },
  { text: 'Develops a slightly intense relationship with a stuffed animal.',   tag: 'N' },
  { text: 'Future investigative journalist of family secrets.',                tag: 'N' },
  { text: 'Will be unreasonably good at one weird sport.',                     tag: 'athletic' },
  { text: 'Sprints everywhere, even indoors, for reasons unknown.',            tag: 'athletic' },
  { text: 'Future captain of a sport that hasn’t been invented yet.',      tag: 'athletic' },
  { text: 'Will challenge a stranger to a footrace and win.',                  tag: 'athletic' },
  { text: 'Becomes the only person in their school who can do a backflip on command.', tag: 'athletic' },
  { text: 'Will name their first car something embarrassing.',                 tag: 'O' },
  { text: 'Probably invents a sandwich that goes mildly viral.',               tag: 'O' },
  { text: 'Will read every plaque in every museum, out loud.',                 tag: 'O' },
  { text: 'Future hobbyist beekeeper of one (1) bee.',                         tag: 'O' },
  { text: 'Will form a band, write one song, then break up the band.',         tag: 'O' },
  { text: 'Becomes the kid who knows everyone in town somehow.',               tag: 'E' },
  { text: 'Will start a podcast nobody listens to but it’s great anyway.',  tag: 'O' },
  { text: 'Future bridge-builder between extended family group chats.',        tag: 'A' },
  { text: 'Will memorize the menu of one specific diner by heart.',            tag: 'C' },
  { text: 'Eventually becomes Designated Dog Person of their friend group.',   tag: 'A' },
  { text: 'Will refuse to eat anything green until age 24, then write a cookbook.', tag: 'O' },
  { text: 'Probably collects keychains from places they’ve never been.',    tag: 'O' },
  { text: 'Future expert on the optimal way to organize a snack drawer.',      tag: 'C' },
  { text: 'Will form a competitive rivalry with a neighbor’s cat.',        tag: 'N' },
  { text: 'Almost certainly tries to start a treehouse co-op.',                tag: 'A' },
  { text: 'Will say “technically” at least 40 times a day by middle school.', tag: 'C' }
];

const RANDOM_EVENTS = [
  'Mutation Event: Can fall asleep absolutely anywhere.',
  'Inherited Grandparent Energy: 1970s edition.',
  'Inherited Grandparent Energy: surprise great-aunt arc.',
  'Main Character Syndrome detected.',
  'Extremely Competitive Sibling Arc unlocked.',
  'Raised by space documentaries.',
  'Briefly believes they’re a cat. Compelling case.',
  'Tiny existential crisis on the swing set, age 4.',
  'Develops mysterious fluency in a video game language.',
  'Inexplicable mastery of one specific accent.',
  'Has one (1) recurring oddly specific dream.',
  'Becomes the family’s designated Wi-Fi shaman.',
  'Adopts an imaginary friend with a full backstory and a job.',
  'Will quote a niche movie obsessively for 18 months straight.',
  'Develops a strong, baffling opinion about cereal hierarchy.',
  'Recessive trait surfaces: laughs exactly like a great-grandparent.',
  'Spontaneous golden-retriever-coded summer.',
  'Spontaneous black-cat-coded autumn.',
  'Unexpected lefty energy despite righty parents.',
  'Forms a parasocial bond with a houseplant. Names it.',
  'Becomes weirdly good at one obscure carnival game.',
  'Will go through a brief but committed pirate phase.',
  'Surprise musical talent surfaces during karaoke night.',
  'Develops a personal catchphrase by age 5. Family adopts it.',
  'Future memoir title: already chosen, age 6.'
];

const FUN_NAMES = [
  'Avery','Bea','Cyrus','Dax','Echo','Fern','Gus','Hazel','Iris','Juno',
  'Kai','Lior','Mika','Nia','Onyx','Paz','Quill','Rune','Sage','Tabor',
  'Una','Vesper','Wren','Xander','Yuki','Zane','Cleo','Soren','Mae','Pax',
  'Theo','Ada','Indigo','Marlow','Lior','Rio','Saskia','Beck','Tova','Lev'
];

/* ---------- Seeded randomness ---------- */
// Tiny deterministic hash → uint32. Same string in, same value out.
function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
// Returns a deterministic RNG (0..1) for a given seed.
function seededRand(seed) {
  let s = hashStr(String(seed)) || 1;
  return () => {
    // mulberry32
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pickN(arr, n, rng) {
  const copy = arr.slice();
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(rng() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

// Where freckles land on each style's viewBox (as fractions).
const FACE_METRICS = {
  lorelei:  { cheekY: 0.54, dotR: 0.0085 },
  bigSmile: { cheekY: 0.55, dotR: 0.0125 }
};

// Deterministic freckle scatter — first N are picked as slider goes up.
const FRECKLE_SCATTER = [
  [-0.18, -0.02], [-0.12,  0.01], [-0.08, -0.03], [-0.05,  0.02], [-0.02, -0.01],
  [ 0.02, -0.01], [ 0.05,  0.02], [ 0.08, -0.03], [ 0.12,  0.01], [ 0.18, -0.02],
  [-0.14,  0.04], [-0.06,  0.05], [ 0.06,  0.05], [ 0.14,  0.04]
];

function addTraitOverlays(svg, b, styleName) {
  const m = FACE_METRICS[styleName] || FACE_METRICS.lorelei;
  const vb = /viewBox="(\d+)\s+(\d+)\s+(\d+)\s+(\d+)"/.exec(svg);
  if (!vb) return svg;
  const W = Number(vb[3]);
  const H = Number(vb[4]);

  let pieces = '';

  // Freckles — count + opacity both scale with slider value.
  if (b.freckles > 0) {
    const opacity = Math.min(1, b.freckles / 100);
    const visible = Math.max(3, Math.round((b.freckles / 100) * FRECKLE_SCATTER.length));
    const r = W * m.dotR;
    for (let i = 0; i < visible; i++) {
      const [dx, dy] = FRECKLE_SCATTER[i];
      const cx = (W * 0.5 + W * dx).toFixed(1);
      const cy = (H * m.cheekY + H * dy).toFixed(1);
      pieces += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(2)}" fill="rgba(70,38,18,${(0.85*opacity).toFixed(2)})"/>`;
    }
  }

  if (!pieces) return svg;
  return svg.replace(/<\/svg>\s*$/, pieces + '</svg>');
}

/* ---------- Parent form schema ---------- */

const PARENT_FIELDS = [
  { key: 'name',       label: 'Name',                type: 'text',   defA: 'Alex',  defB: 'Bea' },
  { key: 'height',     label: 'Height (cm)',         type: 'number', min: 140, max: 210, defA: 170, defB: 175 },
  { key: 'athletic',   label: 'Athletic',            subtitle: 'physical tendency',           type: 'range', min: 1, max: 10, defA: 5, defB: 6 },
  { key: 'eyeColor',   label: 'Eye color',           type: 'select', options: EYE_LADDER,    defA: 'blue',     defB: 'brown' },
  { key: 'hairColor',  label: 'Hair color',          type: 'select', options: HAIR_LADDER,   defA: 'blonde',   defB: 'dark brown' },
  { key: 'hairType',   label: 'Hair type',           type: 'select', options: TEX_LADDER,    defA: 'straight', defB: 'curly' },
  { key: 'skinTone',   label: 'Skin tone',           type: 'select', options: SKIN_LADDER,   defA: 'fair',     defB: 'medium' },
  { key: 'faceShape',  label: 'Face shape',          type: 'select', options: FACE_LADDER,   defA: 'oval',     defB: 'round' },
  { key: 'freckles',   label: 'Freckles',            type: 'select', options: FRECK_LADDER,  defA: 'none',     defB: 'light' },
  { key: 'dimples',    label: 'Dimples',             type: 'select', options: DIMPLE_LADDER, defA: 'no',       defB: 'yes' },
  // Big Five (OCEAN)
  { key: 'openness',          label: 'Openness',          subtitle: 'curiosity & imagination',   type: 'range', min: 1, max: 10, defA: 7, defB: 6 },
  { key: 'conscientiousness', label: 'Conscientiousness', subtitle: 'discipline & organization', type: 'range', min: 1, max: 10, defA: 6, defB: 5 },
  { key: 'extraversion',      label: 'Extraversion',      subtitle: 'sociability & energy',      type: 'range', min: 1, max: 10, defA: 6, defB: 8 },
  { key: 'agreeableness',     label: 'Agreeableness',     subtitle: 'kindness & cooperation',    type: 'range', min: 1, max: 10, defA: 7, defB: 7 },
  { key: 'neuroticism',       label: 'Neuroticism',       subtitle: 'emotional reactivity',      type: 'range', min: 1, max: 10, defA: 4, defB: 5 }
];

/* ---------- Slider definitions ---------- */
/* Each baby slider is built dynamically with a min/max/default derived from parents. */

const SLIDER_DEFS = [
  { key: 'height',     label: 'Height potential',  unit: 'cm',     kind: 'continuous', hardMin: 140, hardMax: 210, expand: 5  },
  { key: 'athletic',   label: 'Athletic tendency',    unit: '/10', kind: 'polygenic',  hardMin: 1,   hardMax: 10, sigma: 1.75 },
  { key: 'eyeColor',   label: 'Eye color blend',                   kind: 'ladder', ladder: EYE_LADDER  },
  { key: 'hairColor',  label: 'Hair color blend',                  kind: 'ladder', ladder: HAIR_LADDER },
  { key: 'hairType',   label: 'Hair texture blend',                kind: 'ladder', ladder: TEX_LADDER  },
  { key: 'skinTone',   label: 'Skin tone blend',                   kind: 'ladder', ladder: SKIN_LADDER },
  { key: 'faceShape',  label: 'Face shape blend',                  kind: 'ladder', ladder: FACE_LADDER },
  { key: 'freckles',   label: 'Freckles likelihood',  unit: '%',   kind: 'likelihood', parentKey: 'freckles', ladder: FRECK_LADDER },
  { key: 'dimples',    label: 'Dimples likelihood',   unit: '%',   kind: 'likelihood', parentKey: 'dimples',  ladder: DIMPLE_LADDER },
  // Big Five (OCEAN) — child ≈ midparent ± 2σ (~95% interval at ~50% heritability)
  { key: 'openness',          label: 'Openness',          unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: 1.75 },
  { key: 'conscientiousness', label: 'Conscientiousness', unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: 1.75 },
  { key: 'extraversion',      label: 'Extraversion',      unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: 1.75 },
  { key: 'agreeableness',     label: 'Agreeableness',     unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: 1.75 },
  { key: 'neuroticism',       label: 'Neuroticism',       unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: 1.75 }
];

/* ---------- Application state ---------- */

const state = {
  parents: { A: {}, B: {} },
  ranges: {},          // per-slider { min, max, def, step, kind, ... }
  baby: {},            // current baby slider values
  codename: '',
  vibe: '',            // funny "future vibe" title
  futurePaths: [],     // 3 future-path predictions
  events: [],          // 0–2 random events
  archetype: '',
  surprise: 0,
  style: 'lorelei',    // 'lorelei' | 'bigSmile'
  gender: 'surprise',  // 'female' | 'male' | 'surprise'
  chaos: false,        // amplifies slider ranges + surprise
  alternates: []       // generated alternate-timeline babies
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
        const sub = f.subtitle
          ? `<span class="field-subtitle">${f.subtitle}</span>`
          : `<span class="hint">(1–10)</span>`;
        field.innerHTML = `
          <label for="${id}">${f.label} ${sub}</label>
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
  const chaos = state.chaos;

  SLIDER_DEFS.forEach(def => {
    if (def.kind === 'continuous') {
      const a = parents.A[def.key], b = parents.B[def.key];
      const expand = chaos ? def.expand * 8 : def.expand;
      const lo = clamp(Math.min(a, b) - expand, def.hardMin, def.hardMax);
      const hi = clamp(Math.max(a, b) + expand, def.hardMin, def.hardMax);
      const center = (a + b) / 2;
      ranges[def.key] = {
        kind: 'continuous',
        min: lo, max: hi,
        step: def.hardMax <= 10 ? 1 : 1,
        def: Math.round(center),
        unit: def.unit || ''
      };
    } else if (def.kind === 'polygenic') {
      // Big-Five-flavored: child ≈ midparent + Gaussian(σ), ~50% heritability.
      // Slider range ≈ midparent ± 2σ (covers ~95% of plausible outcomes).
      // Chaos mode widens to the full hardMin/hardMax range.
      const a = parents.A[def.key], b = parents.B[def.key];
      const center = (a + b) / 2;
      const half = chaos ? (def.hardMax - def.hardMin) : (2 * def.sigma);
      const lo = clamp(Math.floor(center - half), def.hardMin, def.hardMax);
      const hi = clamp(Math.ceil (center + half), def.hardMin, def.hardMax);
      ranges[def.key] = {
        kind: 'polygenic',
        min: lo, max: hi,
        step: 1,
        def: clamp(Math.round(center), lo, hi),
        unit: def.unit || ''
      };
    } else if (def.kind === 'ladder') {
      const ladder = def.ladder;
      const ai = ladder.indexOf(parents.A[def.key]);
      const bi = ladder.indexOf(parents.B[def.key]);
      let lo = Math.min(ai, bi);
      let hi = Math.max(ai, bi);
      if (chaos) {
        lo = 0; hi = ladder.length - 1;
      } else {
        // If both parents identical, allow ±1 of variation as "uncertainty"
        if (lo === hi) {
          lo = Math.max(0, lo - 1);
          hi = Math.min(ladder.length - 1, hi + 1);
        }
        lo = Math.max(0, lo);
        hi = Math.min(ladder.length - 1, hi);
      }
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
      const norm = ((ai + bi) / 2) / (ladder.length - 1);
      const spread = chaos ? 100 : (25 + Math.abs(ai - bi) * 15);
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
    { key: 'height',            span: 50 },
    { key: 'athletic',          span: 9 },
    { key: 'openness',          span: 9 },
    { key: 'conscientiousness', span: 9 },
    { key: 'extraversion',      span: 9 },
    { key: 'agreeableness',     span: 9 },
    { key: 'neuroticism',       span: 9 }
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
  // base 8% so it's never zero — life always has uncertainty. Chaos mode amplifies.
  const chaosBoost = state.chaos ? 30 : 0;
  return Math.round(clamp(avg * 90 + 8 + chaosBoost, 0, 100));
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
    } else if (r.kind === 'continuous' || r.kind === 'polygenic') {
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
    athletic:  `${b.athletic}/10`,
    eyeColor:  titleCase(EYE_LADDER[b.eyeColor]  || 'unknown'),
    hairColor: titleCase(HAIR_LADDER[b.hairColor] || 'unknown'),
    hairType:  titleCase(TEX_LADDER[b.hairType]  || 'unknown'),
    skinTone:  titleCase(SKIN_LADDER[b.skinTone] || 'unknown'),
    faceShape: titleCase(FACE_LADDER[b.faceShape] || 'unknown'),
    freckles:  `${b.freckles}%`,
    dimples:   `${b.dimples}%`,
    openness:          `${b.openness}/10`,
    conscientiousness: `${b.conscientiousness}/10`,
    extraversion:      `${b.extraversion}/10`,
    agreeableness:     `${b.agreeableness}/10`,
    neuroticism:       `${b.neuroticism}/10`
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
    <dt>Athletic</dt>           <dd>${display.athletic}</dd>
    <dt>Eye color</dt>          <dd>${display.eyeColor}</dd>
    <dt>Hair color</dt>         <dd>${display.hairColor}</dd>
    <dt>Hair texture</dt>       <dd>${display.hairType}</dd>
    <dt>Skin tone</dt>          <dd>${display.skinTone}</dd>
    <dt>Face shape</dt>         <dd>${display.faceShape}</dd>
    <dt>Freckles</dt>           <dd>${display.freckles}</dd>
    <dt>Dimples</dt>            <dd>${display.dimples}</dd>
    <dt class="ocean-sep">Big Five</dt> <dd></dd>
    <dt>Openness</dt>           <dd>${display.openness}</dd>
    <dt>Conscientiousness</dt>  <dd>${display.conscientiousness}</dd>
    <dt>Extraversion</dt>       <dd>${display.extraversion}</dd>
    <dt>Agreeableness</dt>      <dd>${display.agreeableness}</dd>
    <dt>Neuroticism</dt>        <dd>${display.neuroticism}</dd>
  `;

  // archetype
  const archetype = calculateArchetype(b);
  $('#archetype').textContent = archetype;
  state.archetype = archetype;

  // chaos badge visibility
  const cb = $('#chaos-badge');
  if (cb) cb.hidden = !state.chaos;

  // future vibe + paths + random events
  const vibeEl = $('#vibe-title');
  if (vibeEl) vibeEl.textContent = state.vibe || '';
  const pathsEl = $('#future-paths');
  if (pathsEl) {
    pathsEl.innerHTML = (state.futurePaths || []).map(t => `<li>${t}</li>`).join('');
  }
  const eventsEl = $('#random-events');
  if (eventsEl) {
    eventsEl.innerHTML = (state.events || []).map(t => `<span class="event-chip">${t}</span>`).join('');
  }
  const futureBlock = $('#future-block');
  if (futureBlock) futureBlock.hidden = !(state.futurePaths && state.futurePaths.length);

  // avatar
  updateAvatar(b);
}

/* ====================================================================
 * 7. Archetype scoring
 * ==================================================================== */

function calculateArchetype(b) {
  // Scoring over Big Five (O/C/E/A/N) + athletic.
  const O = b.openness, C = b.conscientiousness, E = b.extraversion,
        A = b.agreeableness, N = b.neuroticism, athletic = b.athletic;
  const scores = {
    'Tiny Engineer':         O * 0.9  + C * 1.3 - E * 0.4,                 // focused & curious & organized
    'Wild Artist':           O * 1.5  - C * 0.7 + N * 0.2,                 // imaginative, scattered, expressive
    'Calm Explorer':         O * 1.2  - N * 0.9,                           // curious & emotionally steady
    'Social Spark':          E * 1.4  + A * 0.6,                           // extraverted & warm
    'Mini Strategist':       O * 0.7  + C * 1.1 - N * 0.3,                 // analytical & methodical
    'Chaos Scientist':       O * 1.3  - C * 0.6 + N * 0.5,                 // intense, scattered, creative
    'Gentle Genius':         O * 1.0  + A * 1.0 - E * 0.4,                 // quiet, smart, kind
    'Athletic Firecracker':  athletic * 1.3 + E * 0.7 - N * 0.3            // energetic, social, confident
  };
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/* ====================================================================
 * 8. Avatar updates (SVG)
 * ==================================================================== */

function buildAvatarSvg(b, styleName, g, seedHint) {
  const cfg = DICEBEAR_STYLES[styleName] || DICEBEAR_STYLES.lorelei;

  const skinHex = SKIN_HEX[SKIN_LADDER[b.skinTone]].replace('#','');
  const hairHex = HAIR_HEX[HAIR_LADDER[b.hairColor]].replace('#','');
  const eyeHex  = EYE_HEX[EYE_LADDER[b.eyeColor]].replace('#','');
  const texName  = TEX_LADDER[b.hairType];
  const faceName = FACE_LADDER[b.faceShape];

  // Universal — every numeric slider drives a visible avatar feature.
  const scaleVal  = Math.round(92 + ((b.height - 140) / 70) * 22);            // height → 92–114
  const rotateVal = Math.round(((b.openness - 1) / 9) * 12);                  // openness → 0–12° head tilt

  // Background channels personality:
  //   hue        ← neuroticism (low N = cool/blue/calm, high N = warm/intense)
  //   saturation ← agreeableness (low = muted, high = vivid)
  //   lightness  ← athletic (low = darker, high = brighter)
  //   type       ← openness (gradient if open/imaginative)
  const bgHue   = 30 + (10 - b.neuroticism) * (200/9);
  const bgSat   = 25 + b.agreeableness * 3;
  const bgLight = 60 + b.athletic * 2;
  const bgHex   = hslToHex(bgHue, Math.max(20, Math.min(70, bgSat)), Math.max(48, Math.min(86, bgLight)));
  const bgType  = b.openness >= 6 ? 'gradientLinear' : 'solid';

  const seed = `${seedHint || state.codename || 'baby'}|${b.hairType}|${b.faceShape}|${b.eyeColor}`;

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
    options.mouth = [LORELEI_MOUTH[b.extraversion] || 'happy09'];
    // Native Lorelei freckles are binary (on/off by seed) — disable, we draw
    // our own continuous-density overlay instead.
    options.frecklesProbability = 0;
    options.beardProbability   = 0; // babies don't have beards
    options.glassesProbability = 0; // or glasses

    // Conscientiousness → eyebrows variant (1–13)
    const browIdx = Math.max(1, Math.min(13, Math.round((b.conscientiousness - 1) / 9 * 12) + 1));
    options.eyebrows = [`variant${String(browIdx).padStart(2, '0')}`];

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
    options.mouth = [BIGSMILE_MOUTH[b.extraversion] || 'gapSmile'];
    options.eyes  = [BIGSMILE_EYES[b.eyeColor] || 'normal'];
    if (g === 'female') {
      options.accessoriesProbability = 40;
      options.accessories = ['sailormoonCrown'];
    } else {
      options.accessoriesProbability = 0;
    }
  }

  try {
    let svg = createAvatar(cfg.module, options).toString();
    return addTraitOverlays(svg, b, styleName);
  } catch (e) {
    console.error('DiceBear render failed:', e);
    return '<div class="avatar-error">Avatar failed to load</div>';
  }
}

function updateAvatar(b) {
  const host = document.getElementById('avatar-host');
  if (!host) return;
  host.innerHTML = buildAvatarSvg(b, state.style, state.gender, state.codename);
}

/* ---------- Alternate Timelines ---------- */

function generateAlternateTimelines() {
  if (!state.codename) return;
  const count = state.chaos ? 6 : 4;
  const baseSeed = Date.now() + ':' + Math.random().toString(36).slice(2, 6);
  const alternates = [];

  for (let i = 0; i < count; i++) {
    const rng = seededRand('alt|' + baseSeed + '|' + i);

    // Pick a random value within each slider's current range.
    // Chaos mode opens it to the full hard range so things really diverge.
    const baby = {};
    SLIDER_DEFS.forEach(def => {
      const r = state.ranges[def.key];
      const lo = state.chaos && def.hardMin !== undefined ? def.hardMin : r.min;
      const hi = state.chaos && def.hardMax !== undefined ? def.hardMax : r.max;
      baby[def.key] = Math.floor(rng() * (hi - lo + 1)) + lo;
    });

    const aLet = ((state.parents.A.name || 'A')[0] || 'A').toUpperCase();
    const bLet = ((state.parents.B.name || 'B')[0] || 'B').toUpperCase();
    const num = String(Math.floor(rng() * 99) + 1).padStart(2, '0');
    const codename = `Tiny Prototype ${aLet}${bLet}-${num}`;

    const archetype = calculateArchetype(baby);
    const flavor = generateBabyFlavor(codename, baby);
    alternates.push({ baby, codename, archetype, ...flavor });
  }

  state.alternates = alternates;
  renderAlternates();
}

function renderAlternates() {
  const grid  = $('#alternates-grid');
  const panel = $('#alternates-panel');
  if (!grid || !panel) return;
  if (!state.alternates || state.alternates.length === 0) {
    panel.hidden = true; return;
  }

  grid.innerHTML = state.alternates.map((a, i) => {
    const svg = buildAvatarSvg(a.baby, state.style, state.gender, a.codename);
    return `
      <article class="alt-card" data-index="${i}">
        <div class="alt-avatar">${svg}</div>
        <div class="alt-codename">${a.codename}</div>
        <div class="alt-vibe">${a.vibe}</div>
        <div class="alt-archetype">${a.archetype}</div>
        <button type="button" class="btn btn-tiny alt-load" data-index="${i}">Make this the main baby</button>
      </article>`;
  }).join('');

  grid.querySelectorAll('.alt-load').forEach(b => {
    b.addEventListener('click', () => loadAlternateAsMain(Number(b.dataset.index)));
  });

  panel.hidden = false;
  requestAnimationFrame(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function loadAlternateAsMain(idx) {
  const a = state.alternates[idx];
  if (!a) return;

  state.baby      = { ...a.baby };
  state.codename  = a.codename;
  state.vibe      = a.vibe;
  state.futurePaths = a.paths || [];
  state.events    = a.events || [];
  state.archetype = a.archetype;

  $('#codename').textContent = state.codename;
  SLIDER_DEFS.forEach(def => {
    const slider = $('#s_' + def.key);
    if (slider) slider.value = a.baby[def.key];
  });
  updateBabyPreview();

  const babyPanel = document.querySelector('.baby-panel');
  if (babyPanel) babyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

function generateBabyFlavor(codename, baby) {
  const rng = seededRand(codename + '|flavor' + (state.chaos ? '|c' : ''));

  const vibe = FUNNY_TITLES[Math.floor(rng() * FUNNY_TITLES.length)];

  // Top personality dimension biases the future-path picks.
  const tagFor = {
    openness: 'O', conscientiousness: 'C', extraversion: 'E',
    agreeableness: 'A', neuroticism: 'N', athletic: 'athletic'
  };
  const top = Object.keys(tagFor)
    .map(k => ({ k, v: baby[k] || 0 }))
    .sort((a, b) => b.v - a.v)[0];
  const topTag = tagFor[top.k];

  // Weighted pick: matching-tag paths get a +1.0 weight bump.
  const weighted = FUTURE_PATHS.map(p => ({
    p, w: rng() + (p.tag === topTag ? 1.0 : 0)
  })).sort((a, b) => b.w - a.w);
  const paths = weighted.slice(0, 3).map(x => x.p.text);

  // 0–2 random events; chaos guarantees 2.
  const eventCount = state.chaos ? 2 : (rng() > 0.4 ? 1 : (rng() > 0.6 ? 2 : 0));
  const events = pickN(RANDOM_EVENTS, eventCount, rng);

  return { vibe, paths, events };
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
    `— Big Five personality (inspired by, not predictive of, real psychology) —`,
    `Openness:          ${b.openness}/10`,
    `Conscientiousness: ${b.conscientiousness}/10`,
    `Extraversion:      ${b.extraversion}/10`,
    `Agreeableness:     ${b.agreeableness}/10`,
    `Neuroticism:       ${b.neuroticism}/10`,
    `Athletic:          ${b.athletic}/10`,
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

  // Funny vibe + future paths + random events are derived from the codename so
  // they're stable for the lifetime of this baby (until next Generate).
  const flavor = generateBabyFlavor(state.codename, state.baby);
  state.vibe = flavor.vibe;
  state.futurePaths = flavor.paths;
  state.events = flavor.events;

  renderSurprise(state.surprise);
  updateBabyPreview();      // refresh display with new flavor

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

function randomizeParents() {
  ['A', 'B'].forEach(letter => {
    PARENT_FIELDS.forEach(f => {
      const el = $('#p' + letter + '_' + f.key);
      if (!el) return;
      let val;
      if (f.type === 'text') {
        val = FUN_NAMES[Math.floor(Math.random() * FUN_NAMES.length)];
      } else if (f.type === 'number') {
        val = Math.round(f.min + Math.random() * (f.max - f.min));
      } else if (f.type === 'range') {
        val = Math.floor(f.min + Math.random() * (f.max - f.min + 1));
      } else if (f.type === 'select') {
        val = f.options[Math.floor(Math.random() * f.options.length)];
      }
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });
}

/* ---------- Saved Timelines (localStorage) ---------- */

const SAVED_KEY = 'babyblend.saved.v1';
const MAX_SAVED = 12;

function loadSavedFromStorage() {
  try { const raw = localStorage.getItem(SAVED_KEY); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}

function persistSaved(list) {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch {}
}

function saveCurrentTimeline() {
  if (!state.codename) return;
  const list = loadSavedFromStorage();
  // Don't double-save the exact same baby; refresh its timestamp if identical.
  const dupeIdx = list.findIndex(e => e.codename === state.codename &&
    JSON.stringify(e.baby) === JSON.stringify(state.baby));
  if (dupeIdx !== -1) list.splice(dupeIdx, 1);
  list.unshift({
    id: 'baby-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    savedAt: Date.now(),
    parents: state.parents,
    baby:    { ...state.baby },
    codename: state.codename,
    vibe:     state.vibe,
    futurePaths: state.futurePaths,
    events:   state.events,
    archetype: state.archetype,
    style:    state.style,
    gender:   state.gender,
    chaos:    state.chaos,
    surprise: state.surprise
  });
  while (list.length > MAX_SAVED) list.pop();
  persistSaved(list);
  renderSavedList();
  const status = $('#copy-status');
  if (status) {
    status.textContent = 'Saved ✓';
    setTimeout(() => { if (status.textContent === 'Saved ✓') status.textContent = ''; }, 1800);
  }
}

function deleteTimeline(id) {
  const list = loadSavedFromStorage().filter(x => x.id !== id);
  persistSaved(list);
  renderSavedList();
}

function loadTimeline(id) {
  const list = loadSavedFromStorage();
  const entry = list.find(x => x.id === id);
  if (!entry) return;

  state.parents = entry.parents;
  ['A', 'B'].forEach(letter => {
    PARENT_FIELDS.forEach(f => {
      const el = $('#p' + letter + '_' + f.key);
      const v = entry.parents?.[letter]?.[f.key];
      if (el && v !== undefined) {
        el.value = v;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  });

  state.style  = entry.style  || 'lorelei';
  state.gender = entry.gender || 'surprise';
  state.chaos  = !!entry.chaos;
  $$('.style-btn').forEach(b => {
    const active = b.dataset.style === state.style;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  $$('.gender-btn').forEach(b => {
    const active = b.dataset.gender === state.gender;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  const chaosBtn = $('#chaos-btn');
  if (chaosBtn) {
    chaosBtn.setAttribute('aria-pressed', state.chaos ? 'true' : 'false');
    chaosBtn.classList.toggle('is-active', state.chaos);
  }

  state.ranges  = generateSliderRanges(state.parents);
  state.surprise = entry.surprise;
  state.codename = entry.codename;
  state.vibe = entry.vibe;
  state.futurePaths = entry.futurePaths || [];
  state.events = entry.events || [];
  state.archetype = entry.archetype;

  $('#codename').textContent = state.codename;
  renderSliders(state.ranges);
  SLIDER_DEFS.forEach(def => {
    const r = state.ranges[def.key];
    const v = entry.baby[def.key];
    if (typeof v === 'number') {
      const clamped = clamp(v, r.min, r.max);
      state.baby[def.key] = clamped;
      const slider = $('#s_' + def.key);
      if (slider) slider.value = clamped;
    }
  });
  renderSurprise(state.surprise);
  const results = $('#results');
  if (results.hidden) results.hidden = false;
  updateBabyPreview();
}

function renderSavedList() {
  const container = $('#saved-timelines');
  if (!container) return;
  const list = loadSavedFromStorage();
  if (list.length === 0) {
    container.hidden = true;
    container.innerHTML = '';
    return;
  }
  container.hidden = false;
  container.innerHTML = `
    <h3>Saved Timelines <span class="saved-count">${list.length}</span></h3>
    <div class="saved-list">
      ${list.map(e => `
        <div class="saved-entry" data-id="${e.id}">
          <div class="saved-text">
            <strong>${e.codename}</strong>
            <span class="saved-vibe">${e.vibe || ''}</span>
          </div>
          <div class="saved-actions">
            <button class="btn btn-tiny" data-action="load" data-id="${e.id}">Load</button>
            <button class="btn btn-tiny btn-danger" data-action="delete" data-id="${e.id}" aria-label="Delete">×</button>
          </div>
        </div>
      `).join('')}
    </div>`;
  container.querySelectorAll('[data-action="load"]').forEach(b => {
    b.addEventListener('click', () => loadTimeline(b.dataset.id));
  });
  container.querySelectorAll('[data-action="delete"]').forEach(b => {
    b.addEventListener('click', () => deleteTimeline(b.dataset.id));
  });
}

function setupChaosToggle() {
  const btn = $('#chaos-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.chaos = !state.chaos;
    btn.setAttribute('aria-pressed', state.chaos ? 'true' : 'false');
    btn.classList.toggle('is-active', state.chaos);
    // If a baby already exists, re-derive the slider ranges + surprise so the
    // chaos effect is felt immediately (clamping any current baby values into
    // the new range).
    if (state.codename) {
      state.ranges = generateSliderRanges(state.parents);
      state.surprise = computeSurprise(state.parents);
      const prev = { ...state.baby };
      renderSliders(state.ranges);
      SLIDER_DEFS.forEach(def => {
        const r = state.ranges[def.key];
        if (typeof prev[def.key] === 'number') {
          const v = clamp(prev[def.key], r.min, r.max);
          state.baby[def.key] = v;
          const slider = $('#s_' + def.key);
          if (slider) slider.value = v;
        }
      });
      renderSurprise(state.surprise);
      updateBabyPreview();
    }
  });
}

function init() {
  buildParentForms();
  setupPillToggle('.style-btn', 'style');
  setupPillToggle('.gender-btn', 'gender');
  setupChaosToggle();
  $('#randomize-parents-btn').addEventListener('click', randomizeParents);
  $('#generate-btn').addEventListener('click', generate);
  $('#randomize-btn').addEventListener('click', randomizeBaby);
  $('#reset-btn').addEventListener('click', resetBaby);
  $('#copy-btn').addEventListener('click', copyProfile);
  $('#save-btn').addEventListener('click', saveCurrentTimeline);
  $('#alternates-btn').addEventListener('click', generateAlternateTimelines);
  renderSavedList();
}

document.addEventListener('DOMContentLoaded', init);
