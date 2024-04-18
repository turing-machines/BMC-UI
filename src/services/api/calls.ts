import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

type APIResponse<T> = {
  response: {
    result: T[];
  }[];
};

interface USBTabResponse {
  mode: string;
  node: string;
  route: string;
}

interface PowerTabResponse {
  node1: "0" | "1";
  node2: "0" | "1";
  node3: "0" | "1";
  node4: "0" | "1";
}

interface AboutTabResponse {
  api: string;
  build_version: string;
  buildroot: string;
  buildtime: string;
  hostname: string;
  version: string;
}

interface InfoTabResponse {
  ip: { device: string; ip: string; mac: string }[];
  storage: { name: string; total_bytes: number; bytes_free: number }[];
}

interface NodeInfoResponse {
  module_name: string | null;
  name: string | null;
  power_on_time: string | null;
  uart_baud: string | null;
}

export function useUSBTabData() {
  return useQuery({
    queryKey: ["usbTabData"],
    queryFn: async () => {
      const response = await fetch("/api/bmc?opt=get&type=usb");
      return response.json() as Promise<APIResponse<USBTabResponse>>;
    },
  });
}

export function usePowerTabData() {
  return useQuery({
    queryKey: ["powerTabData"],
    queryFn: async () => {
      const response = await fetch("/api/bmc?opt=get&type=power");
      return response.json() as Promise<APIResponse<PowerTabResponse>>;
    },
  });
}

export function useAboutTabData() {
  return useQuery({
    queryKey: ["aboutTabData"],
    queryFn: async () => {
      const response = await fetch("/api/bmc?opt=get&type=about");
      return response.json() as Promise<APIResponse<AboutTabResponse>>;
    },
  });
}

export function useInfoTabData() {
  return useSuspenseQuery({
    queryKey: ["infoTabData"],
    queryFn: async () => {
      const response = await fetch("/api/bmc?opt=get&type=info");
      return response.json() as Promise<APIResponse<InfoTabResponse>>;
    },
  });
}

export function useNodesTabData() {
  return useSuspenseQuery({
    queryKey: ["nodesTabData"],
    queryFn: async () => {
      const response = await fetch("/api/bmc?opt=get&type=node_info");
      return response.json() as Promise<APIResponse<NodeInfoResponse>>;
    },
  });
}
