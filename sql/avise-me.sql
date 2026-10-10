-- =====================================================================
-- "Fora de estoque — avise-me quando chegar" - Sagrado de Mim
-- Rode este arquivo inteiro UMA vez no Supabase: SQL Editor > New query > Run.
-- Usa a mesma senha do painel (admin_config, chave 'codigo_estoque').
-- =====================================================================

-- Produtos/aromas marcados como fora de estoque (todo mundo pode LER, só o painel muda)
create table if not exists fora_estoque (
  product_id text not null,
  aroma      text not null default '',
  desde      timestamptz not null default now(),
  primary key (product_id, aroma)
);
alter table fora_estoque enable row level security;
drop policy if exists "fora_estoque leitura" on fora_estoque;
create policy "fora_estoque leitura" on fora_estoque for select using (true);
grant select on fora_estoque to anon, authenticated;

-- Pedidos de "avise-me" (ninguém lê direto; só pelas funções)
create table if not exists avise_me (
  id          bigserial primary key,
  product_id  text not null,
  aroma       text not null default '',
  email       text not null,
  criado_em   timestamptz not null default now(),
  avisado_em  timestamptz
);
create unique index if not exists avise_me_unico on avise_me (product_id, aroma, lower(email)) where avisado_em is null;
alter table avise_me enable row level security;
revoke all on avise_me from anon, authenticated;

-- Cliente pede para ser avisada
create or replace function criar_aviso(p_product_id text, p_aroma text, p_email text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 160 then raise exception 'email invalido'; end if;
  if not exists (select 1 from fora_estoque where product_id = p_product_id and aroma = coalesce(p_aroma, '')) then
    raise exception 'este produto nao esta fora de estoque';
  end if;
  insert into avise_me (product_id, aroma, email) values (p_product_id, coalesce(p_aroma, ''), lower(trim(p_email)))
  on conflict do nothing;
end $$;

-- Painel: liga/desliga "fora de estoque". Ao desligar, devolve quem deve ser avisado e marca como avisado.
create or replace function admin_definir_fora(p_codigo text, p_product_id text, p_aroma text, p_fora boolean) returns json
language plpgsql security definer set search_path = public as $$
declare v text; lista json;
begin
  select valor into v from admin_config where chave = 'codigo_estoque';
  if v is null or p_codigo is null or p_codigo <> v then raise exception 'codigo invalido'; end if;
  if p_fora then
    insert into fora_estoque (product_id, aroma) values (p_product_id, coalesce(p_aroma, '')) on conflict do nothing;
    return '[]'::json;
  end if;
  delete from fora_estoque where product_id = p_product_id and aroma = coalesce(p_aroma, '');
  with avisados as (
    update avise_me set avisado_em = now()
    where product_id = p_product_id and aroma = coalesce(p_aroma, '') and avisado_em is null
    returning email
  ) select coalesce(json_agg(email), '[]'::json) into lista from avisados;
  return lista;
end $$;

-- Painel: quantas pessoas estão esperando cada produto/aroma
create or replace function admin_listar_avisos(p_codigo text) returns json
language plpgsql security definer set search_path = public as $$
declare v text;
begin
  select valor into v from admin_config where chave = 'codigo_estoque';
  if v is null or p_codigo is null or p_codigo <> v then raise exception 'codigo invalido'; end if;
  return coalesce((select json_agg(json_build_object('product_id', product_id, 'aroma', aroma, 'esperando', n, 'emails', emails) order by n desc)
    from (select product_id, aroma, count(*) n, json_agg(email order by criado_em) emails from avise_me where avisado_em is null group by product_id, aroma) t), '[]'::json);
end $$;

grant execute on function criar_aviso(text, text, text) to anon, authenticated;
grant execute on function admin_definir_fora(text, text, text, boolean) to anon, authenticated;
grant execute on function admin_listar_avisos(text) to anon, authenticated;
