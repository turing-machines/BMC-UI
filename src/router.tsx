import { createRouter } from "@tanstack/react-router";

import FourOhFour from "./components/404";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: FourOhFour,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});
