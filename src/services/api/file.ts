import { useMutation } from "@tanstack/react-query";
import type { AxiosProgressEvent } from "axios";
import api from "../../utils/axios";

export function useBackupMutation() {
  return useMutation({
    mutationKey: ["backupMutation"],
    mutationFn: async () => {
      const response = await api.get(`/bmc/backup`, {
        method: "GET",
        responseType: "blob",
      });
      const contentDisposition = response.headers["content-disposition"];
      const blob: Blob = response.data;
      console.log(response);
      const match = contentDisposition?.match(/filename="(.+?)"/);
      const filename = match ? match[1] : "backup.tar.gz";
      return { blob, filename };
    },
  });
}

export function useFirmwareUpdateMutation(
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void
) {
  return useMutation({
    mutationKey: ["firmwareUpdateMutation"],
    mutationFn: async (formData: FormData) => {
      const response = await api.post(`/bmc?opt=set&type=firmware`, formData, {
        onUploadProgress: (progressEvent) => {
          progressCallBack && progressCallBack(progressEvent);
        },
      });
      return response.data;
    },
  });
}

export function useNodeUpdateMutation(
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void
) {
  return useMutation({
    mutationKey: ["nodeUpdateMutation"],
    mutationFn: async (variables: {
      nodeId: number;
      file: Blob;
      sha256?: string;
      skipCRC: boolean;
    }) => {
      const data = new FormData();
      data.append("file", variables.file);

      const response = await api.post(
        `/bmc?opt=set&type=flash&node=${variables.nodeId}${variables.skipCRC ? "&skip_crc" : ""}${variables.sha256 ? `&sha256=${variables.sha256}` : ""}`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            progressCallBack && progressCallBack(progressEvent);
          },
        }
      );
      return response.data;
    },
  });
}
