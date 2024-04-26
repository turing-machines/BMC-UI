/// <reference types="vite-plugin-svgr/client" />
import "../css/app.scss";
import "react-responsive-modal/styles.css";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { type AuthContext } from "../contexts/AuthContext";

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
        <Outlet />
        <Suspense>
          <ReactQueryDevtools />
          <TanStackRouterDevtools initialIsOpen={false} />
        </Suspense>
      </>
    );
  },
});
