import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

export default function AboutSkeleton() {
  return (
    <div data-tab="About" className="tabs-body__item">
      <form className="form" id="form-about">
        <div className="form-group row">
          <div className="table-specification">
            <div className="row">
              <div className="col">Host name:</div>
              <div id="aboutHostname" className="col">
                <Skeleton width={100} />
              </div>
            </div>
            <div className="row">
              <div className="col">Daemon version:</div>
              <div id="aboutVer" className="col">
                <Skeleton width={100} />
              </div>
            </div>
            <div className="row">
              <div className="col">Build time:</div>
              <div id="aboutBuildtime" className="col">
                <Skeleton width={300} />
              </div>
            </div>
            <div className="row">
              <div className="col">Build version:</div>
              <div id="aboutBuildVer" className="col">
                <Skeleton width={100} />
              </div>
            </div>
            <div className="row">
              <div className="col">Buildroot release:</div>
              <div id="aboutBuildroot" className="col">
                <Skeleton width={200} />
              </div>
            </div>
            <div className="row">
              <div className="col">API version:</div>
              <div id="aboutApi" className="col">
                <Skeleton width={100} />
              </div>
            </div>
            <div className="row">
              <div className="col">BMC UI:</div>
              <div id="aboutUi" className="col">
                <Skeleton width={100} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}