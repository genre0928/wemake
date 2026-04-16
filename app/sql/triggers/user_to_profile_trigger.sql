-- auth.users에 유저가 추가되면 profiles 테이블에 유저 정보를 추가하는 트리거
-- PostgreSQL에서 함수를 생성하는 문법
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE FUNCTION public.handle_new_user()
returns TRIGGER
LANGUAGE plpgsql
security definer
SET search_path = ''
as $$
begin
  if new.raw_app_meta_data is not null then
    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' OR new.raw_app_meta_data ->> 'provider' = 'phone' then
      if new.raw_user_meta_data ? 'name' AND new.raw_user_meta_data ? 'nickname' then
        insert into public.profiles (profile_id, name, email, nickname, position)
        values (
          new.id,
          new.raw_user_meta_data ->> 'name',
          new.email,
          new.raw_user_meta_data ->> 'nickname',
          'etc'
        );
      else
        insert into public.profiles (profile_id, name, email, nickname, position)
        values (new.id, 'ehdnsj35', new.email, 'ehdnsj35', 'etc');
      end if;
    end if;

    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
      insert into public.profiles (profile_id, name, email, nickname, avatar)
      values (new.id, new.raw_user_meta_data ->> 'name', new.email, new.raw_user_meta_data ->> 'nickname' || substr(md(random()::text), 1, 5), new.raw_user_meta_data ->> 'avatar_url');
    end if;

    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'github' then
      insert into public.profiles (profile_id, name, email, nickname, avatar)
      values (new.id, new.raw_user_meta_data ->> 'name', new.email, new.raw_user_meta_data ->> 'nickname' || substr(md(random()::text), 1, 5), new.raw_user_meta_data ->> 'avatar_url');
    end if;
    
  end if;
  return new;
end
$$;

create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();