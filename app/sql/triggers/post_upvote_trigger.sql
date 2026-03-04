create function public.handle_post_upvote()
RETURNS trigger
LANGUAGE plpgsql
security definer
SET search_path = ''
AS $$
BEGIN
    update public.posts set upvotes = upvotes + 1 where post_id = new.post_id;
    return new;
END;
$$;

create trigger post_upvote_trigger
after insert on public.post_likes
for each row execute function public.handle_post_upvote();

create function public.handle_post_unvote()
RETURNS trigger
LANGUAGE plpgsql
security definer
SET search_path = ''
AS $$
BEGIN
    update public.posts set upvotes = upvotes - 1 where post_id = old.post_id;
    return old;
END;
$$;

create trigger post_unvote_trigger
after delete on public.post_likes
for each row execute function public.handle_post_unvote();