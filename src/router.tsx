import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});
