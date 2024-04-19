import { useSuspenseQuery } from "@tanstack/react-query";

type APIResponse<T> = {
  response: {
    result: T;
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

export interface NodeInfoResponse {
  module_name: string | null;
  name: string | null;
  power_on_time: number | null;
  uart_baud: string | null;
}

const host = "http://localhost:4460";

export function useUSBTabData() {
  return useSuspenseQuery({
    queryKey: ["usbTabData"],
    queryFn: async () => {
      const response = await fetch(`${host}/api/bmc?opt=get&type=usb`);
      return response.json() as Promise<APIResponse<USBTabResponse>>;
    },
  });
}

export function usePowerTabData() {
  return useSuspenseQuery({
    queryKey: ["powerTabData"],
    queryFn: async () => {
      const response = await fetch(`${host}/api/bmc?opt=get&type=power`);
      return response.json() as Promise<APIResponse<PowerTabResponse>>;
    },
  });
}

export function useAboutTabData() {
  return useSuspenseQuery({
    queryKey: ["aboutTabData"],
    queryFn: async () => {
      const response = await fetch(`${host}/api/bmc?opt=get&type=about`);
      return response.json() as Promise<APIResponse<AboutTabResponse>>;
    },
  });
}

export function useInfoTabData() {
  return useSuspenseQuery({
    queryKey: ["infoTabData"],
    queryFn: async () => {
      const response = await fetch(`${host}/api/bmc?opt=get&type=info`);
      return response.json() as Promise<APIResponse<InfoTabResponse>>;
    },
  });
}

export function useNodesTabData() {
  return useSuspenseQuery({
    queryKey: ["nodesTabData"],
    queryFn: async () => {
      const response = await fetch(`${host}/api/bmc?opt=get&type=node_info`);
      return response.json() as Promise<APIResponse<NodeInfoResponse[]>>;
    },
  });
}
