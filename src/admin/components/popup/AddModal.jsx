import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const AddModal = ({
  title,
  show,
  handleClose,
  onConfirm,
  content,
  loading,
  isUpdate,
  size="md"
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size={size}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold fs-5">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="">
        <div className="fs-6">{content}</div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-2">
        <Button variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              {isUpdate ? "Updating..." : "Adding..."}
            </>
          ) : isUpdate ? (
            "Update"
          ) : (
            "Add"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
