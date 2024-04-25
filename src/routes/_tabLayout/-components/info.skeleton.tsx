import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

export default function InfoSkeleton() {
  return (
    <div data-tab="Info" className="tabs-body__item">
      <form className="form" id="form-storage">
        <div className="form-group row">
          <div className="text-content">
            <p>User Storage</p>
          </div>
        </div>
        <div className="form-group row">
          <div id="tableStorageInfo" className="table-specification">
            <div className="row">
              <div className="col">
                <Skeleton width={100} />
              </div>
              <div className="col">
                <div className="progress-bar-group form-group active">
                  <Skeleton height={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <button
            type="button"
            className="btn btn-turing-small-yellow"
            disabled
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
          <div id="tableNetworkInfo" className="table-specification">
            <div className="row">
              <div className="col">
                <Skeleton width={100} />
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col">ip</div>
              <div className="col">
                <Skeleton width={100} />
              </div>
            </div>
            <div className="row">
              <div className="col">mac</div>
              <div className="col">
                <Skeleton width={100} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <button
            type="button"
            className="btn btn-turing-small-yellow"
            disabled
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
          <button type="button" className="btn btn-turing-small-red" disabled>
            <span className="caption">Reboot</span>
          </button>
          <button
            id="reload-btn"
            className="btn btn-turing-small-dark"
            disabled
          >
            <span className="caption">Reload daemon</span>
          </button>
        </div>
      </div>
    </div>
  );
}
