-- =====================================================================
-- Encomenda de kits personalizados - Sagrado de Mim
-- Rode este arquivo inteiro UMA vez no Supabase: SQL Editor > New query > Run.
-- Usa a mesma senha do estoque (tabela admin_config, chave 'codigo_estoque').
-- =====================================================================

create table if not exists kit_pedidos (
  id             bigserial primary key,
  token          text unique not null default replace(gen_random_uuid()::text, '-', ''),
  criado_em      timestamptz not null default now(),
  nome           text not null,
  email          text not null,
  whatsapp       text,
  orcamento      numeric(10,2) not null,
  ocasiao        text,
  preferencias   text not null,
  prazo          text,
  status         text not null default 'novo',   -- novo | proposta_enviada | aprovado | recusado
  proposta_itens text,
  proposta_valor numeric(10,2),
  proposta_em    timestamptz,
  resposta_msg   text,
  respondido_em  timestamptz
);

-- Ninguém lê nem escreve direto na tabela: só pelas funções abaixo.
alter table kit_pedidos enable row level security;
revoke all on kit_pedidos from anon, authenticated;

-- Confere a senha do painel (a mesma do estoque)
create or replace function kit_checar_codigo(p_codigo text) returns void
language plpgsql security definer set search_path = public as $$
declare v text;
begin
  select valor into v from admin_config where chave = 'codigo_estoque';
  if v is null or v like 'TROQUE-ESTE%' or length(v) < 6 then
    raise exception 'senha do painel nao configurada';
  end if;
  if p_codigo is null or p_codigo <> v then
    raise exception 'codigo invalido';
  end if;
end $$;

-- 1) Cliente pede um kit (site) -> devolve o token da encomenda
create or replace function criar_kit(p_nome text, p_email text, p_whatsapp text, p_orcamento numeric,
                                     p_ocasiao text, p_preferencias text, p_prazo text)
returns json language plpgsql security definer set search_path = public as $$
declare r kit_pedidos;
begin
  if coalesce(trim(p_nome), '') = '' or length(p_nome) > 120 then raise exception 'nome invalido'; end if;
  if p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 160 then raise exception 'email invalido'; end if;
  if p_orcamento is null or p_orcamento < 30 or p_orcamento > 50000 then raise exception 'orcamento invalido'; end if;
  if coalesce(trim(p_preferencias), '') = '' or length(p_preferencias) > 3000 then raise exception 'preferencias invalidas'; end if;
  if (select count(*) from kit_pedidos where lower(email) = lower(p_email) and criado_em > now() - interval '1 hour') >= 5 then
    raise exception 'muitos pedidos seguidos, tente mais tarde';
  end if;
  insert into kit_pedidos (nome, email, whatsapp, orcamento, ocasiao, preferencias, prazo)
  values (trim(p_nome), lower(trim(p_email)), left(p_whatsapp, 40), round(p_orcamento, 2), left(p_ocasiao, 120), p_preferencias, left(p_prazo, 120))
  returning * into r;
  return json_build_object('id', r.id, 'token', r.token);
end $$;

-- 2) Cliente vê a encomenda dela pelo link (token)
create or replace function ver_kit(p_token text) returns json
language sql security definer set search_path = public as $$
  select json_build_object('id', id, 'nome', nome, 'orcamento', orcamento, 'ocasiao', ocasiao,
    'preferencias', preferencias, 'prazo', prazo, 'status', status, 'proposta_itens', proposta_itens,
    'proposta_valor', proposta_valor, 'resposta_msg', resposta_msg, 'criado_em', criado_em)
  from kit_pedidos where token = p_token;
$$;

-- 3) Cliente aprova ou recusa a proposta
create or replace function responder_kit(p_token text, p_aprovado boolean, p_msg text) returns json
language plpgsql security definer set search_path = public as $$
declare r kit_pedidos;
begin
  select * into r from kit_pedidos where token = p_token for update;
  if not found then raise exception 'encomenda nao encontrada'; end if;
  if r.status <> 'proposta_enviada' then raise exception 'esta proposta ja foi respondida ou ainda nao foi enviada'; end if;
  update kit_pedidos set status = case when p_aprovado then 'aprovado' else 'recusado' end,
    resposta_msg = left(p_msg, 2000), respondido_em = now()
  where id = r.id returning * into r;
  return json_build_object('id', r.id, 'status', r.status, 'nome', r.nome, 'email', r.email, 'proposta_valor', r.proposta_valor);
end $$;

-- 4) Painel: lista as encomendas
create or replace function admin_listar_kits(p_codigo text) returns json
language plpgsql security definer set search_path = public as $$
begin
  perform kit_checar_codigo(p_codigo);
  return coalesce((select json_agg(row_to_json(k) order by k.criado_em desc) from kit_pedidos k), '[]'::json);
end $$;

-- 5) Painel: envia (ou reenvia) a proposta
create or replace function admin_enviar_proposta_kit(p_codigo text, p_id bigint, p_itens text, p_valor numeric) returns json
language plpgsql security definer set search_path = public as $$
declare r kit_pedidos;
begin
  perform kit_checar_codigo(p_codigo);
  if coalesce(trim(p_itens), '') = '' then raise exception 'descreva os itens do kit'; end if;
  if p_valor is null or p_valor <= 0 then raise exception 'valor invalido'; end if;
  update kit_pedidos set proposta_itens = p_itens, proposta_valor = round(p_valor, 2), proposta_em = now(),
    status = 'proposta_enviada', resposta_msg = null, respondido_em = null
  where id = p_id returning * into r;
  if not found then raise exception 'encomenda nao encontrada'; end if;
  return json_build_object('id', r.id, 'token', r.token, 'nome', r.nome, 'email', r.email, 'proposta_valor', r.proposta_valor);
end $$;

revoke execute on function kit_checar_codigo(text) from public, anon, authenticated;
grant execute on function criar_kit(text, text, text, numeric, text, text, text) to anon, authenticated;
grant execute on function ver_kit(text) to anon, authenticated;
grant execute on function responder_kit(text, boolean, text) to anon, authenticated;
grant execute on function admin_listar_kits(text) to anon, authenticated;
grant execute on function admin_enviar_proposta_kit(text, bigint, text, numeric) to anon, authenticated;
