import { useMutation, useQueryClient } from "@tanstack/react-query";

type APIResponse<T> = {
  response: {
    result: T;
  }[];
};

const host = "http://localhost:4460";

export function useNodePowerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["nodePowerMutation"],
    mutationFn: async (variables: { nodeId: number, powerOn: boolean }) => {
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
