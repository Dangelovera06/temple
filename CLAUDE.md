# TempleAI — Food Ingredient Scanner App

## What this app is
A mobile-first food scanner app that:
- Scans product barcodes via camera
- Analyzes ingredients for bad oils, additives, and preservatives
- Gives an A-E health score powered by Claude Haiku AI
- Suggests better food alternatives
- Tracks daily calorie intake
- Uses Google/email login via Supabase

## Tech Stack
- React 18 + Vite + Tailwind CSS + shadcn/ui
- Supabase (auth + database)
- Claude Haiku API via Netlify serverless function
- Open Food Facts API (free, no key needed)
- Deployed at: https://templeai.netlify.app

## Project Structure
```
src/
  pages/      - Home, Scan, ProductDetail, Tracker, History, Auth
  components/ - HealthScore, IngredientFlag, NutritionCard, BottomNav
  lib/        - supabase.js, claudeAPI.js, openFoodFacts.js, ingredientAnalysis.js
netlify/
  functions/  - analyze.js (Claude Haiku serverless function)
```

## Env Vars needed (.env file — never commit this)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
```

## Supabase Tables
- `scan_cache` — caches Claude analysis per barcode
- `calorie_logs` — per-user daily food log

## Dev Commands
```bash
npm install
npm run dev      # local dev server
npm run build    # production build
```

## GitHub
https://github.com/Dangelovera06/temple
