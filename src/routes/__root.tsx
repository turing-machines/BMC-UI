/// <reference types="vite-plugin-svgr/client" />
import "../css/app.scss";
import "react-responsive-modal/styles.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AuthProvider } from "../contexts/AuthContext";

export const Route = createRootRoute({
  component: () => {
    return (
      <AuthProvider>
        <Outlet />
        <ReactQueryDevtools />
      </AuthProvider>
    );
  },
});
