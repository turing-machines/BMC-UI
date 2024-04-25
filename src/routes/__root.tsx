/// <reference types="vite-plugin-svgr/client" />
import "../css/app.scss";
import "react-responsive-modal/styles.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <ReactQueryDevtools />
      </>
    );
  },
});
