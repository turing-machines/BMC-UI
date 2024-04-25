import { createLazyFileRoute } from "@tanstack/react-router";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { version } from "../../../package.json";
import { useAboutTabData } from "../../services/api/get";
import AboutSkeleton from "./-components/skeleton";

export const Route = createLazyFileRoute("/about/")({
  component: About,
  pendingComponent: AboutSkeleton,
});

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

function About() {
  const { data } = useAboutTabData();

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
                {data.buildtime.toLocaleString()} ({timeAgo.format(new Date(data.buildtime))})
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
