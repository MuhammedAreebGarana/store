# Store — Next.js + Supabase

A minimal e-commerce store built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- Product listing & detail pages
- Cart (persisted in localStorage)
- Auth (sign up / sign in via Supabase)
- Server-side data fetching from Supabase

---

## Setup

### 1. Clone and install

```bash
npm install
```

### 2. Set environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run locally

```bash
npm run dev
```

---

## Deploying to Vercel

1. Push this folder to a GitHub repo
2. Import the repo in [Vercel](https://vercel.com)
3. Add your environment variables in **Vercel → Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Next.js, no extra config needed

---

## Supabase Tables Required

Make sure your Supabase project has these tables (use the CSVs provided):

**products**
| Column | Type | Notes |
|--------|------|-------|
| id | int8 | PK, auto-increment |
| name | text | not null |
| description | text | |
| price | numeric | not null |
| image_url | text | |
| stock | int4 | default 0 |

**orders**
| Column | Type | Notes |
|--------|------|-------|
| id | int8 | PK, auto-increment |
| user_id | uuid | |
| product_id | int8 | |
| quantity | int4 | |
| total | numeric | |
| status | text | default: pending |
| stripe_session_id | text | |

### Enable Row Level Security (RLS)

In Supabase → your table → RLS, enable it and add:
- **products**: Allow `SELECT` for `anon` role
- **orders**: Allow `SELECT/INSERT` for `authenticated` role where `user_id = auth.uid()`
