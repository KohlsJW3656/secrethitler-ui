import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import Policy from "./Policy";
import "../styles/modal.css";

function ChoosePolicyModal(props) {
  const [open, setOpen] = useState(props.open);
  const gamePolicies = props.gamePolicies;

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (game_policy_id, isEnacted) => {
    props.onSubmit(game_policy_id, isEnacted);
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
        <Container className="center">
          {gamePolicies.map((gamePolicy) => (
            <Policy
              policy={gamePolicy}
              gamePolicies={gamePolicies}
              select={handleSubmit}
            />
          ))}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ChoosePolicyModal;
