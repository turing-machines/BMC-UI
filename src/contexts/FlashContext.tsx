import { type AxiosProgressEvent } from "axios";
import { filesize } from "filesize";
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import RebootModal from "@/components/RebootModal";
import { toast } from "@/hooks/use-toast";
import {
  useFirmwareUpdateMutation,
  useNodeUpdateMutation,
} from "@/lib/api/file";
import {
  type FlashStatus,
  useFirmwareStatusQuery,
  useFlashStatusQuery,
} from "@/lib/api/get";
import { useRebootBMCMutation } from "@/lib/api/set";

type FlashType = "firmware" | "node" | null;

interface FlashContextValue {
  flashType: FlashType;
  setFlashType: React.Dispatch<React.SetStateAction<FlashType>>;
  isFlashing: boolean;
  statusMessage: string;
  firmwareUpdateMutation: ReturnType<typeof useFirmwareUpdateMutation>;
  nodeUpdateMutation: ReturnType<typeof useNodeUpdateMutation>;
  firmwareStatus: ReturnType<typeof useFirmwareStatusQuery>;
  flashStatus: ReturnType<typeof useFlashStatusQuery>;
  uploadProgress?: { transferred: string; total: string | null; pct: number };
  handleFirmwareUpload: (variables: {
    file?: File;
    url?: string;
    sha256?: string;
  }) => Promise<void>;
  handleNodeUpdate: (variables: {
    nodeId: number;
    file?: File;
    url?: string;
    sha256?: string;
    skipCRC: boolean;
  }) => Promise<void>;
}

export const FlashContext = createContext<FlashContextValue | null>(null);

interface FlashProviderProps {
  children: ReactNode;
}

export const FlashProvider: React.FC<FlashProviderProps> = ({ children }) => {
  const [flashType, setFlashType] = useState<FlashType>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [rebootModalOpened, setRebootModalOpened] = useState(false);
  const { mutate: mutateRebootBMC } = useRebootBMCMutation();
  const [uploadProgress, setUploadProgress] =
    useState<FlashContextValue["uploadProgress"]>();

  const uploadProgressCallback = useCallback(
    (progressEvent: AxiosProgressEvent) => {
      setUploadProgress({
        transferred: filesize(progressEvent.loaded ?? 0, { standard: "jedec" }),
        total: progressEvent.total
          ? filesize(progressEvent.total, { standard: "jedec" })
          : null,
        pct: progressEvent.total
          ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
          : 100,
      });
    },
    []
  );

  const firmwareUpdateMutation = useFirmwareUpdateMutation(
    uploadProgressCallback
  );
  const nodeUpdateMutation = useNodeUpdateMutation(uploadProgressCallback);
  const firmwareStatus = useFirmwareStatusQuery(
    flashType === "firmware" && isFlashing
  );
  const flashStatus = useFlashStatusQuery(flashType === "node" && isFlashing);

  const handleRebootBMC = () => {
    setRebootModalOpened(false);
    mutateRebootBMC(undefined, {
      onSuccess: () => {
        toast({ title: "Rebooting BMC", description: "The BMC is rebooting" });
      },
      onError: (error) => {
        toast({
          title: "Failed to reboot BMC",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleFirmwareUpload = async (variables: {
    file?: File;
    url?: string;
    sha256?: string;
  }) => {
    setFlashType("firmware");
    setIsUploading(true);
    setStatusMessage("Uploading BMC firmware...");
    await firmwareUpdateMutation.mutateAsync(variables, {
      onSuccess: () => {
        setIsUploading(false);
        setIsFlashing(true);
        setStatusMessage("Writing firmware to BMC...");
        void firmwareStatus.refetch();
      },
      onError: (error) => {
        setIsUploading(false);
        const msg = "Failed to upload the BMC firmware";
        setStatusMessage(msg);
        toast({
          title: msg,
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleNodeUpdate = async (variables: {
    nodeId: number;
    file?: File;
    url?: string;
    sha256?: string;
    skipCRC: boolean;
  }) => {
    setFlashType("node");
    setIsUploading(true);
    setStatusMessage(`Transferring image to node ${variables.nodeId + 1}...`);
    await nodeUpdateMutation.mutateAsync(variables, {
      onSuccess: () => {
        setIsUploading(false);
        setIsFlashing(true);
        const msg = variables.skipCRC
          ? "Transferring image to the node..."
          : "Checking CRC and transferring image to the node...";
        setStatusMessage(msg);
        void flashStatus.refetch();
      },
      onError: (error) => {
        setIsUploading(false);
        const msg = `Failed to transfer the image to node ${variables.nodeId + 1}`;
        setStatusMessage(msg);
        toast({
          title: msg,
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleError = useCallback((error: string, title: string) => {
    setIsFlashing(false);
    setUploadProgress(undefined);
    setStatusMessage(error);
    toast({
      title,
      description: error,
      variant: "destructive",
    });
  }, []);

  const handleTransferProgress = useCallback((data: FlashStatus) => {
    const bytesWritten = data.Transferring?.bytes_written ?? 0;
    setUploadProgress({
      transferred: `${filesize(bytesWritten, { standard: "jedec" })} written`,
      total: null,
      pct: 100,
    });
  }, []);

  const handleSuccess = useCallback((title: string, message: string) => {
    setIsFlashing(false);
    setUploadProgress(undefined);
    setStatusMessage(message);
    toast({ title, description: message });
  }, []);

  useEffect(() => {
    if (!isFlashing || !flashType) return;

    if (flashType === "node") {
      if (!flashStatus.isStale) {
        if (flashStatus.data?.Error) {
          handleError(flashStatus.data.Error, "An error has occurred");
        } else if (flashStatus.data?.Transferring) {
          handleTransferProgress(flashStatus.data);
        } else if (flashStatus.data?.Done) {
          handleSuccess(
            "Flashing successful",
            "Image flashed successfully to the node"
          );
        }
      }
    } else if (flashType === "firmware") {
      if (!firmwareStatus.isStale) {
        if (firmwareStatus.data?.Error) {
          handleError(firmwareStatus.data.Error, "An error has occurred");
        } else if (firmwareStatus.data?.Transferring) {
          handleTransferProgress(firmwareStatus.data);
        } else if (firmwareStatus.data?.Done) {
          handleSuccess(
            "Flashing successful",
            "Firmware upgrade completed successfully"
          );
          setRebootModalOpened(true);
        }
      }
    }
  }, [
    isFlashing,
    flashType,
    flashStatus.data,
    firmwareStatus.data,
    firmwareStatus.isStale,
    flashStatus.isStale,
    handleError,
    handleTransferProgress,
    handleSuccess,
  ]);

  return (
    <FlashContext.Provider
      value={{
        flashType,
        setFlashType,
        isFlashing: isUploading || isFlashing,
        statusMessage,
        firmwareUpdateMutation,
        nodeUpdateMutation,
        firmwareStatus,
        flashStatus,
        uploadProgress,
        handleFirmwareUpload,
        handleNodeUpdate,
      }}
    >
      <>
        {children}
        <RebootModal
          isOpen={rebootModalOpened}
          onClose={() => setRebootModalOpened(false)}
          onReboot={handleRebootBMC}
          title="Upgrade Finished!"
          message={
            <div className="text-neutral-900 opacity-60 dark:text-neutral-100">
              <p>To finalize the upgrade, a system reboot is necessary.</p>
              <p>Would you like to proceed with the reboot now?</p>
              <p className="mt-4 text-xs italic">
                The nodes will temporarily lose power until the reboot process
                is complete.
              </p>
            </div>
          }
        />
      </>
    </FlashContext.Provider>
  );
};
