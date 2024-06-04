import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { type ReactNode, useMemo } from "react";

import { useFlash } from "@/hooks/use-flash";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { to: "/info", label: "Info" },
  { to: "/nodes", label: "Nodes" },
  { to: "/usb", label: "USB" },
  { to: "/firmware-upgrade", label: "Firmware Upgrade" },
  { to: "/flash-node", label: "Flash Node" },
  { to: "/about", label: "About" },
] as const;

interface FlashingLinkProps {
  isFlashing: boolean;
}

function MobileLink({
  to,
  children,
  onClick,
  isFlashing,
}: LinkProps &
  FlashingLinkProps & { onClick?: () => void; children: ReactNode }) {
  return (
    <Link
      to={to}
      className={cn(
        "mx-2 flex items-center justify-between text-lg font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200",
        isFlashing && "animate-pulse duration-700"
      )}
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

function TabLink({ to, children, isFlashing }: LinkProps & FlashingLinkProps) {
  return (
    <Link
      to={to}
      viewTransition
      className={cn(
        "w-full py-3.5 text-center text-base font-semibold hover:bg-white dark:hover:bg-neutral-800",
        isFlashing && "animate-pulse duration-700"
      )}
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
  const { flashType, isFlashing } = useFlash();

  const renderLinks = useMemo(
    () =>
      navigationLinks.map(({ to, label }) => {
        const isNodeFlashing =
          isFlashing && flashType === "node" && to === "/flash-node";
        const isFirmwareFlashing =
          isFlashing && flashType === "firmware" && to === "/firmware-upgrade";

        return (
          <TabLink
            key={to}
            to={to}
            isFlashing={isNodeFlashing || isFirmwareFlashing}
          >
            {label}
          </TabLink>
        );
      }),
    [isFlashing, flashType]
  );

  const renderMobileLinks = useMemo(
    () =>
      navigationLinks.map(({ to, label }) => {
        const isNodeFlashing =
          isFlashing && flashType === "node" && to === "/flash-node";
        const isFirmwareFlashing =
          isFlashing && flashType === "firmware" && to === "/firmware-upgrade";

        return (
          <MobileLink
            key={to}
            to={to}
            onClick={onClick}
            isFlashing={isNodeFlashing || isFirmwareFlashing}
          >
            {label}
          </MobileLink>
        );
      }),
    [isFlashing, flashType, onClick]
  );

  if (isDesktop)
    return (
      <nav className="hidden justify-around bg-turing-bg dark:bg-turing-bg-dark md:flex">
        {renderLinks}
      </nav>
    );

  return <nav className="flex flex-col gap-5">{renderMobileLinks}</nav>;
}
