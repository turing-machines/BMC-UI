import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosWithAuth from "../../utils/axios";

interface APIResponse<T> {
  response: {
    result: T;
  }[];
}

interface LoginResponse {
  id: string;
  description: string;
  name: string;
  username: string;
}

export function useLoginMutation() {
  const api = useAxiosWithAuth();

  return useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (variables: { username: string; password: string }) => {
      const response = await api.post<LoginResponse>(
        `/bmc/authenticate`,
        variables
      );
      return response.data;
    },
  });
}

export function usePowerNodeMutation() {
  const api = useAxiosWithAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["nodePowerMutation"],
    mutationFn: async (variables: { nodeId: number; powerOn: boolean }) => {
      const response = await api.get<APIResponse<string>>(
        `/bmc?opt=set&type=power&node${variables.nodeId}=${variables.powerOn ? "1" : "0"}`
      );
      return response.data.response[0].result;
    },
    onSettled: () => {
      // Invalidate the query for the power tab data
      void queryClient.invalidateQueries({ queryKey: ["nodesTabData"] });
    },
  });
}

interface NodePayload {
  name?: string;
  module_name?: string;
}

interface NodeInfoPayload {
  Node1: NodePayload;
  Node2: NodePayload;
  Node3: NodePayload;
  Node4: NodePayload;
}

export function useSetNodeInfoMutation() {
  const api = useAxiosWithAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["setNodeInfoMutation"],
    mutationFn: async (nodeInfo: NodeInfoPayload) => {
      const response = await api.post<APIResponse<string>>(
        `/bmc?opt=set&type=node_info`,
        nodeInfo
      );
      return response.data.response[0].result;
    },
    onSettled: () => {
      // Invalidate the query for the power tab data
      void queryClient.invalidateQueries({ queryKey: ["nodesTabData"] });
    },
  });
}

export function useResetNodeMutation() {
  const api = useAxiosWithAuth();

  return useMutation({
    mutationKey: ["setResetNodeMutation"],
    mutationFn: async (nodeId: number) => {
      const response = await api.get<APIResponse<string>>(
        `/bmc?opt=set&type=reset&node=${nodeId}`
      );
      return response.data.response[0].result;
    },
  });
}

export function useNetworkResetMutation() {
  const api = useAxiosWithAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["networkResetMutation"],
    mutationFn: async () => {
      const response = await api.get<APIResponse<string>>(
        `/bmc?opt=set&type=network&cmd=reset`
      );
      return response.data.response[0].result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["infoTabData"] });
    },
  });
}

export function useRebootBMCMutation() {
  const api = useAxiosWithAuth();

  return useMutation({
    mutationKey: ["rebootBMCMutation"],
    mutationFn: async () => {
      const response = await api.get<APIResponse<string>>(
        `/bmc?opt=set&type=reboot`
      );
      return response.data.response[0].result;
    },
  });
}

export function useReloadBMCMutation() {
  const api = useAxiosWithAuth();

  return useMutation({
    mutationKey: ["reloadBMCMutation"],
    mutationFn: async () => {
      const response = await api.get<APIResponse<string>>(
        `/bmc?opt=set&type=reload`
      );
      return response.data.response[0].result;
    },
  });
}

export function useUSBModeMutation() {
  const api = useAxiosWithAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["usbModeMutation"],
    mutationFn: async (variables: { node: number; mode: number }) => {
      const response = await api.get<APIResponse<string>>(
        `/bmc?opt=set&type=usb&mode=${variables.mode}&node=${variables.node}`
      );
      return response.data.response[0].result;
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["usbTabData"] });
    },
  });
}

export function useCoolingDeviceMutation() {
  const api = useAxiosWithAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["coolingDeviceMutation"],
    mutationFn: async (variables: { device: string; speed: number }) => {
      const response = await api.get<APIResponse<string>>(
        `/bmc?opt=set&type=cooling&device=${variables.device}&speed=${variables.speed}`
      );
      return response.data.response[0].result;
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["coolingDevices"] });
    },
  });
}
