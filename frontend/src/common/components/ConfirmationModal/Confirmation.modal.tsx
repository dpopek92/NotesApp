import React from "react";
import ModalTemplate, {
  IModalTemplateProps,
} from "../ModalTemplate/ModalTemplate";

interface IProps extends IModalTemplateProps {
  confirmationText: string;
  onOk: () => Promise<any> | void;
}

const ConfirmationModal: React.FC<IProps> = ({
  confirmationText,
  ...props
}) => {
  return (
    <ModalTemplate title="Are you sure?" {...props}>
      {confirmationText}
    </ModalTemplate>
  );
};

export default ConfirmationModal;
