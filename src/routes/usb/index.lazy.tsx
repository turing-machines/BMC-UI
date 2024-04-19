import { createLazyFileRoute } from "@tanstack/react-router";
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
    mutateUSBMode({ node, mode });
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
                selected={data.response[0]!.result.mode === "Host"}
              >
                Host
              </option>
              <option
                value="1"
                selected={data.response[0]!.result.mode === "Device"}
              >
                Device
              </option>
              <option
                value="2"
                selected={data.response[0]!.result.mode === "Flash"}
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
                selected={data.response[0]!.result.node === "Node 1"}
              >
                Node 1
              </option>
              <option
                value="1"
                selected={data.response[0]!.result.node === "Node 2"}
              >
                Node 2
              </option>
              <option
                value="2"
                selected={data.response[0]!.result.node === "Node 3"}
              >
                Node 3
              </option>
              <option
                value="3"
                selected={data.response[0]!.result.node === "Node 4"}
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
            className="btn btn-turing-small-yellow"
            disabled={isPending}
          >
            <span className="caption">Change</span>
          </button>
        </div>

        <br />
        <div>
          <div className="text-content">
            <h5>USB Modes:</h5>
            <ul>
              <li>
                <strong>Host</strong> - turns the USB_OTG port power on - use
                when you want to connect USB devices (like keyboard, mouse, USB
                drive, etc) through the USB_OTG port to supported modules
              </li>
              <li>
                <strong>Device</strong> - the default mode, turns the USB_OTG
                power off - use in any other case
              </li>
              <li>
                <strong>Flash</strong> - turns the module into flashing mode and
                sets the USB_OTG into device mode - use to flash the module
                using USB_OTG port
              </li>
            </ul>
          </div>

          <div className="form-group row">
            <div className="tooltip-wrap">
              <div className="tooltip" data-size="large" data-x-align="right">
                <div className="tooltip-inner">
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z"
                      fill="white"
                    />
                  </svg>

                  <div className="text-content">
                    <p>
                      <strong>Host</strong> - turns the USB_OTG port power on -
                      use when you want to connect USB devices (like keyboard,
                      mouse, USB drive, etc) through the USB_OTG port to
                      supported modules
                    </p>
                    <p>
                      <strong>Device</strong> - the default mode, turns the
                      USB_OTG power off - use in any other case
                    </p>
                    <p>
                      <strong>Flash</strong> - turns the module into flashing
                      mode and sets the USB_OTG into device mode - use to flash
                      the module using USB_OTG port
                    </p>
                  </div>
                </div>
              </div>
              <div className="tp-notice notice-grey ">
                <div className="tp-notice__caption">USB Modes</div>
                <div className="tp-notice__icon icon ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9924 7.98876C15.0147 4.17225 11.8577 1.0126 8.01465 1V1.00023C6.1649 0.99425 4.38797 1.72063 3.07214 3.02073C1.75632 4.32073 1.00858 6.08878 0.992267 7.93848C0.974017 11.8235 4.11852 15.007 7.96427 15C9.19657 15.0015 10.4074 14.6785 11.4753 14.0638C12.5432 13.449 13.4304 12.5639 14.0478 11.4975C14.6652 10.431 14.9909 9.22098 14.9924 7.98876ZM5.19312 3.06495C6.0623 2.57023 7.04697 2.31476 8.04688 2.32443L8.04663 2.32445C11.1071 2.3287 13.6271 4.8697 13.6454 7.97071C13.6508 8.97038 13.3917 9.95368 12.8943 10.821C12.397 11.6882 11.6791 12.4084 10.8135 12.9085C9.94793 13.4087 8.9654 13.6709 7.9657 13.6686C4.8647 13.6616 2.29839 11.0799 2.33345 7.98736C2.33267 6.98743 2.59682 6.0051 3.09917 5.14035C3.60152 4.2757 4.32407 3.55958 5.19312 3.06495ZM6.83462 4.72675C6.83863 4.48076 6.93873 4.24608 7.11352 4.07295C7.28823 3.89971 7.52378 3.80175 7.76988 3.8C8.01245 3.80694 8.24283 3.90821 8.41198 4.08233C8.58121 4.25645 8.67575 4.48965 8.67565 4.73243C8.67467 5.06123 8.49831 5.36465 8.21295 5.52823C7.9277 5.69171 7.57682 5.69073 7.29245 5.5254C7.00817 5.36006 6.83365 5.05567 6.83465 4.72677L6.83462 4.72675ZM7.29238 7.53251L7.29069 7.53205C7.24941 7.52101 7.21346 7.5114 7.17617 7.50311C7.00654 7.47645 6.85342 7.38622 6.74785 7.25076C6.64228 7.11521 6.59218 6.94471 6.60781 6.77371C6.6207 6.59803 6.70048 6.43406 6.83066 6.31551C6.96093 6.19695 7.13174 6.13299 7.30781 6.1367C7.37409 6.1367 7.44052 6.1381 7.50695 6.1395H7.50696C7.6398 6.1423 7.77263 6.1451 7.90419 6.1367C8.29199 6.10594 8.67556 6.37469 8.67139 6.90673V8.78838V10.6546V10.7946L8.79737 10.8226V10.8225C9.02539 10.864 9.21739 11.0169 9.30889 11.2299C9.4004 11.4428 9.3792 11.6873 9.25245 11.8814C9.12559 12.0753 8.91017 12.1929 8.67842 12.1945C8.21172 12.202 7.74512 12.202 7.27842 12.1945C7.04639 12.1976 6.82842 12.0838 6.69814 11.8918C6.56787 11.6997 6.54287 11.4552 6.63154 11.2407C6.72012 11.0263 6.91054 10.8707 7.13837 10.8267C7.1633 10.8209 7.18871 10.816 7.21669 10.8107L7.21676 10.8107C7.23589 10.8071 7.25622 10.8032 7.27841 10.7987V7.53265L7.29238 7.53251Z"
                      fill="#0A0A09"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="tooltip-wrap">
              <div className="tooltip" data-size="small" data-x-align="left">
                <div className="tooltip-inner">
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z"
                      fill="white"
                    />
                  </svg>

                  <div className="text-content">
                    <p>
                      <strong>Host</strong> - turns the USB_OTG port power on -
                      use when you want to connect USB devices (like keyboard,
                      mouse, USB drive, etc) through the USB_OTG port to
                      supported modules
                    </p>
                    <p>
                      <strong>Device</strong> - the default mode, turns the
                      USB_OTG power off - use in any other case
                    </p>
                    <p>
                      <strong>Flash</strong> - turns the module into flashing
                      mode and sets the USB_OTG into device mode - use to flash
                      the module using USB_OTG port
                    </p>
                  </div>
                </div>
              </div>
              <div className="tp-notice notice-purple">
                <div className="tp-notice__icon icon ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9924 7.98876C15.0147 4.17225 11.8577 1.0126 8.01465 1V1.00023C6.1649 0.99425 4.38797 1.72063 3.07214 3.02073C1.75632 4.32073 1.00858 6.08878 0.992267 7.93848C0.974017 11.8235 4.11852 15.007 7.96427 15C9.19657 15.0015 10.4074 14.6785 11.4753 14.0638C12.5432 13.449 13.4304 12.5639 14.0478 11.4975C14.6652 10.431 14.9909 9.22098 14.9924 7.98876ZM5.19312 3.06495C6.0623 2.57023 7.04697 2.31476 8.04688 2.32443L8.04663 2.32445C11.1071 2.3287 13.6271 4.8697 13.6454 7.97071C13.6508 8.97038 13.3917 9.95368 12.8943 10.821C12.397 11.6882 11.6791 12.4084 10.8135 12.9085C9.94793 13.4087 8.9654 13.6709 7.9657 13.6686C4.8647 13.6616 2.29839 11.0799 2.33345 7.98736C2.33267 6.98743 2.59682 6.0051 3.09917 5.14035C3.60152 4.2757 4.32407 3.55958 5.19312 3.06495ZM6.83462 4.72675C6.83863 4.48076 6.93873 4.24608 7.11352 4.07295C7.28823 3.89971 7.52378 3.80175 7.76988 3.8C8.01245 3.80694 8.24283 3.90821 8.41198 4.08233C8.58121 4.25645 8.67575 4.48965 8.67565 4.73243C8.67467 5.06123 8.49831 5.36465 8.21295 5.52823C7.9277 5.69171 7.57682 5.69073 7.29245 5.5254C7.00817 5.36006 6.83365 5.05567 6.83465 4.72677L6.83462 4.72675ZM7.29238 7.53251L7.29069 7.53205C7.24941 7.52101 7.21346 7.5114 7.17617 7.50311C7.00654 7.47645 6.85342 7.38622 6.74785 7.25076C6.64228 7.11521 6.59218 6.94471 6.60781 6.77371C6.6207 6.59803 6.70048 6.43406 6.83066 6.31551C6.96093 6.19695 7.13174 6.13299 7.30781 6.1367C7.37409 6.1367 7.44052 6.1381 7.50695 6.1395H7.50696C7.6398 6.1423 7.77263 6.1451 7.90419 6.1367C8.29199 6.10594 8.67556 6.37469 8.67139 6.90673V8.78838V10.6546V10.7946L8.79737 10.8226V10.8225C9.02539 10.864 9.21739 11.0169 9.30889 11.2299C9.4004 11.4428 9.3792 11.6873 9.25245 11.8814C9.12559 12.0753 8.91017 12.1929 8.67842 12.1945C8.21172 12.202 7.74512 12.202 7.27842 12.1945C7.04639 12.1976 6.82842 12.0838 6.69814 11.8918C6.56787 11.6997 6.54287 11.4552 6.63154 11.2407C6.72012 11.0263 6.91054 10.8707 7.13837 10.8267C7.1633 10.8209 7.18871 10.816 7.21669 10.8107L7.21676 10.8107C7.23589 10.8071 7.25622 10.8032 7.27841 10.7987V7.53265L7.29238 7.53251Z"
                      fill="#0A0A09"
                    />
                  </svg>
                </div>
                <div className="tp-notice__caption">USB Modes</div>
              </div>
            </div>

            <div className="tooltip-wrap">
              <div className="tooltip" data-size="large" data-x-align="center">
                <div className="tooltip-inner">
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12L0.0717975 -1.30507e-06L13.9282 -9.36995e-08L7 12Z"
                      fill="white"
                    />
                  </svg>

                  <div className="text-content">
                    <p>
                      <strong>Host</strong> - turns the USB_OTG port power on -
                      use when you want to connect USB devices (like keyboard,
                      mouse, USB drive, etc) through the USB_OTG port to
                      supported modules
                    </p>
                    <p>
                      <strong>Device</strong> - the default mode, turns the
                      USB_OTG power off - use in any other case
                    </p>
                    <p>
                      <strong>Flash</strong> - turns the module into flashing
                      mode and sets the USB_OTG into device mode - use to flash
                      the module using USB_OTG port
                    </p>
                  </div>
                </div>
              </div>
              <div className="tp-notice notice-red">
                <div className="tp-notice__caption">USB Modes</div>
                <div className="tp-notice__icon icon ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9924 7.98876C15.0147 4.17225 11.8577 1.0126 8.01465 1V1.00023C6.1649 0.99425 4.38797 1.72063 3.07214 3.02073C1.75632 4.32073 1.00858 6.08878 0.992267 7.93848C0.974017 11.8235 4.11852 15.007 7.96427 15C9.19657 15.0015 10.4074 14.6785 11.4753 14.0638C12.5432 13.449 13.4304 12.5639 14.0478 11.4975C14.6652 10.431 14.9909 9.22098 14.9924 7.98876ZM5.19312 3.06495C6.0623 2.57023 7.04697 2.31476 8.04688 2.32443L8.04663 2.32445C11.1071 2.3287 13.6271 4.8697 13.6454 7.97071C13.6508 8.97038 13.3917 9.95368 12.8943 10.821C12.397 11.6882 11.6791 12.4084 10.8135 12.9085C9.94793 13.4087 8.9654 13.6709 7.9657 13.6686C4.8647 13.6616 2.29839 11.0799 2.33345 7.98736C2.33267 6.98743 2.59682 6.0051 3.09917 5.14035C3.60152 4.2757 4.32407 3.55958 5.19312 3.06495ZM6.83462 4.72675C6.83863 4.48076 6.93873 4.24608 7.11352 4.07295C7.28823 3.89971 7.52378 3.80175 7.76988 3.8C8.01245 3.80694 8.24283 3.90821 8.41198 4.08233C8.58121 4.25645 8.67575 4.48965 8.67565 4.73243C8.67467 5.06123 8.49831 5.36465 8.21295 5.52823C7.9277 5.69171 7.57682 5.69073 7.29245 5.5254C7.00817 5.36006 6.83365 5.05567 6.83465 4.72677L6.83462 4.72675ZM7.29238 7.53251L7.29069 7.53205C7.24941 7.52101 7.21346 7.5114 7.17617 7.50311C7.00654 7.47645 6.85342 7.38622 6.74785 7.25076C6.64228 7.11521 6.59218 6.94471 6.60781 6.77371C6.6207 6.59803 6.70048 6.43406 6.83066 6.31551C6.96093 6.19695 7.13174 6.13299 7.30781 6.1367C7.37409 6.1367 7.44052 6.1381 7.50695 6.1395H7.50696C7.6398 6.1423 7.77263 6.1451 7.90419 6.1367C8.29199 6.10594 8.67556 6.37469 8.67139 6.90673V8.78838V10.6546V10.7946L8.79737 10.8226V10.8225C9.02539 10.864 9.21739 11.0169 9.30889 11.2299C9.4004 11.4428 9.3792 11.6873 9.25245 11.8814C9.12559 12.0753 8.91017 12.1929 8.67842 12.1945C8.21172 12.202 7.74512 12.202 7.27842 12.1945C7.04639 12.1976 6.82842 12.0838 6.69814 11.8918C6.56787 11.6997 6.54287 11.4552 6.63154 11.2407C6.72012 11.0263 6.91054 10.8707 7.13837 10.8267C7.1633 10.8209 7.18871 10.816 7.21669 10.8107L7.21676 10.8107C7.23589 10.8071 7.25622 10.8032 7.27841 10.7987V7.53265L7.29238 7.53251Z"
                      fill="#0A0A09"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
