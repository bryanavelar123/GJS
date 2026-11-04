create extension if not exists pgcrypto;

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 2 and 160),
  phone text check (phone is null or char_length(phone) <= 40),
  email text check (email is null or char_length(email) <= 254),
  notes text check (notes is null or char_length(notes) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid,
  name text not null check (char_length(trim(name)) between 2 and 160),
  environment text not null check (char_length(trim(environment)) between 1 and 160),
  description text check (description is null or char_length(description) <= 10000),
  status text not null default 'draft'
    check (status in ('draft','quoted','approved','in_progress','completed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (client_id, user_id)
    references public.clients(id, user_id) on delete set null
);

create table public.project_measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null,
  label text not null check (char_length(trim(label)) between 1 and 160),
  width_mm numeric(10,2) not null check (width_mm > 0 and width_mm <= 100000),
  length_mm numeric(10,2) check (length_mm is null or (length_mm > 0 and length_mm <= 100000)),
  depth_mm numeric(10,2) check (depth_mm is null or (depth_mm > 0 and depth_mm <= 100000)),
  height_mm numeric(10,2) check (height_mm is null or (height_mm > 0 and height_mm <= 100000)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (project_id, user_id)
    references public.projects(id, user_id) on delete cascade
);

create table public.project_modules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null,
  name text not null check (char_length(trim(name)) between 1 and 160),
  width_mm numeric(10,2) not null check (width_mm > 0 and width_mm <= 100000),
  depth_mm numeric(10,2) not null check (depth_mm > 0 and depth_mm <= 100000),
  height_mm numeric(10,2) not null check (height_mm > 0 and height_mm <= 100000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (project_id, user_id)
    references public.projects(id, user_id) on delete cascade
);

create table public.module_parts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null,
  name text not null check (char_length(trim(name)) between 1 and 160),
  width_mm numeric(10,2) not null check (width_mm > 0 and width_mm <= 100000),
  depth_mm numeric(10,2) not null check (depth_mm > 0 and depth_mm <= 100000),
  thickness_mm numeric(10,2) not null check (thickness_mm > 0 and thickness_mm <= 1000),
  quantity integer not null check (quantity > 0 and quantity <= 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (module_id, user_id)
    references public.project_modules(id, user_id) on delete cascade
);

create table public.materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('MDF','Ferragens','Acessórios','Outro')),
  name text not null check (char_length(trim(name)) between 1 and 160),
  brand text check (brand is null or char_length(brand) <= 160),
  color_hex text check (color_hex is null or color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  unit text not null default 'un' check (unit in ('un','m','m2','chapa','kit')),
  unit_price_cents bigint not null default 0
    check (unit_price_cents >= 0 and unit_price_cents <= 100000000000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create table public.project_materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null,
  material_id uuid not null,
  quantity numeric(12,3) not null check (quantity > 0 and quantity <= 1000000),
  unit_price_cents bigint not null
    check (unit_price_cents >= 0 and unit_price_cents <= 100000000000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (project_id, user_id)
    references public.projects(id, user_id) on delete cascade,
  foreign key (material_id, user_id)
    references public.materials(id, user_id) on delete restrict
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null,
  client_id uuid,
  status text not null default 'draft'
    check (status in ('draft','sent','approved','rejected','expired','cancelled')),
  notes text check (notes is null or char_length(notes) <= 10000),
  valid_until date,
  subtotal_cents bigint not null default 0
    check (subtotal_cents >= 0 and subtotal_cents <= 1000000000000),
  discount_cents bigint not null default 0
    check (discount_cents >= 0 and discount_cents <= subtotal_cents),
  total_cents bigint generated always as (subtotal_cents - discount_cents) stored,
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id),
  foreign key (project_id, user_id)
    references public.projects(id, user_id) on delete cascade,
  foreign key (client_id, user_id)
    references public.clients(id, user_id) on delete set null
);

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quote_id uuid not null,
  description text not null check (char_length(trim(description)) between 1 and 500),
  quantity numeric(12,3) not null default 1 check (quantity > 0 and quantity <= 1000000),
  unit_price_cents bigint not null default 0
    check (unit_price_cents >= 0 and unit_price_cents <= 100000000000),
  total_cents bigint generated always as (round(quantity * unit_price_cents)) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (quote_id, user_id)
    references public.quotes(id, user_id) on delete cascade
);

create table public.quote_history (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  quote_id uuid not null,
  version integer not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  foreign key (quote_id, user_id)
    references public.quotes(id, user_id) on delete cascade
);

create index clients_user_idx on public.clients(user_id);
create index projects_user_updated_idx on public.projects(user_id, updated_at desc);
create index measurements_project_idx on public.project_measurements(project_id);
create index modules_project_idx on public.project_modules(project_id);
create index parts_module_idx on public.module_parts(module_id);
create index materials_user_category_idx on public.materials(user_id, category);
create index project_materials_project_idx on public.project_materials(project_id);
create index quotes_user_updated_idx on public.quotes(user_id, updated_at desc);
create index quote_items_quote_idx on public.quote_items(quote_id);
create index quote_history_quote_idx on public.quote_history(quote_id, version desc);
