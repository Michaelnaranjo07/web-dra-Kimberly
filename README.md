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

### Auth (Supabase)

1. Crea un proyecto en [Supabase](https://supabase.com/dashboard)
2. Copia URL y `anon` / publishable key a `.env`:

```bash
cp .env.example .env
```

3. En **Authentication → Users → Add user**, crea el admin (email + password). Marca **Auto Confirm User** para poder entrar sin correo.
4. En **Authentication → Providers → Email**, deja Email habilitado. Si no quieres signup público, desactiva “Enable sign ups”.
5. En Vercel, añade las mismas vars: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

## Deploy Vercel

1. Importar el repo
2. Framework: Vite
3. Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
4. Deploy
