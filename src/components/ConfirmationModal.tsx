import { Modal } from "react-responsive-modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Continue",
  cancelText = "Cancel",
}: ConfirmationModalProps) {
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
        <p className="modal__text">{message}</p>
        <div className="modal__buttons">
          <button className="btn btn-turing-small-dark" onClick={onClose}>
            {cancelText}
          </button>
          <button
            type="submit"
            className="continue-btn btn btn-turing-small-yellow"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
