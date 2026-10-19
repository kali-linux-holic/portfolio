# 匠 Takumi — Architectural & Creative Technologist Portfolio

A bespoke, deeply handcrafted developer portfolio inspired by Japanese minimalist architecture, tactile stationery, and distributed engineering craft.

Built specifically to **avoid every generic AI portfolio cliché** (no neon glow gradients, no fake percentage bars, no template buzzwords).

---

## ✦ Key Architectural Features

1. **Tactile Washi & Sumi-e Theme**:
   - Natural washi paper background with subtle physical grain overlay.
   - Dual-theme toggle: **Washi (Warm Stone/Paper)** ↔ **Sumi-e (Japanese Ink Wash / Charcoal)**.

2. **Web Audio API Tactile Sound Engine**:
   - Zero external audio files or network requests.
   - Synthesizes organic bamboo clacks, suikinkutsu water droplet chimes, and wooden seal thuds using native browser oscillators.
   - Muted by default with a quick toggle in the navbar.

3. **Karesansui Interactive Zen Sandbox (`ZenCanvas.jsx`)**:
   - Pure HTML5 Canvas 2D with sinusoidal sand rake wave mathematics.
   - Cursor movement and touch generate harmonic sand ripples.
   - 3 interactive zen stones (`Kanso`, `Shizen`, `Ma`) that echo ripples and trigger high chimes when tapped.

4. **Interactive Distributed Architecture Lab (`DevLab.jsx`)**:
   - A live interactive pipeline simulator demonstrating full-stack & systems engineering:
     - Edge CDN (TLS 1.3 / HTTP/3)
     - Wasm Rate Limiter & Token Bucket
     - Redis In-Memory Caching (Hit vs Cold Start Miss)
     - Go Ingestion Microservice & Ring Buffer
     - PostgreSQL Read Replica
   - Features interactive packet dispatch, traffic spike simulation (10k req/s), and real-time telemetry readouts (P99 SLA, memory, latency).

5. **Architectural Folios & Case Studies (`Projects.jsx` & `ProjectModal.jsx`)**:
   - Structured engineering case studies with context, problems, architecture solutions, and measurable performance benchmarks.
   - Filterable categories: All, Creative Dev & WebGL, Systems & Cloud, Frontend Architecture.

6. **Engineering Manifesto (`Craft.jsx`)**:
   - 4 foundational tenets: *Kanso* (Simplicity), *Shizen* (Naturalness), *Taikyu* (Durability), and *Ma* (Negative Space).
   - Production tech matrix detailing real production depth and context.

7. **Stationery Letterpad & Personal Hanko Seal (`Contact.jsx`)**:
   - Imprints a personalized Hanko seal (`印`) upon submitting a message.
   - 1-click email copy with instant feedback.
   - Live Indian Standard Time (IST) clock with seconds sync.

8. **Command Palette (`Cmd + K` / `Ctrl + K`)**:
   - Keyboard navigation, jump to sections, toggle themes, or activate the Architectural Blueprint wireframe grid.

9. **Live In-Browser Folio Customizer (`CustomizeDrawer.jsx`)**:
   - Click the "Customise Folio" button in the bottom right corner to live-preview changes to your name, Hanko seal, title, email, and location.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Washi Palette
- **Typography**: Cormorant Garamond, Shippori Mincho, Plus Jakarta Sans, JetBrains Mono
- **Audio**: Web Audio API (Synthesized oscillators)
- **Icons**: Lucide React + Bespoke SVGs

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📝 Customizing Your Personal Details

Simply open [src/data/portfolioData.js](file:///c:/Users/sv054/Desktop/portfolio/src/data/portfolioData.js) and update:
- `personal.name`: Your name
- `personal.kanjiName`: Your personal monogram / seal character
- `personal.title`: Your engineering focus
- `personal.email`: Your direct email address
- `personal.github`, `twitter`, `linkedin`: Your social profiles
- `projects`: Your real-world case studies and project URLs
