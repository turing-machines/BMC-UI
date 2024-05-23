import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      aria-label="Toggle theme"
      onIcon={<Moon />}
      offIcon={<Sun />}
      checked={
        theme === "dark" || (theme === "system" && systemTheme === "dark")
      }
      onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}
