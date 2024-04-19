import { useMutation } from "@tanstack/react-query";

const host = "http://localhost:4460";

export function useBackupMutation() {
  return useMutation({
    mutationKey: ["backupMutation"],
    mutationFn: async () => {
      const response = await fetch(`${host}/api/bmc/backup`, {
        method: "GET",
      });
      const contentDisposition = response.headers.get("Content-Disposition");
      const blob = await response.blob();
      const match = contentDisposition?.match(/filename="(.+?)"/);
      const filename = match ? match[1] : "backup.tar.gz";
      return { blob, filename };
    },
  });
}

export function useFirmwareUpdateMutation() {
  return useMutation({
    mutationKey: ["firmwareUpdateMutation"],
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${host}/api/bmc?opt=set&type=firmware`, {
        method: "POST",
        body: formData,
      });
      return response.json();
    },
  });
}
