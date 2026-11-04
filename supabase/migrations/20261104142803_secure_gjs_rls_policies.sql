alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_measurements enable row level security;
alter table public.project_modules enable row level security;
alter table public.module_parts enable row level security;
alter table public.materials enable row level security;
alter table public.project_materials enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.quote_history enable row level security;

create policy clients_select_own on public.clients
for select to authenticated using ((select auth.uid()) = user_id);
create policy clients_insert_own on public.clients
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy clients_update_own on public.clients
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy clients_delete_own on public.clients
for delete to authenticated using ((select auth.uid()) = user_id);

create policy projects_select_own on public.projects
for select to authenticated using ((select auth.uid()) = user_id);
create policy projects_insert_own on public.projects
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy projects_update_own on public.projects
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy projects_delete_own on public.projects
for delete to authenticated using ((select auth.uid()) = user_id);

create policy measurements_select_own on public.project_measurements
for select to authenticated using ((select auth.uid()) = user_id);
create policy measurements_insert_own on public.project_measurements
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy measurements_update_own on public.project_measurements
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy measurements_delete_own on public.project_measurements
for delete to authenticated using ((select auth.uid()) = user_id);

create policy modules_select_own on public.project_modules
for select to authenticated using ((select auth.uid()) = user_id);
create policy modules_insert_own on public.project_modules
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy modules_update_own on public.project_modules
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy modules_delete_own on public.project_modules
for delete to authenticated using ((select auth.uid()) = user_id);

create policy parts_select_own on public.module_parts
for select to authenticated using ((select auth.uid()) = user_id);
create policy parts_insert_own on public.module_parts
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy parts_update_own on public.module_parts
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy parts_delete_own on public.module_parts
for delete to authenticated using ((select auth.uid()) = user_id);

create policy materials_select_own on public.materials
for select to authenticated using ((select auth.uid()) = user_id);
create policy materials_insert_own on public.materials
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy materials_update_own on public.materials
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy materials_delete_own on public.materials
for delete to authenticated using ((select auth.uid()) = user_id);

create policy project_materials_select_own on public.project_materials
for select to authenticated using ((select auth.uid()) = user_id);
create policy project_materials_insert_own on public.project_materials
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy project_materials_update_own on public.project_materials
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy project_materials_delete_own on public.project_materials
for delete to authenticated using ((select auth.uid()) = user_id);

create policy quotes_select_own on public.quotes
for select to authenticated using ((select auth.uid()) = user_id);
create policy quotes_insert_own on public.quotes
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy quotes_update_own on public.quotes
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy quotes_delete_own on public.quotes
for delete to authenticated using ((select auth.uid()) = user_id);

create policy quote_items_select_own on public.quote_items
for select to authenticated using ((select auth.uid()) = user_id);
create policy quote_items_insert_own on public.quote_items
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy quote_items_update_own on public.quote_items
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy quote_items_delete_own on public.quote_items
for delete to authenticated using ((select auth.uid()) = user_id);

create policy quote_history_select_own on public.quote_history
for select to authenticated using ((select auth.uid()) = user_id);
create policy quote_history_insert_own on public.quote_history
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy quote_history_update_own on public.quote_history
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
create policy quote_history_delete_own on public.quote_history
for delete to authenticated using ((select auth.uid()) = user_id);

grant usage on schema public to authenticated;
grant select, insert, update, delete
on public.clients, public.projects, public.project_measurements,
public.project_modules, public.module_parts, public.materials,
public.project_materials, public.quotes, public.quote_items,
public.quote_history
to authenticated;

grant usage, select on sequence public.quote_history_id_seq to authenticated;

revoke all
on public.clients, public.projects, public.project_measurements,
public.project_modules, public.module_parts, public.materials,
public.project_materials, public.quotes, public.quote_items,
public.quote_history
from anon;
