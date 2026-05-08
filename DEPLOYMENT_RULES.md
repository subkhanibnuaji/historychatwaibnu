# Deployment Rules — historychatwaibnu

## Platform
- **Vercel** (primary)
- Region: `sin1` (Singapore)

## Branches
- `main` / `master` → Production auto-deploy
- Semua branch lain: Preview deploy otomatis

## Commands
```bash
# Local dev
npm run dev

# Build (prod)
next build

# Lint
npm run lint
```

## Environment Variables
Tambahkan di Vercel Dashboard → Project Settings → Environment Variables.
Prefix dengan `NEXT_PUBLIC_` jika perlu di browser.

## Checklist Sebelum Deploy
- [ ] `npm run build` sukses lokal
- [ ] Tidak ada error lint (`npm run lint`)
- [ ] Environment variables sudah di-set di Vercel (jika ada)
- [ ] Perubahan sudah di-commit & push ke GitHub

## Notes
- Jangan hardcode secret/API key di source code.
- Gunakan `next.config.ts` untuk konfigurasi build.
- Static assets simpan di `public/`.
