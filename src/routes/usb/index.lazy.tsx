import { createLazyFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { type SelectInstance } from "react-select";
import { toast } from "react-toastify";

import TooltipInfo from "../../assets/tooltip-info.svg?react";
import TooltipInner from "../../assets/tooltip-inner.svg?react";
import SelectInput from "../../components/SelectInput";
import { useUSBTabData } from "../../services/api/get";
import { useUSBModeMutation } from "../../services/api/set";
import USBSkeleton from "./-components/skeleton";

export const Route = createLazyFileRoute("/usb/")({
  component: USB,
  pendingComponent: USBSkeleton,
});

interface SelectOption {
  value: number;
  label: string;
}

const modeOptions: SelectOption[] = [
  { value: 0, label: "Host" },
  { value: 1, label: "Device" },
  { value: 2, label: "Flash" },
];

const nodeOptions: SelectOption[] = [
  { value: 0, label: "Node 1" },
  { value: 1, label: "Node 2" },
  { value: 2, label: "Node 3" },
  { value: 3, label: "Node 4" },
];

function USB() {
  const selectNodeRef = useRef<SelectInstance<SelectOption> | null>(null);
  const selectModeRef = useRef<SelectInstance<SelectOption> | null>(null);

  const { data } = useUSBTabData();
  const [nodeStateOpened, setNodeStateOpened] = useState(false);
  const [modeStateOpened, setModeStateOpened] = useState(false);
  const { isPending, mutate: mutateUSBMode } = useUSBModeMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const node = selectNodeRef.current?.state.selectValue[0].value ?? 0;
    const mode = selectModeRef.current?.state.selectValue[0].value ?? 0;
    mutateUSBMode(
      { node, mode },
      {
        onSuccess: () => {
          toast.success("USB mode changed successfully");
        },
        onError: () => {
          toast.error("Failed to change USB mode");
        },
      }
    );
  };

  return (
    <div data-tab="USB" className="tabs-body__item ">
      <form className="form" id="form-usb" onSubmit={handleSubmit}>
        <div className="form-group row">
          <div className="text-content">
            <p>USB route:</p>
          </div>
        </div>
        <div
          className="form-group row"
          onClick={() => setModeStateOpened(!modeStateOpened)}
        >
          <SelectInput
            inputId="usb-mode-select"
            ref={selectModeRef}
            menuIsOpen={modeStateOpened}
            options={modeOptions}
            defaultValue={modeOptions.find(
              (option) => option.label === data.mode
            )}
            label="USB mode"
            onMenuOpen={() => setModeStateOpened(!modeStateOpened)}
          />
        </div>

        <div
          className="form-group row"
          onClick={() => setNodeStateOpened(!nodeStateOpened)}
        >
          <SelectInput
            inputId="connected-node-select"
            ref={selectNodeRef}
            menuIsOpen={nodeStateOpened}
            options={nodeOptions}
            defaultValue={nodeOptions.find(
              (option) => option.label === data.node
            )}
            label="Connected node"
            onMenuOpen={() => setNodeStateOpened(!nodeStateOpened)}
          />
        </div>

        <div className="form-group row">
          <button
            type="submit"
            className={`btn btn-turing-small-yellow ${isPending ? "loading" : ""}`}
          >
            <span className="caption">Change</span>
          </button>
        </div>

        <br />
        <div>
          <div className="text-content">
            <div className="form-group row">
              <h5>USB Mode Definitions:</h5>
              <div className="tooltip-wrap">
                <div className="tooltip" data-size="large" data-x-align="right">
                  <div className="tooltip-inner">
                    <TooltipInner />
                    <div className="text-content">
                      <p>
                        <strong>Host</strong>
                        Turns the USB_OTG port power on.
                        <strong>Usage</strong>
                        Use when you want to connect USB devices (like keyboard,
                        mouse, USB drive, etc) through the USB_OTG port to
                        supported modules.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tp-notice notice-grey ">
                  <div className="tp-notice__caption">Host</div>
                  <div className="tp-notice__icon icon ">
                    <TooltipInfo />
                  </div>
                </div>
              </div>

              <div className="tooltip-wrap">
                <div className="tooltip" data-size="large" data-x-align="right">
                  <div className="tooltip-inner">
                    <TooltipInner />
                    <div className="text-content">
                      <p>
                        <strong>Device</strong>
                        The default mode. Turns the USB_OTG power off.
                        <strong>Usage</strong>
                        Use in any other case.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tp-notice notice-purple">
                  <div className="tp-notice__caption">Device</div>
                  <div className="tp-notice__icon icon ">
                    <TooltipInfo />
                  </div>
                </div>
              </div>

              <div className="tooltip-wrap">
                <div className="tooltip" data-size="large" data-x-align="right">
                  <div className="tooltip-inner">
                    <TooltipInner />
                    <div className="text-content">
                      <p>
                        <strong>Flash</strong>
                        Turns the module into flashing mode and sets the USB_OTG
                        into device mode.
                        <strong>Usage</strong>
                        Use to flash the module using USB_OTG port.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tp-notice notice-red">
                  <div className="tp-notice__caption">Flash</div>
                  <div className="tp-notice__icon icon ">
                    <TooltipInfo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
