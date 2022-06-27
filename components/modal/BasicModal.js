import React from "react";
import { Icon, Modal, ModalContent, ModalHeader } from "semantic-ui-react";

export const BasicModal = (props) => {
  const { show, setShow, title, children, ...rest } = props;

  const onClose = () => setShow(false);
  return (
    <Modal className="basic-modal" open={show} onClose={onClose} {...rest}>
      <ModalHeader>
        <span>{title}</span> <Icon name="close" onClick={onClose} />
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};
