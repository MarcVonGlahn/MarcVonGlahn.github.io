# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Marc von Glahn (game engineer / indie developer), hosted on GitHub Pages. Static site with a minimal Node.js toolchain for SCSS compilation only.

## Development

**Serving locally:** Use a static file server (required for the async sidebar fetch to work):
```
npx serve .
python -m http.server 8000
```
Opening `index.html` directly as a `file://` URL will fail because `fetch('/assets/sidebar.html')` needs an HTTP origin.

**SCSS → CSS:**
```
npm install          # first time only — installs sass
npm run build:css    # compile once
npm run watch:css    # recompile on every save
```
`assets/sass/main.scss` is the authoritative source. Never edit `assets/css/main.css` by hand.

**Deploying:** `git push origin master` — GitHub Pages serves the repo automatically.

## Architecture

### Sidebar injection + timing

`assets/js/sidebar.js` fetches `assets/sidebar.html` asynchronously and injects it into `#header`, then dispatches a `sidebar:ready` CustomEvent. `main.js` wraps all its jQuery initialisation in `initMain()` and calls it only on `sidebar:ready`, preserving the timing contract without blocking the parser.

**Sidebar colors:** The sidebar background is `#12355d`. Active nav item icon (`span::before`) color is `#ffae00` (amber), set via `#nav ul li a.active span:before { color: #ffae00; }` in `main.scss`.

`index.html` is the single main page. Each project lives in `projects/<slug>.html`.

### Auto-generated in-page nav (project pages)

Project pages carry a `data-page="slug"` attribute on `<body>`. `sidebar.js` detects this (via `PROJECT_NAV` registry at the top of the file), scans all `<h2>` elements inside `#main .two`, slugifies them, and builds anchor links — no manual nav needed when adding sections.

### Project cards (data-driven)

All portfolio content lives in **`assets/js/projects-data.js`** as a plain `window.PROJECTS` array — one object per project. **`assets/js/project-cards.js`** reads that array and renders cards into `#portfolio .row` (featured projects) and `#other-projects .row` (all others) using the DOM API.

**To add a new project:**
1. Append one object to `window.PROJECTS` in `projects-data.js`.
2. Create `projects/<slug>.html` (copy an existing page as a template).
3. Add `data-page="<slug>"` to `<body>` and register the slug in `PROJECT_NAV` in `sidebar.js`.
4. Add project images to `images/`.

No HTML editing required for the card itself.

**Card column width and centering:**
`project-cards.js` assigns the column `class="col-4 col-12-mobile"`. The template's `col-4` defaults to 33.3% — ignore that number. The actual visual width is controlled by `_portfolio.scss`, which overrides it to **85% wide and centered** on desktop (90% at narrower ≤960px, 100% at mobile ≤736px). To adjust card width, only edit `_portfolio.scss` — do not touch `project-cards.js`.

> **Specificity trap to remember:** `#portfolio .row > .col-4` contains an ID selector (specificity 1,0,2), which silently beats the template's `.row > .col-12-mobile` (0,2,0) even inside a mobile media query. Whenever you scope a layout rule to a section ID, always add an explicit width reset inside `@include breakpoint('mobile')`, otherwise the mobile template class does nothing.

### Tech stack rendering (`assets/js/tech-library.js`)

`renderTechnologies(techs, showName)` maps tech-name strings to logos and returns an HTML string. To add a new technology, extend `techLibrary` in that file. All image paths use root-relative `/images/skillset/` so they resolve correctly from both `index.html` and `projects/*.html`.

**Two rendering contexts — do not confuse them:**

| Context | Container | How rendered | Size |
|---|---|---|---|
| Project pages (`projects/*.html`) | `<div id="tech-display">` | `document.getElementById("tech-display").innerHTML = renderTechnologies([...])` | 80px, names shown |
| Index cards (`index.html`) | `<div class="tech-rendered">` set by `project-cards.js` | `renderTechnologies(project.techs, false)` | 50px, no names |

The `.tech-rendered` CSS class in `_portfolio.scss` controls the smaller card variant. The `id="tech-display"` ID is for project pages only — these are intentionally different identifiers with different purposes.

**Skillset section (`#skillset` in `index.html`):**

The skillset grid is fully data-driven. An inline `<script>` at the bottom of `index.html` (after `project-cards.js`) reads `window.PROJECTS` from `projects-data.js`, counts how often each tech's image appears across all projects, then calls `renderTechnologies()` into `<div id="skillset-tech">` sorted by frequency descending. **To add a tech to the skillset, only edit `techLibrary` in `tech-library.js`** — no changes to `index.html` required.

### Key JS files

| File | Purpose |
|---|---|
| `sidebar.js` | Async sidebar injection + `sidebar:ready` event + project-page auto-nav |
| `main.js` | Responsive breakpoints, scroll effects (Scrollex/Scrolly), panel toggle — fires on `sidebar:ready` |
| `tech-library.js` | Tech icon mapping and `renderTechnologies()` |
| `projects-data.js` | Single source of truth for all project card data |
| `project-cards.js` | Card renderer — reads `projects-data.js`, writes DOM |
| `ue5-highlight.js` | Syntax highlighting for Unreal/C++ code blocks on project pages |

### Submodule

`assets/webgpu_project/` is a git submodule. Changes inside it require separate commits to that submodule.

## Writing & Portfolio Text Standards

These rules apply when reviewing or editing any prose on project pages (`projects/*.html`) or the main `index.html`.

### Grammar & style
- Write in **first person** throughout ("I built", "I integrated") — do not mix with second person ("your opponents").
- Use **third person** when referring to the player ("the player's position", not "your position").
- Avoid informal contractions and casual phrasing: no "gonna" (→ "going to"), no "dipped my toes into" (→ "integrated"), no "I am proud to say" (→ state the fact directly).
- Possessive "its" vs. contraction "it's": use "its" for possession ("its own singleton"), "it's" only for "it is".
- Comma before "that" in restrictive clauses is incorrect — remove it ("makes sure that", not "makes sure, that").
- Verb–subject agreement: a plural subject ("two Finite State Machines") takes a plural verb ("define", not "defines").

### Spelling checklist (recurrent mistakes found in this project)
| Wrong | Correct |
|-------|---------|
| devoloped | developed |
| developement | development |
| controling | controlling |
| continously | continuously |

### List punctuation
- All `<li>` items in a bulleted list must end with a period and be consistent within the list.

### Code explanations
- Never leave placeholder code blocks (`ExampleClassName`, `// Implementation details`) visible on a public page. Replace with real snippets or a `<p><em>Code examples for this section are coming soon.</em></p>` note.
- Broken or incomplete sentences before a code block are a clarity blocker — fix before any page is considered ready.
- When referring to engine features, use possessive apostrophes correctly: "Unreal Engine's Material Editor", "Unity's built-in UI system".
