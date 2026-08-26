-- Migration: create custom_orders table + storage bucket for custom fingerboard build orders
-- Applied: 2026-08-26

-- Table
CREATE TABLE IF NOT EXISTS public.custom_orders (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email        text        NOT NULL,
  size                  text        NOT NULL CHECK (size IN ('32mm', '34mm', '36mm')),
  wood_upgrade          boolean     NOT NULL DEFAULT false,
  rush_production       boolean     NOT NULL DEFAULT false,
  quantity              integer     NOT NULL DEFAULT 1 CHECK (quantity >= 1 AND quantity <= 10),
  notes                 text,
  file_paths            text[]      NOT NULL DEFAULT '{}',
  design_help_requested boolean     NOT NULL DEFAULT false,
  amount_total          integer     NOT NULL,        -- USD cents, computed server-side
  stripe_session_id     text,                        -- filled after Stripe session creation
  status                text        NOT NULL DEFAULT 'pending_payment'
                                    CHECK (status IN ('pending_payment','paid','in_production','shipped','cancelled')),
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS custom_orders_stripe_session_id_idx ON public.custom_orders (stripe_session_id);
CREATE INDEX IF NOT EXISTS custom_orders_created_at_idx        ON public.custom_orders (created_at DESC);
CREATE INDEX IF NOT EXISTS custom_orders_status_idx            ON public.custom_orders (status);

-- RLS (service-role key bypasses RLS; no public access)
ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;

-- Storage bucket: custom-order-uploads (private, 15 MB per-file cap)
-- Bucket is created via Supabase MCP / dashboard; this documents the intent.
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES (
--   'custom-order-uploads',
--   'custom-order-uploads',
--   false,
--   15728640,
--   ARRAY[
--     'image/jpeg','image/png','image/webp','image/heic','image/heif',
--     'application/pdf','image/svg+xml','application/postscript','application/illustrator'
--   ]
-- ) ON CONFLICT (id) DO NOTHING;

-- Deny public/authenticated access to the uploads bucket
-- (service-role key bypasses RLS; anon/authenticated users are blocked)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename  = 'objects'
      AND policyname = 'custom_order_uploads_deny_public'
  ) THEN
    EXECUTE $policy$
      CREATE POLICY custom_order_uploads_deny_public
        ON storage.objects
        FOR ALL
        TO anon, authenticated
        USING (bucket_id = 'custom-order-uploads' AND false)
    $policy$;
  END IF;
END
$$;
