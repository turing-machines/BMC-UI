import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

import { useAboutTabData } from "../services/api/get";

export default function BasicInfo() {
  const { data, isLoading } = useAboutTabData();

  if (isLoading) {
    return (
      <div className="app-info">
        <h1 className="h3 app-title">Turing PI</h1>
        <div className="app-version">
          <div className="app-version-item">
            <div className="label">hostname</div>
            <div className="hostname">
              <Skeleton width={100} />
            </div>
          </div>
          <div className="app-version-item">
            <div className="label">daemon</div>
            <div className="daemon-version">
              <Skeleton width={80} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-info">
      <h1 className="h3 app-title">Turing PI</h1>
      <div className="app-version">
        <div className="app-version-item">
          <div className="label">hostname</div>
          <div className="hostname">{data.hostname}</div>
        </div>
        <div className="app-version-item">
          <div className="label">daemon</div>
          <div className="daemon-version">v{data.version}</div>
        </div>
      </div>
    </div>
  );
}
