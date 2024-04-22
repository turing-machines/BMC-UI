import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { version } from "../../../package.json";
import { UseBasicInfo } from "../../contexts/basicInfo";
import { useAboutTabData } from "../../services/api/get";

export const Route = createLazyFileRoute("/about/")({
  component: About,
});

function About() {
  const { data } = useAboutTabData();
  const { updateBasicInfo } = UseBasicInfo();

  useEffect(() => {
    if (data) {
      updateBasicInfo(data.hostname, data.version);
    }
  }, []);

  return (
    <div data-tab="About" className="tabs-body__item">
      <form className="form" id="form-about">
        <div className="form-group row">
          <div className="table-specification">
            <div className="row">
              <div className="col">Host name:</div>
              <div id="aboutHostname" className="col">
                {data.hostname}
              </div>
            </div>
            <div className="row">
              <div className="col">Daemon version:</div>
              <div id="aboutVer" className="col">
                v{data.version}
              </div>
            </div>
            <div className="row">
              <div className="col">Build time:</div>
              <div id="aboutBuildtime" className="col">
                {data.buildtime}
              </div>
            </div>
            <div className="row">
              <div className="col">Build version:</div>
              <div id="aboutBuildVer" className="col">
                {data.build_version}
              </div>
            </div>
            <div className="row">
              <div className="col">Buildroot release:</div>
              <div id="aboutBuildroot" className="col">
                {data.buildroot}
              </div>
            </div>
            <div className="row">
              <div className="col">API version:</div>
              <div id="aboutApi" className="col">
                v{data.api}
              </div>
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
