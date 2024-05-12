import { createLazyFileRoute } from "@tanstack/react-router";
import type { AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import { useEffect, useRef, useState } from "react";

import ConfirmationModal from "@/components/ConfirmationModal";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNodeUpdateMutation } from "@/lib/api/file";
import { useFlashStatusQuery } from "@/lib/api/get";

export const Route = createLazyFileRoute("/_tabLayout/flash-node")({
  component: Flash,
});

interface SelectOption {
  value: string;
  label: string;
}

const nodeOptions: SelectOption[] = [
  { value: "0", label: "Node 1" },
  { value: "1", label: "Node 2" },
  { value: "2", label: "Node 3" },
  { value: "3", label: "Node 4" },
];

function Flash() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [confirmFlashModal, setConfirmFlashModal] = useState(false);

  const [isFlashing, setIsFlashing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [progress, setProgress] = useState<{
    transferred: string;
    total?: string;
    pct: number;
  }>({ transferred: "", total: "", pct: 0 });
  const uploadProgressCallback = (progressEvent: AxiosProgressEvent) => {
    setProgress({
      transferred: filesize(progressEvent.loaded ?? 0, { standard: "jedec" }),
      total: progressEvent.total
        ? filesize(progressEvent.total, { standard: "jedec" })
        : undefined,
      pct: progressEvent.total
        ? Math.round((progressEvent.loaded / (progressEvent.total ?? 1)) * 100)
        : 100,
    });
  };
  const {
    mutate: mutateNodeUpdate,
    isIdle,
    isPending,
  } = useNodeUpdateMutation(uploadProgressCallback);
  const { data, refetch } = useFlashStatusQuery(isFlashing);

  useEffect(() => {
    if (isFlashing && data?.Error) {
      setStatusMessage(data.Error);
      toast({
        title: "An error has occurred",
        description: data.Error,
        variant: "destructive",
      });
      setIsFlashing(false);
    } else if (!isFlashing && data?.Transferring) {
      setIsFlashing(true);
      const msg = (
        formRef.current?.elements.namedItem("skipCrc") as HTMLInputElement
      ).checked
        ? "Transferring image to the node..."
        : "Checking CRC and transferring image to the node...";
      setStatusMessage(msg);

      // Update progress bar using bytes_written from Transferring data
      const bytesWritten = data.Transferring.bytes_written ?? 0;
      setProgress({
        transferred: `${filesize(bytesWritten, { standard: "jedec" })} written`,
        total: undefined,
        pct: 100,
      });
    } else if (isFlashing && data?.Done) {
      setIsFlashing(false);
      const msg = "Image flashed successfully to the node";
      setStatusMessage(msg);
      toast({ title: "Flashing successful", description: msg });
    }
  }, [data]);

  const handleSubmit = () => {
    if (formRef.current) {
      setConfirmFlashModal(false);
      const form = formRef.current;

      const nodeId = (form.elements.namedItem("node") as HTMLSelectElement)
        .selectedOptions[0].value;
      const file = (form.elements.namedItem("file") as HTMLInputElement)
        .files?.[0];

      console.log("file", file);
      const url = (form.elements.namedItem("file-url") as HTMLInputElement)
        .value;

      console.log("url", url);
      const sha256 = (form.elements.namedItem("sha256") as HTMLInputElement)
        .value;
      const skipCRC = (form.elements.namedItem("skipCrc") as HTMLInputElement)
        .checked;

      setStatusMessage(`Transferring image to node ${nodeId + 1}...`);
      mutateNodeUpdate(
        { nodeId: Number.parseInt(nodeId), file, url, sha256, skipCRC },
        {
          onSuccess: () => {
            void refetch();
          },
          onError: () => {
            const msg = `Failed to transfer the image to node ${nodeId + 1}`;
            setStatusMessage(msg);
            toast({
              title: "Flashing failed",
              description: msg,
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  return (
    <TabView title="Install an OS image on a selected node">
      <form ref={formRef}>
        <div className="mb-4">
          <Select name="node">
            <SelectTrigger label="Selected node">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {nodeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Input
            type="file"
            name="file"
            label="File (remote or local):"
            accept=".img,.bin,.xz,application/octet-stream"
          />
        </div>

        <div className="mb-4">
          <Input name="sha256" label="SHA-256 (optional):" />
        </div>

        <div className="mb-4 flex flex-wrap items-center">
          <Button
            type="button"
            onClick={() => setConfirmFlashModal(true)}
            disabled={isPending || isFlashing}
            isLoading={isPending || isFlashing}
          >
            Install OS
          </Button>
          <label className="flex cursor-pointer items-center pl-4">
            <Checkbox id="skipCrc" name="skipCrc" aria-label="Skip CRC" />
            <label htmlFor="skipCrc" className="not-sr-only ml-2 text-sm font-semibold">Skip CRC</label>
          </label>
        </div>

        <div className={`mt-4 ${isIdle ? "hidden" : "block"}`}>
          <div className="relative">
            <div className="h-5 overflow-hidden bg-zinc-200">
              <div
                className={`h-full bg-turing-btn-hover transition-all duration-500 ease-out ${
                  !isPending && !isFlashing ? "" : "animate-pulse"
                }`}
                style={{ width: `${progress.pct}%` }}
              ></div>
            </div>
            <div className="absolute left-0 top-0 flex size-full items-center justify-center px-4 text-xs text-zinc-500">
              {progress.transferred}
              {progress.total ? ` / ${progress.total}` : ""}
            </div>
          </div>
          <div className="mt-2 text-sm">{statusMessage}</div>
        </div>
      </form>
      <ConfirmationModal
        isOpen={confirmFlashModal}
        onClose={() => setConfirmFlashModal(false)}
        onConfirm={handleSubmit}
        title="Install OS Image"
        message="You are about to overwrite a new image to the selected node."
        confirmText="Continue"
        cancelText="Cancel"
      />
    </TabView>
  );
}
