import { createLazyFileRoute } from "@tanstack/react-router";
import { filesize } from "filesize";
import { useState } from "react";
import { toast } from "react-toastify";

import RebootModal from "../../components/RebootModal";
import { useBackupMutation } from "../../services/api/file";
import { useInfoTabData } from "../../services/api/get";
import {
  useNetworkResetMutation,
  useRebootBMCMutation,
  useReloadBMCMutation,
} from "../../services/api/set";
import InfoSkeleton from "./-components/info.skeleton";

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
  const [rebootModalOpened, setRebootModalOpened] = useState(false);
  const { data } = useInfoTabData();
  const { mutate: mutateResetNetwork } = useNetworkResetMutation();
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
        toast.success(`Successfully downloaded backup file: ${filename}`);
      },
      onError: () => {
        toast.error("Failed to download backup file");
      },
    });
  };

  const handleResetNetwork = () => {
    mutateResetNetwork(undefined, {
      onSuccess: () => {
        toast.success("Network reset successfully");
      },
      onError: () => {
        toast.error("Failed to reset network");
      },
    });
  };

  const handleRebootBMC = () => {
    mutateRebootBMC(undefined, {
      onSuccess: () => {
        toast.success("Rebooting BMC...");
        setRebootModalOpened(false);
      },
      onError: () => {
        toast.error("Failed to reboot BMC");
      },
    });
  };

  const handleReloadBMC = () => {
    mutateReloadBMC(undefined, {
      onSuccess: () => {
        toast.success("Reloading BMC daemon...");
      },
      onError: () => {
        toast.error("Failed to reload BMC daemon");
      },
    });
  };

  return (
    <div data-tab="Info" className="tabs-body__item ">
      <form className="form" id="form-storage">
        <div className="form-group row">
          <div className="text-content">
            <p>User Storage</p>
          </div>
        </div>
        <div className="form-group row">
          <div id="tableStorageInfo" className="table-specification">
            {data.storage.map((storage) => {
              const formattedStorage = progressData(
                storage.total_bytes,
                storage.bytes_free
              );
              return (
                <div className="row" key={storage.name}>
                  <div className="col">{storage.name}</div>
                  <div className="col">
                    <div className="progress-bar-group form-group active">
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar loaded"
                          style={{ width: `${formattedStorage.usedPct}%` }}
                        ></div>
                        <div className="progress-bar-caption">
                          {formattedStorage.usedHuman} /{" "}
                          {formattedStorage.totalHuman}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-group row">
          <button
            type="button"
            className={`btn btn-turing-small-yellow ${backupPending ? "loading" : ""}`}
            disabled={backupPending}
            onClick={() => handleBackupSubmit()}
          >
            <span className="caption">Backup user data</span>
          </button>
        </div>
        <div className="form-group row"></div>
      </form>
      <form className="form" id="form-network">
        <div className="form-group row">
          <div className="text-content">
            <p>Network interfaces</p>
          </div>
        </div>
        <div className="form-group row">
          {data.ip.map((ip) => (
            <div
              id="tableNetworkInfo"
              className="table-specification"
              key={ip.device}
            >
              <div className="row">
                <div className="col">{ip.device}</div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col">ip</div>
                <div className="col">{ip.ip}</div>
              </div>
              <div className="row">
                <div className="col">mac</div>
                <div className="col">{ip.mac}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="form-group row">
          <button
            type="button"
            className="btn btn-turing-small-yellow"
            onClick={() => handleResetNetwork()}
          >
            <span className="caption">Reset network</span>
          </button>
        </div>
        <div className="form-group row"></div>
      </form>
      <div className="form">
        <div className="form-group row">
          <div className="text-content">
            <p>BMC</p>
          </div>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-turing-small-red"
            onClick={() => setRebootModalOpened(true)}
          >
            <span className="caption">Reboot</span>
          </button>
          <div
            id="reload-btn"
            className="btn btn-turing-small-dark"
            onClick={() => handleReloadBMC()}
          >
            <span className="caption">Reload daemon</span>
          </div>
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
    </div>
  );
}
