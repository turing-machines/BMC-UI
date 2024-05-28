import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { type ReactNode, useMemo } from "react";

const navigationLinks = [
  { to: "/info", label: "Info" },
  { to: "/nodes", label: "Nodes" },
  { to: "/usb", label: "USB" },
  { to: "/firmware-upgrade", label: "Firmware Upgrade" },
  { to: "/flash-node", label: "Flash Node" },
  { to: "/about", label: "About" },
] as const;

function MobileLink({
  to,
  children,
  onClick,
}: LinkProps & { onClick?: () => void; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="mx-2 flex items-center justify-between text-lg font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
      activeProps={{
        className: "text-neutral-900 dark:text-neutral-200",
      }}
      onClick={onClick}
    >
      {children}
      <ArrowRightIcon />
    </Link>
  );
}

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

export default function NavigationLinks({
  isDesktop,
  onClick,
}: {
  isDesktop: boolean;
  onClick?: () => void;
}) {
  const renderLinks = useMemo(
    () =>
      navigationLinks.map(({ to, label }) => (
        <TabLink key={to} to={to}>
          {label}
        </TabLink>
      )),
    []
  );

  const renderMobileLinks = useMemo(
    () =>
      navigationLinks.map(({ to, label }) => (
        <MobileLink key={to} to={to} onClick={onClick}>
          {label}
        </MobileLink>
      )),
    []
  );

  if (isDesktop)
    return (
      <nav className="hidden justify-around bg-turing-bg dark:bg-turing-bg-dark md:flex">
        {renderLinks}
      </nav>
    );

  return <nav className="flex flex-col gap-5">{renderMobileLinks}</nav>;
}
