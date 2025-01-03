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

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | React.ReactNode;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const messageContent =
    typeof message === "string" ? (
      <DialogDescription>{message}</DialogDescription>
    ) : (
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        {message}
      </div>
    );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className={cn("modal-rounded", "p-6")}>
          <DialogHeader>
            <DialogTitle className="mb-4">{title}</DialogTitle>
            {messageContent}
          </DialogHeader>
          <DialogFooter className="mt-2">
            <Button type="button" variant="bw" onClick={onClose}>
              {t("ui.cancel")}
            </Button>
            <Button type="button" onClick={onConfirm}>
              {t("ui.continue")}
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
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {message}
            </div>
          )}
        </DrawerHeader>
        <DrawerFooter className="mt-2">
          <DrawerClose asChild>
            <Button type="button" variant="bw" size="lg">
              {t("ui.cancel")}
            </Button>
          </DrawerClose>
          <Button type="button" size="lg" onClick={onConfirm}>
            {t("ui.continue")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
