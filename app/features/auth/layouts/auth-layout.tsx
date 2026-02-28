import { HomeIcon } from "lucide-react";
import { Link, Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/ui/flickering-grid";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen gap-5">
      <div className="relative">
        <Link to="/" className="absolute top-10 left-10">
          <HomeIcon className="size-10 opacity-70" />
        </Link>

        <FlickeringGrid
          squareSize={4}
          gridGap={5}
          maxOpacity={0.5}
          flickerChance={0.2}
          color="red"
        />
      </div>
      <Outlet />
    </div>
  );
}
