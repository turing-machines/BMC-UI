/// <reference types="vite-plugin-svgr/client" />
import "../css/app.scss";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";

import Logo from "../assets/logo.svg?react";
import { UseBasicInfo } from "../contexts/basicInfo";

export const Route = createRootRoute({
  component: () => {
    const { hostname, version } = UseBasicInfo();

    return (
      <>
        <div>
          <div className="app-wrapper">
            <div className="app-header">
              <div className="logo">
                <Logo />
              </div>
              <div className="app-info">
                <h1 className="h3 app-title">Turing PI</h1>
                <div className="app-version">
                  <div className="app-version-item">
                    <div className="label">hostname</div>
                    <div className="hostname">{hostname}</div>
                  </div>
                  <div className="app-version-item">
                    <div className="label">daemon</div>
                    <div className="daemon-version">v{version}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tabs-wrapper">
              <div className="tabs-header tabs-header__list">
                <Link to="/info" className="tabs-header__list-item">
                  Info
                </Link>
                <Link to="/nodes" className="tabs-header__list-item">
                  Nodes
                </Link>
                <Link to="/usb" className="tabs-header__list-item">
                  USB
                </Link>
                <Link
                  to="/firmware-upgrade"
                  className="tabs-header__list-item large"
                >
                  Firmware Upgrade
                </Link>
                <Link to="/node-upgrade" className="tabs-header__list-item">
                  Flash Node
                </Link>
                <Link to="/about" className="tabs-header__list-item">
                  About
                </Link>
              </div>
              <div className="tabs-body">
                <Outlet />
              </div>
              <ToastContainer position="bottom-right" stacked />
            </div>
          </div>
        </div>
        <hr />
        <ReactQueryDevtools />
      </>
    );
  },
});
