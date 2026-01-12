import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import NetworkSkeleton from "@/components/skeletons/network";
import TableItem from "@/components/TableItem";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useNetworkConfigQuery } from "@/lib/api/get";
import { useNetworkConfigMutation } from "@/lib/api/set";

const BONDING_MODES = [
  { value: "active-backup", requiresSwitch: false },
  { value: "balance-rr", requiresSwitch: true },
  { value: "balance-xor", requiresSwitch: true },
  { value: "broadcast", requiresSwitch: false },
  { value: "802.3ad", requiresSwitch: true },
  { value: "balance-tlb", requiresSwitch: false },
  { value: "balance-alb", requiresSwitch: false },
] as const;

export const Route = createLazyFileRoute("/_tabLayout/network")({
  component: Network,
  errorComponent: () => <div>Error loading Network settings</div>,
  pendingComponent: NetworkSkeleton,
});

function Network() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data } = useNetworkConfigQuery();
  const { mutate: mutateNetworkConfig, isPending } = useNetworkConfigMutation();

  const [enabled, setEnabled] = useState(data.bonding_enabled);
  const [mode, setMode] = useState(data.bonding_mode);

  const hasChanges = enabled !== data.bonding_enabled || mode !== data.bonding_mode;

  const selectedMode = BONDING_MODES.find((m) => m.value === mode);

  const handleApply = () => {
    mutateNetworkConfig(
      { enabled, mode, apply: true },
      {
        onSuccess: () => {
          toast({
            title: t("network.header"),
            description: t("network.applySuccess"),
          });
        },
        onError: (e) => {
          toast({
            title: t("network.header"),
            description: e.message || t("network.applyFailed"),
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <TabView>
      <div>
        <div className="mb-6 text-lg font-bold">{t("network.header")}</div>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          {t("network.description")}
        </p>

        <div className="space-y-6">
          {/* Bonding Enable Toggle */}
          <div className="flex items-center justify-between">
            <div className="font-semibold">{t("network.enabled")}</div>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
              aria-label={t("network.enabled")}
            />
          </div>

          {/* Bonding Mode Select */}
          <div className="space-y-2">
            <div className="font-semibold">{t("network.mode")}</div>
            <Select value={mode} onValueChange={setMode} disabled={!enabled}>
              <SelectTrigger className="w-full" label={t("network.mode")}>
                <SelectValue placeholder={t("ui.selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {BONDING_MODES.map((bondMode) => (
                  <SelectItem key={bondMode.value} value={bondMode.value}>
                    {t(`network.modes.${bondMode.value}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedMode && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t(`network.modeDescriptions.${mode}`)}
              </p>
            )}
            {selectedMode && (
              <p
                className={`text-xs ${selectedMode.requiresSwitch ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"}`}
              >
                {selectedMode.requiresSwitch
                  ? t("network.switchRequired")
                  : t("network.switchNotRequired")}
              </p>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-6">
          <Button
            type="button"
            onClick={handleApply}
            isLoading={isPending}
            disabled={isPending || !hasChanges}
          >
            {t("network.applyButton")}
          </Button>
        </div>
      </div>

      {/* Current Status */}
      <div>
        <div className="mb-6 text-lg font-bold">{t("network.status")}</div>
        <div className="space-y-4">
          <dl>
            <TableItem term={t("network.status")}>
              <span
                className={
                  data.bonding_active
                    ? "text-green-600 dark:text-green-400"
                    : "text-neutral-500"
                }
              >
                {data.bonding_active
                  ? t("network.statusActive")
                  : t("network.statusInactive")}
              </span>
            </TableItem>
            <TableItem term={t("network.mode")}>
              {t(`network.modes.${data.bonding_mode}`)}
            </TableItem>
            <TableItem term={t("network.slaves")}>
              {data.slaves.length > 0 ? data.slaves.join(", ") : "—"}
            </TableItem>
          </dl>
        </div>
      </div>
    </TabView>
  );
}
