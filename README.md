# Sharmory: Developer's Arsenal

AI Agent Prompt — Brutalist Developer Website

I want you to build a crazy-good, production-quality landing website for this app.

The visual direction is:

Brutalist × Minimalist × Developer Tool × Experimental × Premium

Think Developer's Armoury / hacker workstation / modern developer utility, but do NOT simply copy an existing website. Take the aesthetic as inspiration and create an original identity.

Tech Stack

Use:

React

Vite

Tailwind CSS

Modern CSS animations/transitions

Framer Motion or another lightweight animation library where genuinely useful

Keep the application fast, responsive, accessible, and production-ready.

Avoid unnecessary dependencies.

Design Direction

I want the site to immediately feel like:

"Holy shit, this developer actually cared about the interface."

Use a brutalist visual language, but keep it sophisticated rather than ugly.

Visual characteristics

Strong typography

Large, confident headlines

Tight spacing where appropriate

High contrast

Sharp edges mixed with occasional subtle rounding

Thin borders

Grid-based layouts

Monospace typography for technical elements

Oversized numbers / labels

Technical metadata

Subtle noise/grain

Small UI indicators

Unexpected layout compositions

Asymmetry

Layered elements

Strong hover states

Minimal but intentional color palette

Lots of whitespace

Occasional full-bleed sections

The website should feel like a piece of software, not a generic SaaS marketing template.

Avoid:

Generic SaaS gradients

Stock illustrations

Corporate-looking cards everywhere

Excessive rounded rectangles

Generic "AI startup" aesthetics

Huge blobs

Overly polished Apple-style minimalism

Cookie-cutter Tailwind landing page designs

Animation & Interaction

This is one of the most important parts.

The site should feel alive.

Use animation extensively, but make it intentional.

Include things like:

Smooth page-load sequence

Staggered text reveals

Scroll-triggered animations

Parallax movement

Elements subtly moving at different scroll speeds

Magnetic buttons

Cursor-following effects where appropriate

Hover distortion

Image/text reveal masks

Number counters

Animated borders

Marquee/ticker elements

Scroll progress indicators

Subtle background movement

Section transitions

Microinteractions on buttons

Icon transformations

Interactive cards

Terminal/code animations

Elements reacting to mouse position

Smooth hover transitions

Subtle scale/translate effects

However:

DO NOT animate everything just because you can.

Animation should create hierarchy, depth, and personality.

The website must still feel fast.

Respect prefers-reduced-motion.

Hero Section

Make the hero immediately impressive.

Do NOT create a boring:

"Build better X with our powerful platform."

Instead, create a visually striking developer-oriented hero.

Consider elements such as:

Massive headline typography

Technical metadata

Terminal-style UI

Animated system status

App preview

Code snippets

Floating UI fragments

Version/build information

Interactive background grid

Coordinates / timestamps / system indicators

Animated accent elements

The hero should communicate what the app actually does within seconds.

The primary CTA should be extremely obvious.

The secondary CTA can be something like GitHub / Documentation / Explore / Demo depending on the app.

Page Structure

Build a complete landing page rather than only a hero.

Suggested structure:

Navigation

Hero

Problem / Why this exists

Core capabilities

Interactive product showcase

Technical / developer section

Feature breakdown

Workflow / how it works

Stats / proof points

CTA

Footer

You can change, remove, or reorder sections if you have a better design idea.

Use your judgment.

I care more about the final experience than following this exact structure.

Developer Aesthetic

Lean heavily into the idea that this is a tool made by developers, for developers.

Use visual language inspired by:

Terminals

CLI output

Git

GitHub

System dashboards

Network diagrams

Logs

Command palettes

Developer tooling

File systems

IDEs

Infrastructure

Debug consoles

But keep everything visually clean.

For example, instead of a generic feature card:

Powerful Automation

consider something like:

[01] AUTOMATION
────────────────────────
$ execute --workflow
  ✓ initialized
  ✓ dependencies loaded
  ✓ workflow complete

27 operations automated


This is just an example. Invent better variations.

Layout

Do not make every section look like:

[ Card ][ Card ][ Card ]
[ Card ][ Card ][ Card ]


Use interesting compositions.

Mix:

Full-width sections

Split layouts

Overlapping elements

Large typography

Horizontal scrolling areas

Sticky sections

Asymmetric grids

Floating elements

Dense technical panels

Large empty spaces

Create a visual rhythm.

Responsive Design

The experience must be excellent on:

Desktop

Laptop

Tablet

Mobile

Do not simply shrink the desktop layout.

Design intentional mobile compositions.

Animations should also be optimized for mobile.

Performance

This is extremely important.

The site should feel instant.

Optimize for:

Fast initial load

Minimal JavaScript

Lazy-loaded assets

Efficient animations

GPU-friendly transforms

Avoiding expensive scroll handlers

Avoiding unnecessary re-renders

Proper image optimization

Minimal dependencies

Do not sacrifice performance for visual effects.

Code Quality

Write clean, maintainable React.

Use:

Reusable components

Logical component boundaries

Semantic HTML

Accessible buttons/links

Proper responsive utilities

CSS variables/design tokens where useful

Consistent naming

No giant monolithic component

Avoid unnecessary abstraction.

Don't build an enterprise architecture for a landing page.

Creative Freedom

This is important:

Don't play it safe.

I am explicitly asking you to experiment.

If you think a section would look significantly better with:

A crazy transition

Horizontal scrolling

A giant typographic element

A terminal animation

An unusual grid

Interactive cursor behavior

A dramatic section transition

An unconventional navigation

A WebGL/canvas effect

A clever visual metaphor

then do it.

But always ask:

Does this make the product feel more memorable?

If yes, explore it.

Final Quality Bar

The final website should feel like something that could be featured on:

Awwwards

Godly

Minimal Gallery

SiteInspire

while still being a real developer product website rather than a design experiment.

It should feel:

fast + technical + brutalist + premium + playful + memorable.

Before finishing:

Check every section visually.

Check mobile responsiveness.

Check all animations.

Check hover/focus states.

Check accessibility.

Check console errors.

Check for unnecessary dependencies.

Check performance.

Remove anything that feels generic.

Polish the tiny details.

Do not stop at "it works."

Keep iterating until it feels designed.









"Before designing anything, inspect the entire repository and understand the actual product. This is Sharmory — a collection of developer-focused shell and PowerShell utilities. Use the real commands, categories, README, and functionality as inspiration for the UI and visual storytelling. The 'Developer's Armoury' concept should be a core part of the identity: think arsenal, loadouts, tools, command inventory, terminal culture, Unix/Linux, and technical schematics — interpreted creatively and tastefully, not literally. Don't make this look like a generic SaaS landing page." See attached zip for more info

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
