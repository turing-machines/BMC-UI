/// <reference types="vite-plugin-svgr/client" />
import "@/globals.css";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { type AuthContext } from "@/contexts/AuthContext";

interface RouterContext {
  auth: AuthContext;
}

const ReactQueryDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/react-query-devtools").then((res) => ({
        default: res.ReactQueryDevtools,
      }))
    );

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <div className="flex min-h-screen w-full flex-col justify-between bg-turing-bg text-neutral-900 antialiased transition-all dark:bg-turing-bg-dark dark:text-neutral-100">
          <Outlet />
          <footer className="py-4 text-center text-xs uppercase opacity-60">
            <p>© Turing Machines Inc.</p>
          </footer>
        </div>
        <Suspense>
          <ReactQueryDevtools />
          <TanStackRouterDevtools initialIsOpen={false} />
        </Suspense>
      </>
    );
  },
});
