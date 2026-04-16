import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/my-profile-page";
import { getUserById } from "../queries";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const {data: {user}} = await client.auth.getUser();
  if(user) {
    const profile = await getUserById(client, { id: user.id });
    return redirect(`/users/${profile?.nickname}`);
  }
  return redirect("/auth/login");
}
