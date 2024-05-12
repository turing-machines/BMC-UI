import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useAxiosWithAuth } from "./_core";

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
  buildtime: Date;
  hostname: string;
  version: string;
}

interface FlashStatus {
  Transferring?: {
    id: number;
    process_name: string;
    size: number;
    cancelled: boolean;
    bytes_written: number;
  };
  Done?: [{ secs: number; nanos: number }, number];
  Error?: string;
}

interface InfoTabResponse {
  ip: { device: string; ip: string; mac: string }[];
  storage: { name: string; total_bytes: number; bytes_free: number }[];
}

interface CoolingDevice {
  device: string;
  max_speed: number;
  speed: number;
}

export interface NodeInfoResponse {
  module_name: string | null;
  name: string | null;
  power_on_time: number | null;
  uart_baud: string | null;
}

export function useUSBTabData() {
  const api = useAxiosWithAuth();

  return useSuspenseQuery({
    queryKey: ["usbTabData"],
    queryFn: async () => {
      const response = await api.get<APIResponse<USBTabResponse[]>>("/bmc", {
        params: {
          opt: "get",
          type: "usb",
        },
      });
      return response.data.response[0].result[0];
    },
  });
}

export function usePowerTabData() {
  const api = useAxiosWithAuth();

  return useSuspenseQuery({
    queryKey: ["powerTabData"],
    queryFn: async () => {
      const response = await api.get<APIResponse<PowerTabResponse>>("/bmc", {
        params: {
          opt: "get",
          type: "power",
        },
      });
      return response.data.response[0].result;
    },
  });
}

export function useAboutTabData() {
  const api = useAxiosWithAuth();

  return useSuspenseQuery({
    queryKey: ["aboutTabData"],
    queryFn: async () => {
      const response = await api.get<APIResponse<AboutTabResponse>>("/bmc", {
        params: {
          opt: "get",
          type: "about",
        },
      });
      return {
        ...response.data.response[0].result,
        buildtime: new Date(response.data.response[0].result.buildtime),
      };
    },
  });
}

export function useInfoTabData() {
  const api = useAxiosWithAuth();

  return useSuspenseQuery({
    queryKey: ["infoTabData"],
    queryFn: async () => {
      const response = await api.get<APIResponse<InfoTabResponse>>("/bmc", {
        params: {
          opt: "get",
          type: "info",
        },
      });
      return response.data.response[0].result;
    },
  });
}

export function useNodesTabData() {
  const api = useAxiosWithAuth();

  return useSuspenseQuery({
    queryKey: ["nodesTabData"],
    queryFn: async () => {
      const response = await api.get<APIResponse<NodeInfoResponse[]>>("/bmc", {
        params: {
          opt: "get",
          type: "node_info",
        },
      });
      return response.data.response[0].result;
    },
  });
}

export function useFlashStatusQuery(enabled: boolean) {
  const api = useAxiosWithAuth();

  return useQuery({
    queryKey: ["flashStatus"],
    queryFn: async () => {
      const response = await api.get<FlashStatus>("/bmc", {
        params: {
          opt: "get",
          type: "flash",
        },
      });
      return response.data;
    },
    refetchInterval: 1000, // Refetch every 1 second
    enabled, // Enable/disable the query based on the provided boolean value
  });
}

export function useFirmwareStatusQuery(enabled: boolean) {
  const api = useAxiosWithAuth();

  return useQuery({
    queryKey: ["firmwareStatus"],
    queryFn: async () => {
      const response = await api.get<FlashStatus>("/bmc", {
        params: {
          opt: "get",
          type: "firmware",
        },
      });
      return response.data;
    },
    refetchInterval: 1000, // Refetch every 1 second
    enabled, // Enable/disable the query based on the provided boolean value
  });
}

export function useCoolingDevicesQuery() {
  const api = useAxiosWithAuth();

  return useSuspenseQuery({
    queryKey: ["coolingDevices"],
    queryFn: async () => {
      const response = await api.get<APIResponse<CoolingDevice[]>>("/bmc", {
        params: {
          opt: "get",
          type: "cooling",
        },
      });
      return response.data.response[0].result;
    },
  });
}
