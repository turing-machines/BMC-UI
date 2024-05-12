import { createLazyFileRoute } from "@tanstack/react-router";
import { filesize } from "filesize";
import { useState } from "react";

import RebootModal from "@/components/RebootModal";
import InfoSkeleton from "@/components/skeletons/info";
import TableItem from "@/components/TableItem";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { useBackupMutation } from "@/lib/api/file";
import { useCoolingDevicesQuery, useInfoTabData } from "@/lib/api/get";
import {
  useCoolingDeviceMutation,
  useNetworkResetMutation,
  useRebootBMCMutation,
  useReloadBMCMutation,
} from "@/lib/api/set";

const storageWarningPct = 75;
const storageDangerPct = 90;

const progressBarColor = (usedPct: number, darkMode = false) => {
  if (darkMode) {
    if (usedPct >= storageDangerPct) {
      return "dark:bg-red-500";
    } else if (usedPct >= storageWarningPct) {
      return "dark:bg-amber-400";
    } else {
      return "dark:bg-zinc-400";
    }
  } else {
    if (usedPct >= storageDangerPct) {
      return "bg-red-500";
    } else if (usedPct >= storageWarningPct) {
      return "bg-amber-400";
    } else {
      return "bg-zinc-400";
    }
  }
};

/**
 * Calculates the progress data based on the total bytes and free bytes.
 *
 * @param totalBytes - The total number of bytes.
 * @param freeBytes - The number of free bytes.
 * @returns An object containing the human-readable used bytes, total bytes, and used percentage.
 */
const progressData = (totalBytes: number, freeBytes: number) => {
  const usedBytes = totalBytes - freeBytes;
  const usedPct = (usedBytes / totalBytes) * 100;

  return {
    usedHuman: filesize(usedBytes, { standard: "jedec" }),
    totalHuman: filesize(totalBytes, { standard: "jedec" }),
    usedPct: Math.round(usedPct),
  };
};

export const Route = createLazyFileRoute("/_tabLayout/info")({
  component: Info,
  errorComponent: () => <div>Error loading Info</div>,
  pendingComponent: InfoSkeleton,
});

function Info() {
  const { toast } = useToast();
  const [rebootModalOpened, setRebootModalOpened] = useState(false);
  const { data } = useInfoTabData();
  const { data: coolingDevices } = useCoolingDevicesQuery();
  const { mutate: mutateResetNetwork } = useNetworkResetMutation();
  const { mutate: mutateCoolingDevices } = useCoolingDeviceMutation();
  const { mutate: mutateRebootBMC, isPending: rebootPending } =
    useRebootBMCMutation();
  const { mutate: mutateReloadBMC } = useReloadBMCMutation();
  const { mutate: mutateBackup, isPending: backupPending } =
    useBackupMutation();

  const handleBackupSubmit = () => {
    mutateBackup(undefined, {
      onSuccess: (data) => {
        const { blob, filename } = data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast({
          title: "Backup successful",
          description: `Successfully downloaded backup file: ${filename}`,
        });
      },
      onError: (e) => {
        toast({
          title: "Backup failed",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleResetNetwork = () => {
    mutateResetNetwork(undefined, {
      onSuccess: () => {
        toast({
          title: "Network reset",
          description: "Network reset successful",
        });
      },
      onError: (e) => {
        toast({
          title: "Network reset failed",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleRebootBMC = () => {
    mutateRebootBMC(undefined, {
      onSuccess: () => {
        toast({ title: "Rebooting BMC", description: "The BMC is rebooting" });
        setRebootModalOpened(false);
      },
      onError: (e) => {
        toast({
          title: "Failed to reboot BMC",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleReloadBMC = () => {
    mutateReloadBMC(undefined, {
      onSuccess: () => {
        toast({
          title: "Reloading BMC daemon",
          description: "The BMC daemon is reloading",
        });
      },
      onError: (e) => {
        toast({
          title: "Failed to reload BMC daemon",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <TabView>
      <div>
        <div className="mb-6 text-lg font-bold">User Storage</div>
        <div className="space-y-4">
          {data.storage.map((storage) => {
            const { usedPct, usedHuman, totalHuman } = progressData(
              storage.total_bytes,
              storage.bytes_free
            );
            return (
              <div
                key={storage.name}
                className="flex items-center justify-between"
              >
                <div className="w-1/4 font-semibold">{storage.name}</div>
                <div className="relative w-2/4 lg:w-3/4">
                  <div className="flex h-5 overflow-hidden bg-zinc-200">
                    <div
                      className={`h-full ${progressBarColor(usedPct)} transition-all duration-500 ease-out ${progressBarColor(usedPct, true)}`}
                      style={{ width: `${usedPct}%` }}
                    />
                  </div>
                  <div className="absolute left-0 top-0 flex size-full items-center justify-center px-2 text-sm text-zinc-900">
                    {usedHuman} / {totalHuman}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <Button
            onClick={() => handleBackupSubmit()}
            disabled={backupPending}
            isLoading={backupPending}
          >
            Backup user data
          </Button>
        </div>
      </div>

      {coolingDevices.length > 0 && (
        <div>
          <div className="mb-6 text-lg font-bold">Fan control</div>
          <div className="space-y-4">
            {coolingDevices.map((coolingDevice) => {
              return (
                <div
                  key={coolingDevice.device}
                  className="flex items-center justify-between"
                >
                  <div className="w-1/4 font-semibold">
                    {coolingDevice.device}
                  </div>
                  <div className="flex w-2/4 items-center lg:w-3/4">
                    <Slider
                      defaultValue={[coolingDevice.speed]}
                      min={0}
                      max={coolingDevice.max_speed}
                      onValueCommit={(value) =>
                        mutateCoolingDevices({
                          device: coolingDevice.device,
                          speed: value[0],
                        })
                      }
                    />
                    <div className="flex w-1/5 justify-end font-semibold lg:w-1/12">
                      {(coolingDevice.speed / coolingDevice.max_speed) * 100}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="mb-6 text-lg font-bold">Network interfaces</div>
        <div className="space-y-4">
          {data.ip.map((ip) => (
            <dl key={ip.device}>
              <TableItem term={ip.device} />
              <TableItem term="ip">{ip.ip}</TableItem>
              <TableItem term="mac">{ip.mac}</TableItem>
            </dl>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={() => handleResetNetwork()}>Reset network</Button>
        </div>
      </div>

      <div>
        <div className="mb-6 text-lg font-bold">BMC</div>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={() => setRebootModalOpened(true)}
          >
            Reboot
          </Button>
          <Button variant="bw" onClick={() => handleReloadBMC()}>
            Reload daemon
          </Button>
        </div>
      </div>

      <RebootModal
        isOpen={rebootModalOpened}
        onClose={() => setRebootModalOpened(false)}
        onReboot={handleRebootBMC}
        title="Do you want to reboot?"
        message="Be aware that the nodes will lose power until booted."
        isPending={rebootPending}
      />
    </TabView>
  );
}
