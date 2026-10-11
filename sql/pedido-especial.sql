-- =====================================================================
-- Pedido especial (a cliente conta a ideia e a Sagrado de Mim avalia) - Sagrado de Mim
-- Rode DEPOIS do kits.sql (SQL Editor > New query > Run). Pode rodar mais de uma vez sem problema.
-- Usa a mesma tabela dos kits, com uma coluna "tipo" ('kit' ou 'especial').
-- =====================================================================

alter table kit_pedidos add column if not exists tipo text not null default 'kit';
alter table kit_pedidos alter column orcamento drop not null;

drop function if exists criar_kit(text, text, text, numeric, text, text, text);
create or replace function criar_kit(p_nome text, p_email text, p_whatsapp text, p_orcamento numeric,
                                     p_ocasiao text, p_preferencias text, p_prazo text, p_tipo text default 'kit')
returns json language plpgsql security definer set search_path = public as $$
declare r kit_pedidos; t text := case when p_tipo = 'especial' then 'especial' else 'kit' end;
begin
  if coalesce(trim(p_nome), '') = '' or length(p_nome) > 120 then raise exception 'nome invalido'; end if;
  if p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 160 then raise exception 'email invalido'; end if;
  if t = 'kit' and (p_orcamento is null or p_orcamento < 30) then raise exception 'orcamento invalido'; end if;
  if p_orcamento is not null and (p_orcamento < 0 or p_orcamento > 50000) then raise exception 'orcamento invalido'; end if;
  if coalesce(trim(p_preferencias), '') = '' or length(p_preferencias) > 3000 then raise exception 'descricao invalida'; end if;
  if (select count(*) from kit_pedidos where lower(email) = lower(p_email) and criado_em > now() - interval '1 hour') >= 5 then
    raise exception 'muitos pedidos seguidos, tente mais tarde';
  end if;
  insert into kit_pedidos (nome, email, whatsapp, orcamento, ocasiao, preferencias, prazo, tipo)
  values (trim(p_nome), lower(trim(p_email)), left(p_whatsapp, 40), round(p_orcamento, 2), left(p_ocasiao, 120), p_preferencias, left(p_prazo, 120), t)
  returning * into r;
  return json_build_object('id', r.id, 'token', r.token);
end $$;

create or replace function ver_kit(p_token text) returns json
language sql security definer set search_path = public as $$
  select json_build_object('id', id, 'tipo', tipo, 'nome', nome, 'orcamento', orcamento, 'ocasiao', ocasiao,
    'preferencias', preferencias, 'prazo', prazo, 'status', status, 'proposta_itens', proposta_itens,
    'proposta_valor', proposta_valor, 'resposta_msg', resposta_msg, 'criado_em', criado_em)
  from kit_pedidos where token = p_token;
$$;

-- Painel: avisa que a ideia não é possível (status 'inviavel'), com uma mensagem para a cliente
create or replace function admin_marcar_inviavel(p_codigo text, p_id bigint, p_msg text) returns json
language plpgsql security definer set search_path = public as $$
declare r kit_pedidos;
begin
  perform kit_checar_codigo(p_codigo);
  update kit_pedidos set status = 'inviavel', proposta_itens = left(p_msg, 3000), proposta_valor = null, proposta_em = now()
  where id = p_id returning * into r;
  if not found then raise exception 'pedido nao encontrado'; end if;
  return json_build_object('id', r.id, 'token', r.token, 'nome', r.nome, 'email', r.email, 'tipo', r.tipo);
end $$;

grant execute on function criar_kit(text, text, text, numeric, text, text, text, text) to anon, authenticated;
grant execute on function ver_kit(text) to anon, authenticated;
grant execute on function admin_marcar_inviavel(text, bigint, text) to anon, authenticated;
