import "@/i18n.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { FlashProvider } from "@/contexts/FlashContext";
import InnerApp from "@/innerApp";
import { type router } from "@/router";

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
      <ThemeProvider attribute="class">
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <FlashProvider>
              <TooltipProvider delayDuration={0}>
                <InnerApp />
                <Toaster />
              </TooltipProvider>
            </FlashProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
