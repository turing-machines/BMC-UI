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
      console.log(contentDisposition);
      const blob = await response.blob();
      const match = contentDisposition?.match(/filename="(.+?)"/);
      const filename = match ? match[1] : "backup.tar.gz";
      return { blob, filename };
    },
  });
}
