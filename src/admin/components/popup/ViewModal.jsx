import React from "react";
import { Button, Modal } from "react-bootstrap";

const ViewModal = ({ title, show, handleClose, content, size , noSize}) => {
  return (
    <Modal show={show} onHide={handleClose} size={size || "lg"}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold fs-5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${noSize ? "" : "fs-5"}`}>
        {content}
      </Modal.Body>
    </Modal>
  );
};

export default ViewModal;
