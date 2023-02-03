import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Policy from "./Policy";
import "../styles/modal.css";

function ChoosePolicyModal(props) {
  const [open, setOpen] = useState(props.open);
  const gamePolicies = props.gamePolicies;
  const enactedPolicies = props.enactedPolicies;
  const policyPeek = props.policyPeek;
  const declinedVeto = props.declinedVeto;

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

  const handleVeto = () => {
    props.onVeto();
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
              showButtons={!policyPeek}
            />
          ))}
        </Container>
        <Container className="center">
          {!declinedVeto &&
            enactedPolicies.filter((card) => card.fascist === 1).length === 5 &&
            gamePolicies.length === 2 && (
              <Button
                className="button"
                type="submit"
                variant="danger"
                onClick={handleVeto}
              >
                Request Veto
              </Button>
            )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ChoosePolicyModal;
