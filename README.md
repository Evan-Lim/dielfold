# DielFold

**A minimalist, single-file, solar-locked waking-day accelerated clock designed for deep work with zero circadian drift.**

[![Live App](https://img.shields.io/badge/Live%20App-dielfold.netlify.app-38574A?style=flat-square)](https://dielfold.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-5C615A?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Frontend-Single--File%20HTML-38574A?style=flat-square)](#getting-started)

**Official Live App:** [https://dielfold.netlify.app](https://dielfold.netlify.app)  
**Author:** Evan Lim Hong Yan

Built with vanilla HTML, CSS, and JavaScript in a restrained Google Material Design 3 interface (default Light Mode with a Dark Mode toggle), DielFold keeps your 24-hour solar day and 8-hour sleep window intact while compressing waking hours into structured blocks of **53 minutes 20 seconds** ($9/8\times$).

---

## Table of Contents

- [Overview](#overview)
- [Default Dual-Seam Schedule](#default-dual-seam-schedule-t_0--0700-98times)
- [Clock Speed Presets](#clock-speed-presets)
- [Features](#features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Getting Started](#getting-started)
- [Technical Architecture & Privacy](#technical-architecture--privacy)
- [Research Background](#research-background)
- [Attribution & License](#attribution--license)

---

## Overview

Most "25-hour clock" proposals fail because they stretch the biological rest-activity cycle past $1{,}440$ minutes, causing rapid circadian phase drift. DielFold takes a different approach—**solar-locked temporal compression**:

- **Zero circadian drift:** Total day length stays fixed at exactly $86{,}400\text{ s}$ ($24\text{ h}$), and your 8-hour sleep window runs untouched at $1.00\times$ real time.
- **26 apparent hours (default):** Your 16 real waking hours ($57{,}600\text{ s}$) are partitioned into **18 compressed waking hours** of exactly $3{,}200\text{ s}$ ($53\text{m } 20\text{s}$), yielding 16 numbered work hours and 2 built-in daytime reset hours (**Seams**).
- **Minimax wall-clock alignment:** Rather than tucking bonus time at midnight or `-1:00 AM`, DielFold splits the waking day into two symmetric 8-real-hour arcs. This halves peak wall-clock offset to $53\text{m } 20\text{s}$ and forces exact `00:00:00` resynchronization twice daily.

### Default Dual-Seam Schedule ($t_0 = 07{:}00$, $9/8\times$)

| Phase | Clock Label | Real-World Window | Role |
|---|---|---|---|
| **Morning Arc** | `07:00` – `14:59` | `07:00:00` – `14:06:40` | 8 compressed work blocks spanning the morning alertness peak |
| **Midday Seam** | `+14:00` | `14:06:40` – `15:00:00` | Absorbs the post-lunch circadian dip; resyncs offset to `0m 00s` at `15:00:00` |
| **Evening Arc** | `15:00` – `22:59` | `15:00:00` – `22:06:40` | 8 compressed work blocks across the afternoon/evening rebound |
| **Twilight Seam** | `+22:00` | `22:06:40` – `23:00:00` | Absorbs pre-sleep cognitive drop-off as a structured shutdown buffer |
| **Sleep Lock** | `23:00` – `07:00` | `23:00:00` – `07:00:00` | Untouched $1.00\times$ solar sleep with a muted low-contrast UI state |

All timestamps automatically recalculate down to the second for any wake anchor $t_0 \in [05{:}00,\; 10{:}00]$.

---

## Clock Speed Presets

| Preset | Speed ($S$) | Hour Length ($L$) | Apparent Day | Seam Structure |
|---|---|---|---|---|
| **Optimal Dual-Seam** *(Default)* | $9/8\times$ ($1.125\times$) | $53\text{m } 20\text{s}$ ($3{,}200\text{ s}$) | 26 h (18 waking + 8 sleep) | Midday & Twilight Seams |
| **Stealth Single-Seam** | $17/16\times$ ($1.0625\times$) | $56\text{m } 28\text{s}$ ($3{,}388\text{ s}$) | 25 h (17 waking + 8 sleep) | Centered Midday Seam ($\pm 28\text{m } 14\text{s}$ max offset) |
| **Classic Solar 25h** | $25/24\times$ ($1.0417\times$) | $57\text{m } 36\text{s}$ ($3{,}456\text{ s}$) | 25 h full-day linear | 1 end-of-day surplus hour |
| **Classic Solar 26h** | $26/24\times$ ($1.0833\times$) | $55\text{m } 23\text{s}$ ($3{,}323\text{ s}$) | 26 h full-day linear | 2 end-of-day surplus hours |
| **Control 24h** | $1.000\times$ | $60\text{m } 00\text{s}$ ($3{,}600\text{ s}$) | 24 h standard | A/B benchmark baseline |
| **Custom Waking Speed** | $1.000\times$ – $1.250\times$ | $60\text{m } 00\text{s}$ – $48\text{m } 00\text{s}$ | Variable | Flags speeds $> 1.20\times$ (Weber detection ceiling) |

---

## Features

### Minimalist Main Stage
- **Calm Desk-Instrument Layout:** Centered `500px` focal stage featuring the arc status pill, fixed-width `HH:MM:SS` readout (`tabular-nums`, thin Inter weights `200`–`500`), secondary wall-time/offset line, and a `2px` hairline hour progress bar.
- **One-Key Focus Mode (`H`):** Fades out the standard 24-hour wall reference to prevent dual-clock mental conversion from breaking numerical anchoring.
- **Light & Dark Themes (`D`):** Neutral-tonal Material Design 3 surfaces with zero gradients and crisp contrast across both modes.
- **Contextual Triggers Only:** Secondary controls stay off-screen until relevant:
  - **External Hard-Stop Pill:** Invisible until $\le 10$ real minutes remain before a pinned deadline.
  - **Seam Ritual Line:** Surfaces only during the Midday or Twilight Seam with an editable intention field.
  - **60-Second Loop-Closure Input:** Appears during the final compressed minute of a work hour to park your next action and clear attention residue.
  - **Active Micro-Sprint Pill:** Appears compactly below the progress bar only while a sub-timer is active.

### Collapsible M3 Side Sheet
1. **Schedule (`T`):** Live **Reclaimed Buffer Bank** tracking real minutes saved today alongside a complete conversion table with exact second-level start/end times and active-row highlighting.
2. **Tools (`M`):**
   - **External Hard-Stop Pin** for real-world lectures, calls, or appointments.
   - **Nested Micro-Sprint Timer** (`12m/3m` shallow sprints and `24m/6m` structured sprints) with optional **Adaptive Mercurial Mode** ($1.125\times$ focus pacing / $0.92\times$ restorative break pacing).
   - **Seam Ritual Prompts** editor and **Loop-Closure Scratchpad** history.
3. **Telemetry (`L`):** Lightweight 1–5 Focus and Fatigue rating logger tagged with active preset, speed, and block label, plus one-click **CSV** and **JSON** export for personal A/B evaluation.
4. **Settings (`S`):** Wake anchor selector (`05:00`–`10:00` in 15-minute increments), speed presets, custom speed slider, subtle colon breath toggle, and 12-hour/24-hour wall reference toggle.

### Built-In Guide
- Press `G` or click the top-bar book icon to open a plain-English **How DielFold Works** modal explaining the apparent day length, Seam structure, and daily workflow.

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `G` | Open / close Layperson Guide |
| `H` | Toggle Focus Mode (hide wall clock) |
| `D` | Toggle Light / Dark Theme |
| `T` | Open Schedule & Buffer Bank |
| `M` | Open Tools & Micro-Sprint Timer |
| `L` | Open Telemetry & Log Block Rating |
| `S` | Open Settings & Speed Presets |
| `?` | Open Keyboard Shortcuts Dialog |
| `Esc` | Close open Drawer or Dialog |

---

## Getting Started

The entire DielFold application lives inside a single self-contained `index.html` file with zero frontend frameworks, build steps, or client-side dependencies.

### Use Online
Visit the official deployment directly at **[https://dielfold.netlify.app](https://dielfold.netlify.app)**.

### Run Offline (Zero Setup)
1. Clone or download this repository.
2. Open `index.html` directly in any modern desktop or mobile browser.

### Run Locally with Node.js (Optional Dev Server)
If you prefer serving `index.html` over HTTP locally:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Deploy as a Static Site
Upload `index.html` by itself to any static host (Netlify, GitHub Pages, Cloudflare Pages, or Vercel)—no build step or server configuration is required.

---

## Technical Architecture & Privacy

- **Zero-Drift Clock Engine:** Computes compressed time deterministically via modular arithmetic over $86{,}400\text{ s}$ anchored to `Date.now()`, eliminating cumulative interval drift.
- **Targeted 50ms DOM Updates:** Caches previously rendered display strings and mutates only changed text nodes to prevent layout shifts and animation flickering.
- **Local-First Privacy:** All preferences, rituals, scratchpad notes, and telemetry logs are stored exclusively in browser `localStorage`. No accounts, trackers, analytics, or external API calls are made beyond loading Google Fonts (`Inter` and `Material Symbols Outlined`).

---

## Research Background

DielFold's default speed ($9/8\times$, $L = 3{,}200\text{ s}$) and dual-seam placement are derived from a multi-objective synthesis of chronobiology, duration psychophysics, and cognitive ergonomics:

- **Circadian Entrainment:** Keeping day length locked at $1{,}440\text{ min}$ avoids the intrinsic $\sim 24.18\text{ h}$ pacemaker drift observed under extended schedules (Czeisler et al., 1999; Scheer et al., 2007).
- **Perceptual Stealth & Pacing:** Balances Parkinson's Law time-container gains (Bryan & Locke, 1967) and external clock-speed pacing (Ban et al., 2015; Thönes et al., 2018; Laera et al., 2024) against the $10\%\text{--}20\%$ Weber duration-discrimination band (Grondin, 2001, 2014).
- **Deep-Work Floor & Breaks:** Preserves $> 30\text{ min}$ of immersion past the $23\text{m } 15\text{s}$ context-switch ramp-up cost (Mark et al., 2008; Leroy, 2009), stops before the $\sim 55\text{m}$ vigilance drop (Warm et al., 2008), and offers optional $12/3$ and $24/6$ systematic micro-sprints (Biwer et al., 2023).
- **Circadian Seam Placement:** Aligns Seam I with the post-lunch alertness dip (Monk, 2005; Valdez, 2019) to create a repeatable midday Fresh Start reset (Dai et al., 2014).

---

## Attribution & License

Created by **Evan Lim Hong Yan** — [https://dielfold.netlify.app](https://dielfold.netlify.app).

Licensed under the **MIT License** — see [`LICENSE`](LICENSE) for full terms. Any redistribution, fork, or hosted derivative must retain the original copyright notice and license terms.