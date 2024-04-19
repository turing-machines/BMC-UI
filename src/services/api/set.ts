import { useMutation, useQueryClient } from "@tanstack/react-query";

type APIResponse<T> = {
  response: {
    result: T;
  }[];
};

const host = "http://localhost:4460";

export function usePowerNodeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["nodePowerMutation"],
    mutationFn: async (variables: { nodeId: number; powerOn: boolean }) => {
      const response = await fetch(
        `${host}/api/bmc?opt=set&type=power&node${variables.nodeId}=${variables.powerOn ? "1" : "0"}`
      );
      return response.json() as Promise<APIResponse<string>>;
    },
    onSettled: () => {
      // Invalidate the query for the power tab data
      queryClient.invalidateQueries({ queryKey: ["nodesTabData"] });
    },
  });
}

interface NodePayload {
  name?: string;
  module_name?: string;
}

type NodeInfoPayload = {
  Node1: NodePayload;
  Node2: NodePayload;
  Node3: NodePayload;
  Node4: NodePayload;
};

export function useSetNodeInfoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["setNodeInfoMutation"],
    mutationFn: async (nodeInfo: NodeInfoPayload) => {
      const response = await fetch(`${host}/api/bmc?opt=set&type=node_info`, {
        method: "POST",
        body: JSON.stringify(nodeInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json() as Promise<APIResponse<string>>;
    },
    onSettled: () => {
      // Invalidate the query for the power tab data
      queryClient.invalidateQueries({ queryKey: ["nodesTabData"] });
    },
  });
}

export function useResetNodeMutation() {
  return useMutation({
    mutationKey: ["setResetNodeMutation"],
    mutationFn: async (nodeId: number) => {
      const response = await fetch(
        `${host}/api/bmc?opt=set&type=reset&node=${nodeId}`
      );
      return response.json() as Promise<APIResponse<string>>;
    },
  });
}

export function useNetworkResetMutation() {
  return useMutation({
    mutationKey: ["networkResetMutation"],
    mutationFn: async () => {
      const response = await fetch(
        `${host}/api/bmc?opt=set&type=network&cmd=reset`
      );
      return response.json() as Promise<APIResponse<string>>;
    },
  });
}

export function useRebootBMCMutation() {
  return useMutation({
    mutationKey: ["rebootBMCMutation"],
    mutationFn: async () => {
      const response = await fetch(`${host}/api/bmc?opt=set&type=reboot`);
      return response.json() as Promise<APIResponse<string>>;
    },
  });
}

export function useReloadBMCMutation() {
  return useMutation({
    mutationKey: ["reloadBMCMutation"],
    mutationFn: async () => {
      const response = await fetch(`${host}/api/bmc?opt=set&type=reload`);
      return response.json() as Promise<APIResponse<string>>;
    },
  });
}

export function useUSBModeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["usbModeMutation"],
    mutationFn: async (variables: { node: number; mode: number }) => {
      const response = await fetch(
        `${host}/api/bmc?opt=set&type=usb&mode=${variables.mode}&node=${variables.node}`
      );
      return response.json() as Promise<APIResponse<string>>;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["usbTabData"] });
    },
  });
}
