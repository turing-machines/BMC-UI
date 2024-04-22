import { createLazyFileRoute } from "@tanstack/react-router";
import { toast } from "react-toastify";

import TooltipInfo from "../../assets/tooltip-info.svg?react";
import TooltipInner from "../../assets/tooltip-inner.svg?react";
import { useUSBTabData } from "../../services/api/get";
import { useUSBModeMutation } from "../../services/api/set";

export const Route = createLazyFileRoute("/usb/")({
  component: USB,
});

function USB() {
  const { data } = useUSBTabData();
  const { isPending, mutate: mutateUSBMode } = useUSBModeMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modeSelect = document.getElementById("usbMode") as HTMLSelectElement;
    const nodeSelect = document.getElementById("usbNode") as HTMLSelectElement;
    const mode = Number.parseInt(modeSelect.value);
    const node = Number.parseInt(nodeSelect.value);
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
        <div className="form-group row">
          <div className="select-item">
            <label htmlFor="usbMode" className="col-form-label">
              USB mode
            </label>
            <select
              id="usbMode"
              className="selectpicker"
              data-style="btn-outline-primary"
              required
            >
              <option selected disabled>
                Nothing Selected
              </option>
              <option
                value="0"
                selected={data.response[0].result.mode === "Host"}
              >
                Host
              </option>
              <option
                value="1"
                selected={data.response[0].result.mode === "Device"}
              >
                Device
              </option>
              <option
                value="2"
                selected={data.response[0].result.mode === "Flash"}
              >
                Flash
              </option>
            </select>
          </div>
          <div data-errors="usbMode" className="errors"></div>
        </div>

        <div className="form-group row">
          <div className="select-item">
            <label htmlFor="usbNode" className="col-form-label">
              Connected node
            </label>
            <select
              id="usbNode"
              className="selectpicker"
              data-style="btn-outline-primary"
              required
            >
              <option selected disabled>
                Nothing Selected
              </option>
              <option
                value="0"
                selected={data.response[0].result.node === "Node 1"}
              >
                Node 1
              </option>
              <option
                value="1"
                selected={data.response[0].result.node === "Node 2"}
              >
                Node 2
              </option>
              <option
                value="2"
                selected={data.response[0].result.node === "Node 3"}
              >
                Node 3
              </option>
              <option
                value="3"
                selected={data.response[0].result.node === "Node 4"}
              >
                Node 4
              </option>
            </select>
          </div>
          <div data-errors="usbNode" className="errors"></div>
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
