# Mayank Portfolio Sanity Studio

Headless Content Management Studio for Mayank Sahu's Portfolio Website.

## Project Details
- **Project ID**: `j62dpz1x`
- **Dataset**: `production`
- **Connected Frontend**: Next.js App Router Portfolio (`src/lib/sanity/`)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start Sanity Studio locally:
```bash
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) in your browser.

3. Import current portfolio data into production dataset:
```bash
npx sanity dataset import data/portfolio-seed.ndjson production
```

4. Deploy Sanity Studio to the cloud:
```bash
npm run deploy
```
