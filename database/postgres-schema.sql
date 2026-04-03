create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";

create table accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table admin_users (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  full_name text not null,
  email text not null,
  password_hash text not null,
  role text not null default 'owner' check (role in ('owner', 'manager', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (account_id, email)
);

create table properties (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  public_name text not null,
  legal_name text,
  slug text not null,
  city text not null,
  state_code char(2) not null,
  address_line text,
  hero_title text,
  hero_copy text,
  instagram_handle text,
  instagram_url text,
  reservation_phone text,
  reservation_whatsapp text,
  reservation_email text,
  checkin_time text,
  checkout_time text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (account_id, slug)
);

create table suites (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  slug text not null,
  name text not null,
  category text not null,
  summary text,
  details text,
  nightly_rate numeric(10,2) not null default 0,
  max_guests integer not null default 1,
  beds_description text,
  size_label text,
  cover_image_url text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (property_id, slug)
);

create table suite_assets (
  id uuid primary key default gen_random_uuid(),
  suite_id uuid not null references suites(id) on delete cascade,
  asset_url text not null,
  kind text not null default 'gallery' check (kind in ('gallery', 'cover', 'video', 'poster')),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table suite_amenities (
  id uuid primary key default gen_random_uuid(),
  suite_id uuid not null references suites(id) on delete cascade,
  label text not null,
  display_order integer not null default 0
);

create table experiences (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  name text not null,
  duration_label text,
  description text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  suite_id uuid references suites(id) on delete set null,
  guest_name text not null,
  guest_contact text not null,
  guest_email text,
  notes text,
  source text not null default 'site',
  created_at timestamptz not null default now()
);

create table reservations (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  suite_id uuid not null references suites(id) on delete restrict,
  lead_id uuid references leads(id) on delete set null,
  guest_name text not null,
  guest_contact text not null,
  guest_email text,
  checkin_date date not null,
  checkout_date date not null,
  guest_count integer not null check (guest_count > 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  total_amount numeric(10,2),
  notes text,
  source text not null default 'site',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (checkin_date < checkout_date)
);

alter table reservations
add constraint reservations_no_overlap
exclude using gist (
  suite_id with =,
  daterange(checkin_date, checkout_date, '[)') with &&
)
where (status in ('pending', 'confirmed'));

create table availability_blocks (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  suite_id uuid not null references suites(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  reason text not null,
  created_at timestamptz not null default now(),
  check (start_date < end_date)
);

create table media_assets (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  label text not null,
  asset_url text not null,
  asset_kind text not null check (asset_kind in ('image', 'video', 'poster')),
  slot text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table content_revisions (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  actor_user_id uuid references admin_users(id) on delete set null,
  revision_kind text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  actor_user_id uuid references admin_users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index reservations_property_status_idx on reservations(property_id, status);
create index reservations_property_checkin_idx on reservations(property_id, checkin_date);
create index leads_property_created_idx on leads(property_id, created_at desc);
create index suites_property_active_idx on suites(property_id, is_active);
