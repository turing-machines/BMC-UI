import { createLazyFileRoute } from "@tanstack/react-router";
import { Power, PowerOff } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import ConfirmationModal from "@/components/ConfirmationModal";
import NodesSkeleton from "@/components/skeletons/nodes";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const POWER_CONFIRMATION_KEY = "skipNodeConfirmation";

const NodeRow = (
  props: NodeInfoResponse & {
    nodeId: number;
    editMode: boolean;
  }
) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [powerOn, setPowerOn] = useState(props.power_on_time !== null);
  const [showPowerDialog, setShowPowerDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [skipConfirmation, setSkipConfirmation] = useState(
    localStorage.getItem(POWER_CONFIRMATION_KEY) === "true"
  );
  const [tempSkipConfirmation, setTempSkipConfirmation] = useState(false);

  const { mutate: mutatePowerNode, isPending: isPendingPower } =
    usePowerNodeMutation();
  const { mutate: mutateResetNode, isPending: isPendingReset } =
    useResetNodeMutation();

  const togglePower = () => {
    mutatePowerNode({ nodeId: props.nodeId, powerOn: !powerOn });
    setPowerOn(!powerOn);
    toast({
      title: t("nodes.powerManagement"),
      description: powerOn
        ? t("nodes.nodeOff", { nodeId: props.nodeId })
        : t("nodes.nodeOn", { nodeId: props.nodeId }),
    });
    setShowPowerDialog(false);

    // Only update localStorage if the checkbox was checked
    if (tempSkipConfirmation) {
      localStorage.setItem(POWER_CONFIRMATION_KEY, "true");
      setSkipConfirmation(true);
    }
  };

  const handlePowerClick = () => {
    if (skipConfirmation) {
      togglePower();
    } else {
      setTempSkipConfirmation(false); // Reset temporary state
      setShowPowerDialog(true);
    }
  };

  const handleResetClick = () => {
    if (skipConfirmation) {
      resetNode();
    } else {
      setTempSkipConfirmation(false); // Reset temporary state
      setShowResetDialog(true);
    }
  };

  const resetNode = () => {
    setShowResetDialog(false);
    mutateResetNode(props.nodeId - 1, {
      onSuccess: () => {
        toast({
          title: t("nodes.powerManagement"),
          description: t("nodes.nodeRestarted", { nodeId: props.nodeId }),
        });

        // Only update localStorage if the checkbox was checked
        if (tempSkipConfirmation) {
          localStorage.setItem(POWER_CONFIRMATION_KEY, "true");
          setSkipConfirmation(true);
        }
      },
      onError: (e) => {
        toast({
          title: t("nodes.pmError"),
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  const ConfirmationCheckbox = () => (
    <div className="flex items-center space-x-2 pt-4">
      <Checkbox
        id="skipConfirmation"
        checked={tempSkipConfirmation}
        onCheckedChange={(checked) =>
          setTempSkipConfirmation(checked as boolean)
        }
      />
      <label
        htmlFor="skipConfirmation"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {t("nodes.dontAskAgain")}
      </label>
    </div>
  );

  const handleCloseDialog = () => {
    setShowPowerDialog(false);
    setShowResetDialog(false);
    setTempSkipConfirmation(false);
  };

  return (
    <>
      <div className="border-b border-neutral-200 py-4 last:border-none dark:border-neutral-700">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <Switch
              name={`node-${props.nodeId}-power`}
              aria-label={t("nodes.ariaNodePowerToggle", {
                nodeId: props.nodeId,
              })}
              disabled={isPendingPower}
              checked={powerOn}
              onCheckedChange={handlePowerClick}
              onIcon={<Power size={16} />}
              offIcon={<PowerOff size={16} />}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={handleResetClick}
              disabled={props.power_on_time === null || isPendingReset}
              isLoading={isPendingReset}
            >
              {t("nodes.restartButton")}
            </Button>
          </div>
          <div className="flex flex-1 flex-wrap gap-4">
            <Input
              type="text"
              name={`node-${props.nodeId}-name`}
              label={t("nodes.nodeName")}
              defaultValue={
                props.name ?? t("nodes.node", { nodeId: props.nodeId })
              }
              disabled={!props.editMode}
              className="flex-1"
            />
            <Input
              type="text"
              name={`node-${props.nodeId}-module-name`}
              label={t("nodes.moduleName")}
              defaultValue={
                props.module_name ??
                t("nodes.module", { moduleId: props.nodeId })
              }
              disabled={!props.editMode}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showPowerDialog}
        onClose={handleCloseDialog}
        title={t(
          powerOn ? "nodes.powerOffConfirmTitle" : "nodes.powerOnConfirmTitle",
          {
            nodeId: props.nodeId,
          }
        )}
        message={
          <>
            <p>
              {t(
                powerOn
                  ? "nodes.powerOffConfirmDescription"
                  : "nodes.powerOnConfirmDescription",
                {
                  nodeId: props.nodeId,
                }
              )}
            </p>
            <ConfirmationCheckbox />
          </>
        }
        onConfirm={togglePower}
      />

      <ConfirmationModal
        isOpen={showResetDialog}
        onClose={handleCloseDialog}
        title={t("nodes.resetConfirmTitle", { nodeId: props.nodeId })}
        message={
          <>
            <p>
              {t("nodes.resetConfirmDescription", { nodeId: props.nodeId })}
            </p>
            <ConfirmationCheckbox />
          </>
        }
        onConfirm={resetNode}
      />
    </>
  );
};

function NodesTab() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [editMode, setEditMode] = useState(false);
  const { data } = useNodesTabData();
  const { mutate, isPending } = useSetNodeInfoMutation();

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
        toast({
          title: t("nodes.saveButton"),
          description: t("nodes.persistSuccess"),
        });
      },
      onError: (e) => {
        toast({
          title: t("nodes.saveButton"),
          description: e.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <TabView title={t("nodes.header")}>
      <form onSubmit={handleSubmit} ref={formRef}>
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
            onClick={() => {
              if (editMode) {
                formRef.current?.reset();
              }
              setEditMode(!editMode);
            }}
            disabled={isPending}
          >
            {editMode ? t("ui.cancel") : t("nodes.editButton")}
          </Button>
          <Button
            type="submit"
            isLoading={isPending}
            disabled={!editMode || isPending}
          >
            {t("nodes.saveButton")}
          </Button>
        </div>
      </form>
    </TabView>
  );
}
