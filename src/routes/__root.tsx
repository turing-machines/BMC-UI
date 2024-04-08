/// <reference types="vite-plugin-svgr/client" />
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Logo from "../assets/logo.svg?react";
import "../css/app.scss";

export const Route = createRootRoute({
  component: () => (
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
                <div className="label">hostname</div>
                <div className="hostname">turing</div>
              </div>
              <div className="app-version">
                <div className="label">daemon</div>
                <div className="daemon-version">1.0.0</div>
              </div>
            </div>
          </div>

          <div className="tabs-wrapper">
            <div className="tabs-header">
              <ul className="tabs-header__list">
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
              </ul>
            </div>
            <div className="tabs-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
