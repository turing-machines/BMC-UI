import { createLazyFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import TextInput from "../../components/TextInput";
import { type NodeInfoResponse, useNodesTabData } from "../../services/api/get";
import {
  usePowerNodeMutation,
  useResetNodeMutation,
  useSetNodeInfoMutation,
} from "../../services/api/set";
import NodesSkeleton from "./-components/nodes.skeleton";

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
  const [powerOn, setPowerOn] = useState(props.power_on_time !== null);
  const { mutate: mutatePowerNode, isPending: isPendingPower } =
    usePowerNodeMutation();
  const { mutate: mutateResetNode, isPending: isPendingReset } =
    useResetNodeMutation();

  const handlePowerNode = () => {
    mutatePowerNode({ nodeId: props.nodeId, powerOn: !powerOn });
    setPowerOn(!powerOn);
    toast.success(
      `Node ${props.nodeId} was ${powerOn ? "turned off" : "turned on"}`
    );
  };

  const handleResetNode = () => {
    mutateResetNode(props.nodeId - 1, {
      onSuccess: () => {
        toast.success(`Node ${props.nodeId} was restarted`);
      },
      onError: () => {
        toast.error(`Failed to restart node ${props.nodeId}`);
      },
    });
  };

  return (
    <div data-node-id={props.nodeId} className="nodes-list__item">
      <div className="nodes-list__item-inner">
        <div className="state-col">
          <div
            className={`state-indicator btn ${isPendingPower ? "loading" : ""}`}
          >
            <div className="switch">
              <input
                data-node-id={props.nodeId}
                id={`node-${props.nodeId}`}
                type="checkbox"
                className="node-power"
                disabled={!props.editMode}
                checked={powerOn}
                onClick={() => handlePowerNode()}
              />
              <label htmlFor={`node-${props.nodeId}`} className="switch-label">
                <span className="switch-btn"></span>
              </label>
            </div>
          </div>

          <button
            type="button"
            className={`btn node-restart btn-turing-small-red ${isPendingReset ? "loading" : ""}`}
            disabled={props.power_on_time === null}
            onClick={() => handleResetNode()}
          >
            <span className="caption">Restart</span>
          </button>
        </div>
        <div className="info-col">
          <TextInput
            name={`node-${props.nodeId}-name`}
            label="Name"
            defaultValue={props.name ?? `My Node ${props.nodeId}`}
            disabled={!props.editMode}
          />
          <TextInput
            name={`node-${props.nodeId}-module-name`}
            label="Module Name"
            defaultValue={props.module_name ?? `Module ${props.nodeId}`}
            disabled={!props.editMode}
          />
        </div>
      </div>
    </div>
  );
};

function NodesTab() {
  const formRef = useRef<HTMLFormElement>(null);
  const [editMode, setEditMode] = useState(false);
  const { data } = useNodesTabData();
  const { mutate } = useSetNodeInfoMutation();

  const handleSave = () => {
    if (formRef.current) {
      const form = formRef.current;
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
          toast.success("Nodes information was saved");
        },
        onError: () => {
          toast.error("Failed to save nodes information");
        },
      });
    }
  };

  return (
    <div data-tab="Nodes" className="tabs-body__item">
      <form ref={formRef} className="form">
        <div className="form-group row">
          <div className="text-content">
            <p>Control the power supply of connected nodes:</p>
          </div>
        </div>

        <div className="nodes-group">
          <div className={`nodes-list ${editMode ? "editing" : ""}`}>
            {data.map((node, index) => (
              <NodeRow
                key={index}
                {...node}
                nodeId={index + 1}
                editMode={editMode}
              />
            ))}
          </div>
          <div className="nodes-group__actions">
            <div className="actions-row">
              <button
                type="button"
                className="nodes-edit btn btn-turing-small-dark"
                onClick={() => setEditMode(!editMode)}
              >
                <span className="caption">{editMode ? "Cancel" : "Edit"}</span>
              </button>

              <button
                type="button"
                className="nodes-save btn btn-turing-small-yellow"
                onClick={handleSave}
                disabled={!editMode}
              >
                <span className="caption">Save</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
