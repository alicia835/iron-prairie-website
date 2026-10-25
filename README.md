## Iron Prairie Website

Production marketing, e-commerce storefront, and operations suite for **Iron Prairie Fabrication Group LLC** – a woman-owned custom metal fabrication shop and ASME B16.48 paddle blind manufacturer serving Texas and nationwide.

- **Live Custom Domain**: [https://ironprairiefabrication.com](https://ironprairiefabrication.com)
- **Firebase Staging**: [https://iron-prairie-website.web.app](https://iron-prairie-website.web.app)
- **Operations & MTR Suite**: `/operations`

### Repository & Cloud Infrastructure (Method B Architecture)

- **GitHub Repository**: [alicia835/iron-prairie-website](https://github.com/alicia835/iron-prairie-website)
- **GitHub Asset Owner**: Alicia (`alicia835`)
- **Authorized Technical Contributor**: Universal Dynamic Consulting Services LLC (`Michaelh-UDCS` / `michael@universal-dynamic.com`)
- **Firebase Cloud Project**: `iron-prairie-website` (Project #786531503671)
- **Firebase Project Owner**: `alicia@ironprairiefabrication.com`
- **Firebase Authorized Editor**: `michael@universal-dynamic.com` (CLI deploy, functions, and maintenance)

### Getting Started

From a terminal in this folder:

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Desktop Shortcuts & Demo Launcher (Windows)

Two Desktop shortcuts are configured on your Windows Desktop:
- **`Iron Prairie Website.lnk`**: Starts the live Vite dev server with hot reload and opens the marketing website (`http://localhost:5173`) in your browser.
- **`Iron Prairie Operations.lnk`**: Launches directly into the ASME MTR Material Traceability & Operations Suite (`http://localhost:5173/operations`).

To regenerate or restore desktop shortcuts anytime, simply run:
```bash
npm run shortcut
```

### Pages

- **Home** - Hero section with capabilities and quick links for agriculture/ranch, industrial/O&G, and public-sector buyers.
- **About** - Shop story, operating approach, and service area overview.
- **Services** - Core service groups for CNC plasma cutting/welding, gates/fences, custom agricultural fabrication, blinds, and public-sector/O&G support.
- **Projects** - Example project cards aligned to target markets (replace with real project data as jobs are completed).
- **Woman-Owned** - Highlights woman-owned status, procurement readiness, and certification placeholders.
- **Contact** - Quote-request form UI (local demo only) with market and agency-oriented intake fields.

### Notes

- The contact form does **not** send data anywhere yet. It is only a local UI until we connect it to email or a backend.
- The design uses a warm, country-relaxed palette inspired by the Iron Prairie logo. Colors and copy can be tuned based on feedback.
- Procurement support messaging includes SAM.gov readiness goals and agency support intent; publish finalized identifiers/certifications once available.

