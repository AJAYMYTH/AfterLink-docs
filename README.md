# AfterLink Documentation Website

[![Astro](https://img.shields.io/badge/Astro-v5.0-ff5a00?style=flat-square&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescript.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Welcome to the official documentation repository for **AfterLink**, a high-performance binary protocol designed for ultra-low latency persistent socket connections, native pub/sub routing, and automatic schema validation compressed into a compact 10-byte binary header.

This website serves as the developer documentation, specifications, API guides, and interactive spec explorer hub for AfterLink.

---

## 🔗 Repository Ecosystem

To explore the entire AfterLink environment, visit the corresponding repositories:

*   **⚡ Parent Protocol Engine (Core):** [AJAYMYTH/AfterLink](https://github.com/AJAYMYTH/AfterLink.git) — Holds the core protocol parser, TypeScript client/server engines, and benchmarking suites.
*   **📚 Documentation Hub (This Repo):** [AJAYMYTH/AfterLink-docs](https://github.com/AJAYMYTH/AfterLink-docs.git) — The Astro-powered responsive documentation website.
*   **🤖 AI Agent Skill Repository:** [AJAYMYTH/afterlink-skill](https://github.com/AJAYMYTH/afterlink-skill) — AI agent actions, integrations, and tools designed for the `skills.sh` ecosystem to bootstrap AfterLink protocol configurations instantly.

---

## 🎨 Premium Visual Elements Implemented

The documentation website is built with a dark theme aesthetic, dynamic layouts, and premium user interface animations:

*   **🌌 High-Performance Stars Backdrop:** A custom Canvas-based drifting stars layer equipped with spring-damper cursor parallax and dynamic particle scaling. Responsive theme observers smoothly fade the stars in and out during dark/light mode toggles.
*   **✨ Choreographed Staggered Loading:** The landing page utilizes staggered entrance animations with lens-focus blur shifts (`blur(4px)` to `blur(0)`) running on a high-fidelity deceleration curve (`cubic-bezier(0.16, 1, 0.3, 1)`).
*   **🌀 Looping Organic Auroras:** Dual-gradient blurred color fields (cyan and blue) continuously drift and scale in opposition beneath the text, providing dynamic visual depth.
*   **📊 Styled Comparison Badges:** Replaced system-default emojis in the Protocol Comparison table with modern, responsive custom SVG icon tags (Yes, No, Warning/Partial) styled matching the site's dark palette.
*   **⚙️ 10-Byte Spec Explorer centerpiece:** An interactive byte-level visualizer where hovering or focusing on different header segments dynamically reveals its technical specs.
*   **📱 Adaptive Mobile Dropdown:** A collapsible, GPU-accelerated dropdown menu for seamless mobile screen navigation that auto-collapses on clicking outside.

---

## 🚀 Getting Started

Follow these steps to run the documentation website locally:

### 1. Prerequisites
Make sure you have Node.js (v18.x or higher) and npm installed.

### 2. Clone the Repository
```bash
git clone https://github.com/AJAYMYTH/AfterLink-docs.git
cd AfterLink-docs
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:4321`.

### 5. Compile the Production Build
To check type safety, linting, and compile the fully static, performance-optimized build:
```bash
npm run build
```
Static files will be generated inside the `/dist` directory.

---

## 📂 Project Structure

```
AfterLink-docs/
├── public/                 # Static assets (Favicons, webmanifests, vector icons)
├── src/
│   ├── assets/             # Images and background graphics
│   ├── components/         # Reusable Astro & React components
│   │   ├── backgrounds/    # Canvas-based StarsLayer React component
│   │   ├── Navbar.astro    # Responsive floating navbar
│   │   └── FrameVisualizer.astro # Interactive binary frame viewer
│   ├── layouts/            # Layout wrappers
│   │   ├── BaseLayout.astro  # Primary layout (Favicons & Meta)
│   │   └── DocsLayout.astro  # Sticky dual-column docs sidebar layout
│   ├── pages/              # Astro routing controllers
│   │   ├── docs/           # Documentation markdown / page files
│   │   ├── 404.astro       # Custom glowing 404 error page
│   │   ├── 500.astro       # Custom high-contrast 500 error page
│   │   ├── contact.astro   # FormSubmit AJAX contact configuration
│   │   └── index.astro     # Landing page with staggered/looping animations
│   └── styles/
│       └── global.css      # Core styling rules and theme variable mapping
├── astro.config.mjs        # Astro configuration file
├── tsconfig.json           # TypeScript configuration compiler rules
└── package.json            # Node project dependency manifests
```

---

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
