# Zrnko

Učící aplikace s krátkými lekcemi a kvízy. Běží zdarma na GitHub Pages a každé ráno si sama přidá 2 nové lekce.

## Soubory
- `index.html` – aplikace
- `lessons.js` – ručně psané lekce a cesty
- `art.js` – ilustrace a schémata
- `daily.json` – lekce, které každý den přidává generátor (needituj ručně, jen mazat můžeš)
- `topics.json` – zásobník témat pro generátor; přidávej sem vlastní témata ve tvaru `{"cat":"veda","t":"Název tématu"}`
- `scripts/generate.mjs` – generátor
- `.github/workflows/zrnko.yml` – plán spouštění (každý den v 5:13 UTC) a zveřejnění

## Nastavení
1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Actions → „Zrnko – nové lekce a zveřejnění“ → **Run workflow** (první ruční spuštění).

Počet lekcí za den změníš v `.github/workflows/zrnko.yml` u `ZRNKO_PER_DAY` (1 až 5).
