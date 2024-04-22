import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosProgressEvent } from "axios";

import api from "../../utils/axios";

interface APIResponse<T> {
  response: {
    result: T;
  }[];
}

export function useBackupMutation() {
  return useMutation({
    mutationKey: ["backupMutation"],
    mutationFn: async () => {
      const response = await api.get(`/bmc/backup`, {
        method: "GET",
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["firmwareUpdateMutation"],
    mutationFn: async (variables: {
      file?: File;
      sha256?: string;
    }) => {
      // Step 1: Obtain the upload handle
      const {
        data: { handle },
      } = await api.get<{ handle: number }>(
        `/bmc?opt=set&type=firmware&file=${variables.file?.name}&length=${variables.file?.size}${variables.sha256 ? `&sha256=${variables.sha256}` : ""}`
      );

      // Step 2: Upload the file data
      const formData = new FormData();
      if (variables.file) formData.append("file", variables.file);
      await api.post(`/bmc/upload/${handle}`, formData, {
        onUploadProgress: (progressEvent) => {
          progressCallBack && progressCallBack(progressEvent);
        },
      });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["nodeUpdateMutation"],
    mutationFn: async (variables: {
      nodeId: string;
      file?: File;
      sha256?: string;
      skipCRC: boolean;
    }) => {
      // Step 1: Obtain the upload handle
      const {
        data: { handle },
      } = await api.get<{ handle: number }>(
        `/bmc?opt=set&type=flash&node=${variables.nodeId}&file=${variables.file?.name}&length=${variables.file?.size}${variables.skipCRC ? "&skip_crc" : ""}${variables.sha256 ? `&sha256=${variables.sha256}` : ""}`
      );

      // Step 2: Upload the file data
      const formData = new FormData();
      if (variables.file) formData.append("file", variables.file);
      await api.post(`/bmc/upload/${handle}`, formData, {
        onUploadProgress: (progressEvent) => {
          progressCallBack && progressCallBack(progressEvent);
        },
      });
    },
    onSuccess: () => {
      // Invalidate the query for the flash status
      void queryClient.invalidateQueries({ queryKey: ["flashStatus"] });
    },
  });
}
