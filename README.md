# portfolio.muneezahmed.com

Netflix-style marketing portfolio for Muneez Ahmed, exported from Figma Make
(original design: https://www.figma.com/design/aN1LydqG8iw7q55PcWaivE/portfolio.muneezahmed.com).

Live: https://portfolio.muneezahmed.com (deployed on Vercel from the `main` branch).

## Develop

```bash
npm install
npm run dev     # local dev server
npm run build   # production build to dist/
```

## Structure

- `src/app/App.tsx` – entry: loader → profile picker → profile pages
- `src/app/components/` – profile pages, NavBar, data files (`*PortfolioData.ts`, `searchData.ts`)
- `src/app/components/emailService.ts` – EmailJS lead capture
- `src/assets/` – images imported as `figma:asset/<hash>.png` (resolved in `vite.config.ts`)
- `public/` – static files (CV PDF)
