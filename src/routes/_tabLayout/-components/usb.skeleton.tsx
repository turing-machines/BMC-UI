import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

export default function USBSkeleton() {
  return (
    <div data-tab="USB" className="tabs-body__item">
      <form className="form" id="form-usb">
        <div className="form-group row">
          <div className="text-content">
            <p>USB route:</p>
          </div>
        </div>
        <div className="form-group row">
          <div className="select-item-skeleton-tula">
            <Skeleton height="100%"  />
          </div>
        </div>

        <div className="form-group row">
          <div className="select-item-skeleton-tula">
            <Skeleton height="100%" />
          </div>
        </div>

        <div className="form-group row">
          <button
            type="submit"
            className="btn btn-turing-small-yellow"
            disabled
          >
            <span className="caption">Change</span>
          </button>
        </div>

        <br />
        <div>
          <div className="text-content">
            <div className="form-group row">
              <h5>USB Mode Definitions:</h5>
              <div className="tooltip-wrap">
                <div className="tp-notice notice-grey">
                  <div className="tp-notice__caption">
                    <Skeleton width={70} height={24} />
                  </div>
                </div>
              </div>

              <div className="tooltip-wrap">
                <div className="tp-notice notice-purple">
                  <div className="tp-notice__caption">
                    <Skeleton width={70} height={24} />
                  </div>
                </div>
              </div>

              <div className="tooltip-wrap">
                <div className="tp-notice notice-red">
                  <div className="tp-notice__caption">
                    <Skeleton width={70} height={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
