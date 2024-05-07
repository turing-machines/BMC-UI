import { Modal } from "react-responsive-modal";

interface RebootModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReboot: () => void;
  title: string;
  message: string | React.ReactNode;
  isPending?: boolean;
}

export default function RebootModal({
  isOpen,
  onClose,
  onReboot,
  title,
  message,
  isPending = false,
}: RebootModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      showCloseIcon={false}
      classNames={{ modal: "modal-rounded" }}
    >
      <div className="modal">
        <h2 className="modal__title">{title}</h2>
        {typeof message === "string" ? (
          <p className="modal__text">{message}</p>
        ) : (
          message
        )}
        <div className="modal__buttons">
          <button className="btn btn-turing-small-dark" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`reboot-btn btn btn-turing-small-red ${
              isPending ? "loading" : ""
            }`}
            onClick={onReboot}
          >
            Reboot
          </button>
        </div>
      </div>
    </Modal>
  );
}
