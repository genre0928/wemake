import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navigation from "./common/components/navigation";
import type React from "react";
import { cn } from "./lib/utils";
import { makeSSRClient } from "./supa-client";
import { countNotifications, getUserById } from "./features/users/queries";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user?.id) {
    return { user: null, profile: null };
  }

  const dbProfile = await getUserById(client, { id: user.id });
  const notificationsCount = await countNotifications(client, user.id);
  const profile = dbProfile
    ? {
        avatar: dbProfile.avatar ?? "",
        name: dbProfile.name,
        nickname: dbProfile.nickname,
        email: dbProfile.email,
      }
    : null;

  return { user, profile, notificationsCount };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const { user, profile, notificationsCount } = loaderData;
  const isLoggedIn = !!user;
  const isAuth = location.pathname.startsWith("/auth");
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col px-20 py-28",
        isAuth && "px-0 py-0",
      )}
    >
      {!isAuth && (
        <Navigation
          isLoggedIn={isLoggedIn}
          hasNotifications={(notificationsCount ?? 0) > 0}
          hasMessages={true}
          profile={profile}
          notificationsCount={notificationsCount ?? 0}
        />
      )}
      <div className="min-h-0 flex-1">
        <Outlet context={{ isLoggedIn, userProfile: profile, notificationsCount, userId: user?.id }} />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
