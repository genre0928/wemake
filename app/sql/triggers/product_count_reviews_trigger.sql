create or replace function public.handle_product_review_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.products
  set stats = jsonb_set(
    coalesce(stats, '{}'::jsonb),
    '{reviews}',
    to_jsonb(coalesce((stats->>'reviews')::int, 0) + 1),
    true
  )
  where product_id = new.product_id;

  return new;
end;
$$;

drop trigger if exists product_review_insert_trigger on public.reviews;
create trigger product_review_insert_trigger
after insert on public.reviews
for each row execute function public.handle_product_review_insert();

create or replace function public.handle_product_review_delete()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.products
  set stats = jsonb_set(
    coalesce(stats, '{}'::jsonb),
    '{reviews}',
    to_jsonb(greatest(coalesce((stats->>'reviews')::int, 0) - 1, 0)),
    true
  )
  where product_id = old.product_id;

  return old;
end;
$$;

drop trigger if exists product_review_delete_trigger on public.reviews;
create trigger product_review_delete_trigger
after delete on public.reviews
for each row execute function public.handle_product_review_delete();

