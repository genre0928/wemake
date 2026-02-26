import { redirect } from "react-router";

export function loader() {
  // 쿠키를 읽은 뒤 리다이렉션 진행
  return redirect("/users/nickname");
}
