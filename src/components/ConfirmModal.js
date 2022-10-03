import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/modal.css";

function ConfirmModal(props) {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      size="lg"
      aria-labelledby="category-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="camera-modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.message}</h4>
        <div>
          <span className="float-right">
            <Button
              className="btn btn-info"
              type="button"
              variant="danger"
              onClick={handleClose}
            >
              Close
            </Button>
          </span>
          <span className="float-right mr-2">
            <Button
              className="btn btn-info"
              type="button"
              variant="info"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;
