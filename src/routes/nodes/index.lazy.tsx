import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { NodeInfoResponse, useNodesTabData } from "../../services/api/get";
import {
  useNodePowerMutation,
  useSetNodeInfoMutation,
} from "../../services/api/set";

export const Route = createLazyFileRoute("/nodes/")({
  component: Nodes,
});

const NodeExample = (
  props: NodeInfoResponse & {
    nodeId: number;
    editMode: boolean;
    onEditField: (field: string, value: string) => void;
  }
) => {
  const [powerOn, setPowerOn] = useState(props.power_on_time !== null);
  const { mutate } = useNodePowerMutation();

  const triggerMutation = () => {
    mutate({ nodeId: props.nodeId, powerOn: !powerOn });
    setPowerOn(!powerOn);
  };

  const handleEditField = (field: string, value: string) => {
    props.onEditField(field, value);
  };

  return (
    <div data-node-id={props.nodeId} className="nodes-list__item">
      <div className="nodes-list__item-inner">
        <div className="state-col">
          <div className="state-indicator btn">
            <div className="switch">
              <input
                data-node-id={props.nodeId}
                id={`node-${props.nodeId}`}
                type="checkbox"
                className="node-power"
                disabled={!props.editMode}
                checked={powerOn}
                onClick={() => triggerMutation()}
              />
              <label htmlFor={`node-${props.nodeId}`} className="switch-label">
                <span className="switch-btn"></span>
              </label>
            </div>
          </div>

          <button
            type="button"
            className="btn node-restart btn-turing-small-red"
            disabled={props.power_on_time === null}
          >
            <span className="caption">Restart</span>
          </button>
        </div>
        <div className="info-col">
          <label className="input-wrap name">
            <span className="label">Name</span>
            <input
              type="text"
              value={props.name ?? undefined}
              defaultValue={`My Node ${props.nodeId}`}
              data-field="name"
              onBlur={(e) => handleEditField("name", e.target.value)}
            />
          </label>
          <label className="input-wrap module_name">
            <span className="label">Module Name</span>
            <input
              type="text"
              value={props.module_name ?? undefined}
              defaultValue={`Module ${props.nodeId}`}
              data-field="module_name"
              onBlur={(e) => handleEditField("module_name", e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

type NodesProps = {
  node_id?: number;
  name?: string;
  module_name?: string;
};

function Nodes() {
  const [editMode, setEditMode] = useState(false);
  const { data } = useNodesTabData();
  const [editingData, setEditingData] = useState<NodesProps[]>([]);
  const { status, mutate } = useSetNodeInfoMutation();

  const handleSave = () => {
    setEditMode(false);
    mutate({
      Node1: editingData.find((node) => node.node_id === 1) ?? {},
      Node2: editingData[1],
      Node3: editingData[2],
      Node4: editingData[3],
    });
  };

  return (
    <div data-tab="Nodes" className="tabs-body__item ">
      <div className="form">
        <div className="form-group row">
          <div className="text-content">
            <p>Control the power supply of connected nodes: {status}</p>
          </div>
        </div>

        <div className="nodes-group">
          <div className="nodes-list editing">
            {data.response[0]!.result!.map((node, index) => (
              <NodeExample
                key={index}
                {...node}
                nodeId={index + 1}
                editMode={editMode}
                onEditField={(field, value) => {
                  const newData = [...editingData];
                  newData[index] = {
                    ...newData[index],
                    [field]: value,
                    node_id: index + 1,
                  };
                  setEditingData(newData);
                }}
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
      </div>
    </div>
  );
}