import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

import { Switch } from "@/components/ui/switch";

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      aria-label={t("ui.ariaThemeToggle")}
      onIcon={<Moon />}
      offIcon={<Sun />}
      checked={
        theme === "dark" || (theme === "system" && systemTheme === "dark")
      }
      onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}
