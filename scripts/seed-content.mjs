#!/usr/bin/env node
/**
 * Aplica schema + seed de site_content en el proyecto remoto.
 * Requiere SUPABASE_SERVICE_ROLE_KEY en .env (Settings → API → service_role).
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

function loadEnv() {
  const path = resolve(process.cwd(), '.env')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const i = trimmed.indexOf('=')
    if (i < 0) continue
    const key = trimmed.slice(0, i).trim()
    const value = trimmed.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnv()

const url = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const contentPath = resolve(process.cwd(), 'scripts/default-content.json')

if (!url || !serviceKey) {
  console.error(`
Falta SUPABASE_SERVICE_ROLE_KEY en .env

1. Supabase → Project Settings → API → service_role (secret)
2. Añade a .env:
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
3. Vuelve a correr: npm run seed:content

Alternativa sin service role:
  Abre SQL Editor y pega el archivo:
  supabase/migrations/20260321220000_site_content.sql
  Dashboard: ${url ? url.replace('https://', 'https://supabase.com/dashboard/project/').replace('.supabase.co', '/sql/new').replace('https://supabase.com/dashboard/project/', 'https://supabase.com/dashboard/project/') : ''}
`)
  // Better dashboard URL
  const ref = url?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
  if (ref) {
    console.error(`SQL Editor: https://supabase.com/dashboard/project/${ref}/sql/new`)
  }
  process.exit(1)
}

const data = JSON.parse(readFileSync(contentPath, 'utf8'))
const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const ddl = `
create table if not exists public.site_content (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
`

// service role bypasses RLS; create table via rpc won't work without exec.
// Use PostgREST only for upsert after table exists — for DDL we need pg or SQL API.

console.log('Upserting site_content (la tabla debe existir)...')

const { error: upsertError } = await admin.from('site_content').upsert({
  id: 'main',
  data,
  updated_at: new Date().toISOString(),
})

if (upsertError) {
  console.error('Error upsert:', upsertError.message)
  console.error(`
Si la tabla no existe, corre primero el SQL:
  supabase/migrations/20260321220000_site_content.sql
en el SQL Editor del dashboard (incluye create + seed).
`)
  const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
  if (ref) console.error(`→ https://supabase.com/dashboard/project/${ref}/sql/new`)
  process.exit(1)
}

console.log('OK: mock content cargado en site_content (id=main)')
