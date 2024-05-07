import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";

import Logo from "../assets/logo.svg?react";
import BasicInfo from "../components/BasicInfo";

export const Route = createFileRoute("/_tabLayout")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
    return {};
  },
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <div className="app-wrapper">
      <div>
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
            <Link to="/flash-node" className="tabs-header__list-item">
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
      <div className="copyright">
        <p className="copyright__text">© TURING MACHINES INC.</p>
      </div>
    </div>
  );
}
