import {
  createFileRoute,
  Link,
  type LinkProps,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import Logo from "@/assets/logo.svg?react";
import BasicInfo from "@/components/BasicInfo";

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

function TabLink({ to, children }: LinkProps) {
  return (
    <Link
      to={to}
      viewTransition
      className="w-full py-3.5 text-center text-base font-semibold text-zinc-900 hover:bg-white"
      activeProps={{
        className: "border-t-2 border-zinc-300 bg-white outline-none",
      }}
    >
      {children}
    </Link>
  );
}

function AppLayoutComponent() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <header className="flex w-full py-8 lg:w-[75rem]">
        <Logo className="mr-4 size-16" />
        <BasicInfo />
      </header>

      <main className="w-full overflow-hidden border border-zinc-300 bg-white shadow lg:w-[75rem]">
        <nav className="flex justify-around bg-turing-bg">
          <TabLink to="/info">Info</TabLink>
          <TabLink to="/nodes">Nodes</TabLink>
          <TabLink to="/usb">USB</TabLink>
          <TabLink to="/firmware-upgrade">Firmware Upgrade</TabLink>
          <TabLink to="/flash-node">Flash Node</TabLink>
          <TabLink to="/about">About</TabLink>
        </nav>
        <div className="p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
