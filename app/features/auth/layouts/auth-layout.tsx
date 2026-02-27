import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/ui/flickering-grid";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen gap-5">
      <div>
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
