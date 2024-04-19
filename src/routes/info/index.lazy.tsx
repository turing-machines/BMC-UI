import { createLazyFileRoute } from "@tanstack/react-router";
import { useInfoTabData } from "../../services/api/get";
import { filesize } from "filesize";
import { useNetworkResetMutation, useRebootBMCMutation, useReloadBMCMutation } from "../../services/api/set";

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
    usedHuman: filesize(usedBytes, { round: 2, standard: "jedec" }),
    totalHuman: filesize(totalBytes, { round: 2, standard: "jedec" }),
    usedPct: Math.round(usedPct),
  };
};

export const Route = createLazyFileRoute("/info/")({
  component: Info,
  errorComponent: () => <div>Error loading Info</div>,
  pendingComponent: () => <div>Loading Info</div>,
});

function Info() {
  const { data } = useInfoTabData();
  const { mutate: mutateResetNetwork } = useNetworkResetMutation();
  const { mutate: mutateRebootBMC } = useRebootBMCMutation();
  const { mutate: mutateReloadBMC } = useReloadBMCMutation();

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
            {data.response[0]!.result.storage.map((storage) => {
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
          <button type="submit" className="btn btn-turing-small-yellow">
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
          {data.response[0]!.result.ip.map((ip) => (
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
            onClick={() => mutateResetNetwork()}
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
            onClick={() => mutateRebootBMC()}
          >
            <span className="caption">Reboot</span>
          </button>
          <div id="reload-btn" className="btn btn-turing-small-dark" onClick={() => mutateReloadBMC()}>
            <span className="caption">Reload daemon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
