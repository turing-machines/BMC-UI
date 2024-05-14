import { createLazyFileRoute } from "@tanstack/react-router";
import { Power, PowerOff } from "lucide-react";
import { useState } from "react";

import NodesSkeleton from "@/components/skeletons/nodes";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { type NodeInfoResponse, useNodesTabData } from "@/lib/api/get";
import {
  usePowerNodeMutation,
  useResetNodeMutation,
  useSetNodeInfoMutation,
} from "@/lib/api/set";

export const Route = createLazyFileRoute("/_tabLayout/nodes")({
  component: NodesTab,
  pendingComponent: NodesSkeleton,
});

const NodeRow = (
  props: NodeInfoResponse & {
    nodeId: number;
    editMode: boolean;
  }
) => {
  const { toast } = useToast();
  const [powerOn, setPowerOn] = useState(props.power_on_time !== null);
  const { mutate: mutatePowerNode, isPending: isPendingPower } =
    usePowerNodeMutation();
  const { mutate: mutateResetNode, isPending: isPendingReset } =
    useResetNodeMutation();

  const handlePowerNode = () => {
    mutatePowerNode({ nodeId: props.nodeId, powerOn: !powerOn });
    setPowerOn(!powerOn);
    toast({
      title: "Power",
      description: `Node ${props.nodeId} was ${powerOn ? "turned off" : "turned on"}`,
    });
  };

  const handleResetNode = () => {
    mutateResetNode(props.nodeId - 1, {
      onSuccess: () => {
        toast({
          title: "Power Cycle",
          description: `Node ${props.nodeId} was restarted`,
        });
      },
      onError: (e) => {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="border-b border-neutral-200 py-4 last:border-none dark:border-neutral-700">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <Switch
            name={`node-${props.nodeId}-power`}
            aria-label={`Node ${props.nodeId} power switch`}
            disabled={!props.editMode || isPendingPower}
            checked={powerOn}
            onCheckedChange={handlePowerNode}
            onIcon={<Power size={16} />}
            offIcon={<PowerOff size={16} />}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={handleResetNode}
            disabled={props.power_on_time === null || isPendingReset}
            isLoading={isPendingReset}
          >
            Restart
          </Button>
        </div>
        <div className="flex flex-1 flex-wrap gap-4">
          <Input
            type="text"
            name={`node-${props.nodeId}-name`}
            label="Name"
            defaultValue={props.name ?? `My Node ${props.nodeId}`}
            disabled={!props.editMode}
            className="flex-1"
          />
          <Input
            type="text"
            name={`node-${props.nodeId}-module-name`}
            label="Module Name"
            defaultValue={props.module_name ?? `Module ${props.nodeId}`}
            disabled={!props.editMode}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

function NodesTab() {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const { data } = useNodesTabData();
  const { mutate } = useSetNodeInfoMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const nodeInfo = {
      Node1: {
        name: (form.elements.namedItem("node-1-name") as HTMLInputElement)
          .value,
        module_name: (
          form.elements.namedItem("node-1-module-name") as HTMLInputElement
        ).value,
      },
      Node2: {
        name: (form.elements.namedItem("node-2-name") as HTMLInputElement)
          .value,
        module_name: (
          form.elements.namedItem("node-2-module-name") as HTMLInputElement
        ).value,
      },
      Node3: {
        name: (form.elements.namedItem("node-3-name") as HTMLInputElement)
          .value,
        module_name: (
          form.elements.namedItem("node-3-module-name") as HTMLInputElement
        ).value,
      },
      Node4: {
        name: (form.elements.namedItem("node-4-name") as HTMLInputElement)
          .value,
        module_name: (
          form.elements.namedItem("node-4-module-name") as HTMLInputElement
        ).value,
      },
    };

    mutate(nodeInfo, {
      onSuccess: () => {
        setEditMode(false);
        toast({ title: "Success", description: "Nodes information saved" });
      },
      onError: (e) => {
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <TabView title="Control the power supply of connected nodes">
      <form onSubmit={handleSubmit}>
        {data.map((node, index) => (
          <NodeRow
            key={index}
            {...node}
            nodeId={index + 1}
            editMode={editMode}
          />
        ))}
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="bw"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
          <Button type="submit" disabled={!editMode}>
            Save
          </Button>
        </div>
      </form>
    </TabView>
  );
}
