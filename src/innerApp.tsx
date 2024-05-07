import { RouterProvider } from "@tanstack/react-router";

import { useAuth } from "./hooks/useAuth";
import { router } from "./router";

export default function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
