import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/info" });
    } else {
      void navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  return <></>;
}
