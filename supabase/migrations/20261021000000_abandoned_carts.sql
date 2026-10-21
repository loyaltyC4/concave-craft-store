-- Abandoned checkout capture: one row per expired Stripe Checkout Session.
-- Written by the Stripe webhook (service role); never exposed to the browser.
create table if not exists fbl_abandoned_carts (
  session_id text primary key,
  email text,
  name text,
  marketing_consent boolean not null default false,
  items jsonb not null default '[]'::jsonb,
  amount_total integer,
  currency text,
  recovery_url text,
  status text not null default 'open' check (status in ('open', 'emailed', 'recovered')),
  emailed_at timestamptz,
  recovered_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists fbl_abandoned_carts_email_idx on fbl_abandoned_carts (email);
create index if not exists fbl_abandoned_carts_status_idx on fbl_abandoned_carts (status, created_at);

alter table fbl_abandoned_carts enable row level security;
-- No policies: only the service role (which bypasses RLS) can read or write.
