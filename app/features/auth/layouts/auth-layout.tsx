import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen gap-5">
      <div className="bg-linear-to-br from-primary via-black to-primary/50" />
      <Outlet />
    </div>
  );
}
