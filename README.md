# Bloom Globe

Bloom Globe is a month-first flower-season travel web app built with Next.js, React, TypeScript, and Tailwind CSS.

Instead of starting with destinations or booking flows, the product starts with a month and helps users discover where flowers are blooming around the world, compare destinations, and save ideas to a local wishlist.

## MVP Features

- Month-first homepage with a seasonal hero section
- Interactive world bloom map with destination markers
- Filters for month, flower type, and region
- Destination detail panel with bloom timing and travel notes
- "Recommended This Month" shortlist
- Wishlist saved in `localStorage`
- Realistic mock data for 16 bloom destinations

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Design Direction

Bloom Globe is designed to feel:

- elegant
- soft
- seasonal
- romantic
- modern
- visually clean

The UX is intentionally centered on bloom timing and trip inspiration rather than hotel-search or booking patterns.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Build for production

```bash
npm run build
```

### 4. Start the production server

```bash
npm run start
```

## Project Structure

```text
BloomGlobe/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── bloom-globe-app.tsx
│   ├── bloom-map.tsx
│   ├── destination-detail-panel.tsx
│   ├── filter-bar.tsx
│   ├── hero-section.tsx
│   ├── month-selector.tsx
│   ├── recommended-section.tsx
│   └── wishlist-strip.tsx
├── hooks/
│   └── use-local-storage.ts
├── lib/
│   ├── mock-data.ts
│   ├── types.ts
│   └── utils.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Data Model

Each bloom destination includes:

- destination name and country
- world region
- flower type
- bloom months
- peak months
- map coordinates
- short and long descriptions
- travel tip and signature experience
- decorative image gradient values for the UI

## Current Scope

This repository contains the first MVP version with mock content and a custom stylized map layer.

Possible next steps:

- replace the stylized map with a geographic globe or richer GIS map
- add search and sorting
- introduce destination pages with routing
- connect real bloom-season datasets or editorial CMS content
- add user accounts and cloud-synced wishlists

## Repository

GitHub: [Jasmine-Zhuang/BloomGlobe](https://github.com/Jasmine-Zhuang/BloomGlobe)
