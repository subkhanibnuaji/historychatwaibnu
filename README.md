# historychatwaibnu

Project Next.js + TypeScript + Tailwind CSS untuk layanan chat / komunikasi.
Dibuat scalable agar bisa dikembangkan lebih kompleks ke depannya.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Deploy:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
next build
```

## Project Structure
```
src/
  app/          → Routing & pages
  components/   → Reusable UI components
  lib/          → Utility functions & helpers
  hooks/        → Custom React hooks
  types/        → Global TypeScript types
public/         → Static assets
```

## Deployment
- Auto-deploy ke Vercel saat push ke `main` / `master`.
- Lihat `DEPLOYMENT_RULES.md` untuk detail lebih lanjut.

## To-Do / Next Steps
- [ ] Setup database (PostgreSQL / Supabase / PlanetScale)
- [ ] Auth system (NextAuth / Clerk)
- [ ] Real-time chat (Pusher / Socket.io / Ably)
- [ ] File upload (Cloudflare R2 / AWS S3)
