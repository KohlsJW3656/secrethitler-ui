import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "../styles/modal.css";

function InvestigationModal(props) {
  const [open, setOpen] = useState(props.open);
  const selectedUser = props.gameUsers.filter(
    (gameUser) => gameUser.game_user_id === props.selectedGameUserId
  )[0];

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
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
        <Container>
          <img
            src={`../images/roles/${selectedUser?.party_membership}party.png`}
            alt={
              selectedUser?.party_membership === 1
                ? "Fascist party"
                : "Liberal party"
            }
            style={{ width: "100px" }}
          />
        </Container>
        <div>
          <Button
            className="button float-right"
            type="submit"
            variant="danger"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default InvestigationModal;
