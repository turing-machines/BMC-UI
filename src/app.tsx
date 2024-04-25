import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./contexts/AuthContext";
import InnerApp from "./innerApp";
import { type router } from "./router";

const queryClient = new QueryClient();

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
}
