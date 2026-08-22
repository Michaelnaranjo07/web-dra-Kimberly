# Clínica Dra. Kimberly Martinez

Sitio web odontológico con panel de administración para secciones dinámicas y SEO.

## Dirección visual

**Propuesta A (activa):** blanco limpio + azul médico, ritmo inspirado en [Enlace Colombia](https://www.enlacecolombia.org/).  
Ver las 3 propuestas en `.cursor/docs/propuestas.md`.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- React Router
- Vercel (SPA)

## Desarrollo

```bash
npm install
npm run dev
```

- Sitio: http://localhost:5173
- Admin: http://localhost:5173/admin/login
- Password: `kimberly-admin` (o `VITE_ADMIN_PASSWORD`)

## Deploy Vercel

1. Importar el repo
2. Framework: Vite
3. Env: `VITE_ADMIN_PASSWORD`
4. Deploy
