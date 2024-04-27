import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosProgressEvent } from "axios";

import useAxiosWithAuth from "../../utils/axios";

export function useBackupMutation() {
  const api = useAxiosWithAuth();

  return useMutation({
    mutationKey: ["backupMutation"],
    mutationFn: async () => {
      const response = await api.get("/bmc/backup", {
        responseType: "blob",
      });
      const contentDisposition = response.headers[
        "content-disposition"
      ] as string;
      const blob = response.data as Blob;
      const match = contentDisposition?.match(/filename="(.+?)"/);
      const filename = match ? match[1] : "backup.tar.gz";
      return { blob, filename };
    },
  });
}

export function useFirmwareUpdateMutation(
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void
) {
  const api = useAxiosWithAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["firmwareUpdateMutation"],
    mutationFn: async (variables: {
      file?: File;
      url?: string;
      sha256?: string;
    }) => {
      if (!variables.file && !variables.url)
        throw new Error("No file or URL provided");

      // Step 1: Obtain the upload handle
      const {
        data: { handle },
      } = await api.get<{ handle: number }>("/bmc", {
        params: {
          opt: "set",
          type: "firmware",
          file: variables.file?.name ?? variables.url,
          length: variables.file?.size ?? undefined,
          sha256: variables.sha256 ?? undefined,
        },
      });

      // Step 2: Upload the file data
      if (variables.file) {
        const formData = new FormData();
        if (variables.file) formData.append("file", variables.file);
        await api.post(`/bmc/upload/${handle}`, formData, {
          onUploadProgress: (progressEvent) => {
            progressCallBack && progressCallBack(progressEvent);
          },
        });
      }
    },
    onSuccess: () => {
      // Invalidate the query for the firmware status
      void queryClient.invalidateQueries({ queryKey: ["firmwareStatus"] });
    },
  });
}

export function useNodeUpdateMutation(
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void
) {
  const api = useAxiosWithAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["nodeUpdateMutation"],
    mutationFn: async (variables: {
      nodeId: number;
      file?: File;
      url?: string;
      sha256?: string;
      skipCRC: boolean;
    }) => {
      if (!variables.file && !variables.url)
        throw new Error("No file or URL provided");

      // Step 1: Obtain the upload handle
      const {
        data: { handle },
      } = await api.get<{ handle: number }>("/bmc", {
        params: {
          opt: "set",
          type: "flash",
          node: variables.nodeId,
          file: variables.file?.name ?? variables.url,
          length: variables.file?.size ?? undefined,
          skip_crc: variables.skipCRC,
          sha256: variables.sha256 ?? undefined,
        },
      });

      // Step 2: Upload the file data
      if (variables.file) {
        const formData = new FormData();
        if (variables.file) formData.append("file", variables.file);
        await api.post(`/bmc/upload/${handle}`, formData, {
          onUploadProgress: (progressEvent) => {
            progressCallBack && progressCallBack(progressEvent);
          },
        });
      }
    },
    onSuccess: () => {
      // Invalidate the query for the flash status
      void queryClient.invalidateQueries({ queryKey: ["flashStatus"] });
    },
  });
}
