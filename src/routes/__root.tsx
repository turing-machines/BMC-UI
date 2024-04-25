/// <reference types="vite-plugin-svgr/client" />
import "../css/app.scss";
import "react-responsive-modal/styles.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { type AuthContextType } from "../contexts/AuthContext";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <ReactQueryDevtools />
        <TanStackRouterDevtools />
      </>
    );
  },
});
