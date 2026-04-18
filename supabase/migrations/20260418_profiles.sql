-- =============================================================
-- public.profiles — miroir de auth.users synchronisé par trigger
-- =============================================================

create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  email        text,
  first_name   text,
  last_name    text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table  public.profiles is 'Profil utilisateur synchronisé depuis auth.users via trigger.';
comment on column public.profiles.id is 'FK vers auth.users.id — supprimé en cascade.';

-- ---- updated_at auto -------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---- Sync depuis auth.users (insert) ---------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name',  '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---- Sync depuis auth.users (update email / metadata) ----------------
create or replace function public.handle_user_updated()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set email      = new.email,
      first_name = coalesce(new.raw_user_meta_data ->> 'first_name', first_name),
      last_name  = coalesce(new.raw_user_meta_data ->> 'last_name',  last_name)
  where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute function public.handle_user_updated();

-- ---- Backfill : users déjà inscrits ---------------------------------
insert into public.profiles (id, email, first_name, last_name)
select u.id,
       u.email,
       coalesce(u.raw_user_meta_data ->> 'first_name', ''),
       coalesce(u.raw_user_meta_data ->> 'last_name',  '')
from auth.users u
on conflict (id) do nothing;

-- =============================================================
-- Row Level Security
-- =============================================================

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Pas de policy insert/delete : seul le trigger (security definer) écrit.
