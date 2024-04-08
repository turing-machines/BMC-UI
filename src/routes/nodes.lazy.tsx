import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/nodes")({
  component: Nodes,
});

// @ts-expect-error Just an example
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NodeExample = () => {
     <div data-node-id="1" className="nodes-list__item">
      <div className="nodes-list__item-inner">
          <div className="state-col">
              
              <div className="state-indicator btn">
                  <div className="switch">
                      <input data-node-id="1" id="node-1" type="checkbox" className="node-power" />
                      <label htmlFor="node-1" className="switch-label">
                          <span className="switch-btn"></span>
                      </label>
                  </div>
              </div>
              
              <button type="button" className="btn node-restart btn-turing-small-red">
          <span className="caption">
              Restart
          </span>
              </button>
          
          </div>
          <div className="info-col">
              <label className="input-wrap name">
                  <span className="label">Name</span>
                  <input type="text" value="my raspberry" data-field="name" />
              </label>
              <label className="input-wrap module_name">
                  <span className="label">Module Name</span>
                  <input type="text" value="Nvidia Jetson nano" data-field="module_name" />
              </label>
          </div>
      </div>
  </div>
}

function Nodes() {
  return (
    <div data-tab="Nodes" className="tabs-body__item ">
      <div className="form">
        <div className="form-group row">
          <div className="text-content">
            <p>Control the power supply of connected nodes:</p>
          </div>
        </div>

        <div className="nodes-group">
          <div className="nodes-list">
            <div className="node-list-item__skeleton skeleton-loading"></div>
            <div className="node-list-item__skeleton skeleton-loading"></div>
            <div className="node-list-item__skeleton skeleton-loading"></div>
            <div className="node-list-item__skeleton skeleton-loading"></div>
          </div>
          <div className="nodes-group__actions">
            <div className="actions-row skeleton-loading">
              <button
                type="button"
                className="nodes-edit btn btn-turing-small-dark"
              >
                <span className="caption">Edit</span>
              </button>

              <button
                type="button"
                className="nodes-save btn btn-turing-small-yellow"
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
