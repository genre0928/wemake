-- auth.users에 유저가 추가되면 profiles 테이블에 유저 정보를 추가하는 트리거
-- PostgreSQL에서 함수를 생성하는 문법
CREATE FUNCTION public.handle_new_user()
returns TRIGGER
LANGUAGE plpgsql
security definer
SET search_path = ''
as $$
begin
  if new.raw_app_meta_data is not null then
    if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
        insert into public.profiles (profile_id, name, email, nickname, position) values (new.id, 'seonwoo', 'se@naver.com', 'genre0928', 'etc');
    end if;
  end if;
    return new;
end
$$;

create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();