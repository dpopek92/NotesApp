import React, { ReactNode } from "react";
import { Button, Modal, ModalProps } from "react-bootstrap";

export interface IModalTemplateProps {
  closeModal: () => void;
}
interface IProps extends ModalProps, IModalTemplateProps {
  onOk: () => void;
  title: string;
  children: ReactNode;
}

const ModalTemplate: React.FC<IProps> = ({
  closeModal,
  onOk,
  title,
  children,
  ...modalProps
}) => {
  return (
    <Modal
      show
      onHide={closeModal}
      {...modalProps}
      data-testid="modal-template-test-id"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button size="sm" variant="danger" onClick={closeModal}>
          Close
        </Button>
        <Button size="sm" variant="success" onClick={onOk}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTemplate;
