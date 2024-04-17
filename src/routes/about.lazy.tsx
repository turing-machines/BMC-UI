import { createLazyFileRoute } from "@tanstack/react-router";
import { version } from "../../package.json";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div data-tab="About" className="tabs-body__item">
      <form className="form" id="form-about">
        <div className="form-group row">
          <div className="table-specification">
            <div className="row">
              <div className="col">Host name:</div>
              <div id="aboutHostname" className="col"></div>
            </div>
            <div className="row">
              <div className="col">Daemon version:</div>
              <div id="aboutVer" className="col"></div>
            </div>
            <div className="row">
              <div className="col">Build time:</div>
              <div id="aboutBuildtime" className="col"></div>
            </div>
            <div className="row">
              <div className="col">Build version:</div>
              <div id="aboutBuildVer" className="col"></div>
            </div>
            <div className="row">
              <div className="col">Buildroot release:</div>
              <div id="aboutBuildroot" className="col"></div>
            </div>
            <div className="row">
              <div className="col">API version:</div>
              <div id="aboutApi" className="col"></div>
            </div>
            <div className="row">
              <div className="col">BMC UI:</div>
              <div id="aboutUi" className="col">
                v{version}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
