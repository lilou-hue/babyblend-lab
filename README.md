# BabyBlend Lab

A fictional, genetics-inspired baby trait simulator. Enter two parents' traits and
explore a playful range of possible baby profiles — including hair, eyes, skin,
freckles, dimples, a "genetic surprise" factor, and a personality archetype.

The avatar uses the [DiceBear](https://www.dicebear.com/) **Lorelei** and
**Big Smile** illustrated styles, with every trait slider mapped to a visible
parameter (color, variant, head shape, background, mouth expression, rotation, etc.).

**Not real medical or genetic advice.** Real traits are shaped by many genes,
environment, chance, culture, health, and life experience. This is a what-if
toy, not a prediction.

## Run locally

It's plain HTML / CSS / JS — open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

The DiceBear avatar libraries are loaded from `esm.sh` at runtime, so an internet
connection is required for the avatar to render.

## Files

- `index.html` — markup
- `style.css` — dark "futuristic genetics lab" styling
- `script.js` — parent form rendering, slider-range generation from parents,
  archetype scoring, avatar wiring (DiceBear)
