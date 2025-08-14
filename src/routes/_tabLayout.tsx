import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Header from "@/components/header";
import NavigationLinks from "@/components/navigation-links";

export const Route = createFileRoute("/_tabLayout")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
        throw: true,
      });
    }
    return {};
  },
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header />

      <main className="w-full overflow-hidden border border-neutral-300 bg-white shadow-sm xl:w-300 dark:border-neutral-700 dark:bg-neutral-900">
        <NavigationLinks isDesktop />
        <div className="px-3 py-6 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
