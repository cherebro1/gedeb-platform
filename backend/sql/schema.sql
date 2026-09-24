-- Run this in your Supabase project's SQL Editor (Database > SQL Editor)
-- before starting the backend.

create table if not exists service_registrations (
  id uuid primary key default gen_random_uuid(),
  office_name text not null,
  contact_name text not null,
  contact_phone text not null,
  service_name text not null,
  description text,
  status text not null default 'pending', -- pending | in_review | in_progress | live
  created_at timestamptz not null default now()
);

create table if not exists startup_registrations (
  id uuid primary key default gen_random_uuid(),
  founder_name text not null,
  phone text not null,
  business_idea text not null,
  stage text not null default 'idea', -- idea | building | registered
  created_at timestamptz not null default now()
);

-- Row Level Security: keep these tables writable only through the backend,
-- which uses the service-role key (bypasses RLS). Block direct public access.
alter table service_registrations enable row level security;
alter table startup_registrations enable row level security;

-- No policies are created, so the anon/public key has zero access by default.
-- All reads/writes must go through the Node.js backend using the service key.
