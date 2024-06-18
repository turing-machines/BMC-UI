import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface RebootModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReboot: () => void;
  title: string;
  message: string | React.ReactNode;
  isPending?: boolean;
}

export default function RebootModal({
  isOpen,
  onClose,
  onReboot,
  title,
  message,
  isPending = false,
}: RebootModalProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className={cn("modal-rounded", "p-6")}>
          <DialogHeader>
            <DialogTitle className="mb-4">{title}</DialogTitle>
            {typeof message === "string" ? (
              <DialogDescription>{message}</DialogDescription>
            ) : (
              message
            )}
          </DialogHeader>
          <DialogFooter className="mt-2">
            <Button type="button" variant="bw" onClick={onClose}>
              {t("ui.cancel")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onReboot}
              disabled={isPending}
              isLoading={isPending}
            >
              {t("ui.reboot")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="mb-4">{title}</DrawerTitle>
          {typeof message === "string" ? (
            <DrawerDescription>{message}</DrawerDescription>
          ) : (
            message
          )}
        </DrawerHeader>
        <DrawerFooter className="mt-2">
          <DrawerClose asChild>
            <Button type="button" variant="bw" size="lg">
              {t("ui.cancel")}
            </Button>
          </DrawerClose>
          <Button
            type="button"
            variant="destructive"
            size="lg"
            onClick={onReboot}
            disabled={isPending}
            isLoading={isPending}
          >
            {t("ui.reboot")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
