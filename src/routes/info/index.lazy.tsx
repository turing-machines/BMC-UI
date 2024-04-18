import { createLazyFileRoute } from "@tanstack/react-router";
import { useInfoTabData } from "../../services/api/calls";
import { filesize } from "filesize";

const progressData = (totalBytes: number, freeBytes: number) => {
  const used = totalBytes - freeBytes;
  const usedHuman = filesize(used, { round: 2 });
  const totalHuman = filesize(totalBytes, { round: 2 });
  const usedPct = (used / totalBytes) * 100;

  return {
    usedHuman,
    totalHuman,
    usedPct,
  };
};

export const Route = createLazyFileRoute("/info/")({
  component: Info,
  errorComponent: () => <div>Error loading Info</div>,
  pendingComponent: () => <div>Loading Info</div>,
});

function Info() {
  const { status, data, error, isFetching } = useInfoTabData();
  // throw new Error("Error loading Infsafa");

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
            {data.response[0]!.result[0].storage.map((storage) => {
              const formattedStorage = progressData(
                storage.total_bytes,
                storage.bytes_free
              );
              return (
                <div className="row">
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
          <div id="tableNetworkInfo" className="table-specification">
            <div className="row">
              <div className="col">eth0</div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col">ip</div>
              <div className="col">10.0.0.163</div>
            </div>
            <div className="row">
              <div className="col">mac</div>
              <div className="col">02:00:16:4e:70:e4</div>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <button type="submit" className="btn btn-turing-small-yellow">
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
            id="reboot-btn"
            className="btn btn-turing-small-red"
          >
            <span className="caption">Reboot</span>
          </button>
          <div id="reload-btn" className="btn btn-turing-small-dark">
            <span className="caption">Reload daemon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
