import { useContext } from "react";

import { FlashContext } from "@/contexts/FlashContext";

export function useFlash() {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlash must be used within an FlashProvider");
  }
  return context;
}
