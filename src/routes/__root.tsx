/// <reference types="vite-plugin-svgr/client" />
import "../css/app.scss";
import "react-responsive-modal/styles.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";

import Logo from "../assets/logo.svg?react";
import BasicInfo from "../components/BasicInfo";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <div className="app-wrapper">
            <div className="app-header">
              <div className="logo">
                <Logo />
              </div>
              <BasicInfo />
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
