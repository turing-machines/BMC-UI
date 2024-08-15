import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosProgressEvent } from "axios";

import { useAxiosWithAuth } from "./_core";

const handleParams = (variables: {
  type: "firmware" | "flash";
  file?: { name: string; size: number };
  url?: string;
  sha256?: string;
  skipCRC?: boolean;
  node?: number;
}) => {
  const params: Record<string, unknown> = {
    opt: "set",
    type: variables.type,
  };

  if (variables.file) {
    params.file = variables.file.name;
    params.length = variables.file.size;
  } else {
    params.file = variables.url;
  }

  if (variables.sha256) {
    params.sha256 = variables.sha256;
  }

  if (variables.skipCRC !== undefined) {
    params.skip_crc = variables.skipCRC;
  }

  if (variables.node !== undefined) {
    params.node = variables.node;
  }

  return params;
};

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
      const match = /filename="(.+?)"/.exec(contentDisposition);
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
        params: handleParams({
          type: "firmware",
          file: variables.file,
          url: variables.url,
          sha256: variables.sha256,
        }),
      });

      // Step 2: Upload the file data
      if (variables.file) {
        const formData = new FormData();
        if (variables.file) formData.append("file", variables.file);
        await api.post(`/bmc/upload/${handle}`, formData, {
          onUploadProgress: (progressEvent) => {
            if (progressCallBack) progressCallBack(progressEvent);
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
        params: handleParams({
          type: "flash",
          node: variables.nodeId,
          file: variables.file,
          url: variables.url,
          skipCRC: variables.skipCRC,
          sha256: variables.sha256,
        }),
      });

      // Step 2: Upload the file data
      if (variables.file) {
        const formData = new FormData();
        if (variables.file) formData.append("file", variables.file);
        await api.post(`/bmc/upload/${handle}`, formData, {
          onUploadProgress: (progressEvent) => {
            if (progressCallBack) progressCallBack(progressEvent);
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
