import { useSuspenseQuery } from "@tanstack/react-query";

import api from "../../utils/axios";

interface APIResponse<T> {
  response: {
    result: T;
  }[];
}

interface USBTabResponse {
  mode: "Host" | "Device" | "Flash";
  node: "Node 1" | "Node 2" | "Node 3" | "Node 4";
  route: "Bmc" | "AlternativePort";
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

export function useUSBTabData() {
  return useSuspenseQuery({
    queryKey: ["usbTabData"],
    queryFn: async () => {
      const response = await api.get("/bmc?opt=get&type=usb");
      return response.data as APIResponse<USBTabResponse>;
    },
  });
}

export function usePowerTabData() {
  return useSuspenseQuery({
    queryKey: ["powerTabData"],
    queryFn: async () => {
      const response = await api.get(`/bmc?opt=get&type=power`);
      return response.data as APIResponse<PowerTabResponse>;
    },
  });
}

export function useAboutTabData() {
  return useSuspenseQuery({
    queryKey: ["aboutTabData"],
    queryFn: async () => {
      const response = await api.get(`/bmc?opt=get&type=about`);
      return response.data as APIResponse<AboutTabResponse>;
    },
  });
}

export function useInfoTabData() {
  return useSuspenseQuery({
    queryKey: ["infoTabData"],
    queryFn: async () => {
      const response = await api.get(`/bmc?opt=get&type=info`);
      return response.data as APIResponse<InfoTabResponse>;
    },
  });
}

export function useNodesTabData() {
  return useSuspenseQuery({
    queryKey: ["nodesTabData"],
    queryFn: async () => {
      const response = await api.get(`/bmc?opt=get&type=node_info`);
      return response.data as APIResponse<NodeInfoResponse[]>;
    },
  });
}
