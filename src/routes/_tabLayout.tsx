import {
  createFileRoute,
  Link,
  type LinkProps,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import Logo from "@/assets/logo-light.svg?react";
import BasicInfo from "@/components/BasicInfo";
import ThemeToggle from "@/components/theme-toggle";

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
      className="w-full py-3.5 text-center text-base font-semibold hover:bg-white dark:hover:bg-neutral-800"
      activeProps={{
        className:
          "border-t-2 border-neutral-300 bg-white outline-none dark:border-neutral-700 dark:bg-neutral-900 hover:bg-white dark:hover:bg-neutral-900",
      }}
    >
      {children}
    </Link>
  );
}

function AppLayoutComponent() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <header className="flex w-full items-center justify-between px-5 py-8 xl:w-[75rem] xl:px-0">
        <div className="flex items-center">
          <Logo className="mr-4 size-16 dark:fill-neutral-100" />
          <BasicInfo />
        </div>
        <ThemeToggle />
      </header>

      <main className="w-full overflow-hidden border border-neutral-300 bg-white shadow dark:border-neutral-700 dark:bg-neutral-900 xl:w-[75rem]">
        <nav className="flex justify-around bg-turing-bg dark:bg-turing-bg-dark">
          <TabLink to="/info">Info</TabLink>
          <TabLink to="/nodes">Nodes</TabLink>
          <TabLink to="/usb">USB</TabLink>
          <TabLink to="/firmware-upgrade">Firmware Upgrade</TabLink>
          <TabLink to="/flash-node">Flash Node</TabLink>
          <TabLink to="/about">About</TabLink>
        </nav>
        <div className="px-3 py-6 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
