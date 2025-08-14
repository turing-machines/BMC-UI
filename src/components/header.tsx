import { MenuIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Logo from "@/assets/logo-light.svg?react";
import BasicInfo from "@/components/BasicInfo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { UserNav } from "@/components/user-nav";
import { useMediaQuery } from "@/hooks/use-media-query";

import NavigationLinks from "./navigation-links";

export default function Header() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  if (isDesktop)
    return (
      <header className="flex w-full items-center justify-between px-5 py-8 xl:w-300 xl:px-0">
        <div className="flex items-center">
          <Logo className="mr-4 size-16 dark:fill-neutral-100" />
          <BasicInfo />
        </div>
        <UserNav />
      </header>
    );

  return (
    <header className="flex w-full items-center justify-between p-4 xl:w-300 xl:px-0">
      <div className="flex items-center">
        <Logo className="mr-4 size-12 dark:fill-neutral-100" />
        <p className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Turing Pi
        </p>
      </div>
      <Button
        variant="bwSquare"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
      </Button>
      <Drawer
        direction="right"
        open={!isDesktop && isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <DrawerContent className="h-full" direction="right">
          <DrawerHeader className="text-left">
            <DrawerTitle className="mt-1 mb-4 flex items-center justify-between">
              <span className="text-xl text-neutral-900 dark:text-neutral-200">
                {t("ui.navigation")}
              </span>
              <DrawerClose asChild>
                <Button type="button" variant="bwSquare" size="icon">
                  <XIcon />
                </Button>
              </DrawerClose>
            </DrawerTitle>
            <NavigationLinks
              isDesktop={isDesktop}
              onClick={() => setIsOpen(false)}
            />
          </DrawerHeader>
          <DrawerFooter className="items-end">
            <UserNav />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
