import { useOutletContext } from "react-router";
import type { Route } from "./+types/profile-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      nickname: params.nickname,
    },
  });
  return null;
};

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  const { user } = useOutletContext<{ user: {
    nickname: string;
    name: string;
    position: string;
  } }>();
  return <div>
    <div>{user.name}의 프로필 페이지</div>
    <div>{user.position}</div>
    <div>@{user.nickname}</div>
  </div>;
}
