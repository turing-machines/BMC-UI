import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

export default function NodesSkeleton() {
  return (
    <div data-tab="Nodes" className="tabs-body__item">
      <div className="form">
        <div className="form-group row">
          <div className="text-content">
            <p>Control the power supply of connected nodes:</p>
          </div>
        </div>

        <div className="nodes-group">
          <div className="nodes-list">
            {[...Array<number>(4)].map((_, index) => (
              <div key={index} className="nodes-list__item">
                <div className="nodes-list__item-inner">
                  <Skeleton width={500} height={44} />
                </div>
              </div>
            ))}
          </div>
          <div className="nodes-group__actions">
            <div className="actions-row">
              <button
                type="button"
                className="nodes-edit btn btn-turing-small-dark"
                disabled
              >
                <span className="caption">Edit</span>
              </button>

              <button
                type="button"
                className="nodes-save btn btn-turing-small-yellow"
                disabled
              >
                <span className="caption">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
