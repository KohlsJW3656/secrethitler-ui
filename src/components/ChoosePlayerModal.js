import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import GameUserImageComponent from "./GameUserImageComponent";
import "../styles/modal.css";

function ChoosePlayerModal(props) {
  const [open, setOpen] = useState(props.open);
  const currentUser = props.currentUser;
  const eligibleUsers = props.eligibleUsers;
  const playerCount = props.playerCount;

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (game_user_id) => {
    props.onSubmit(game_user_id);
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
          {eligibleUsers.map((gameUser) => (
            <GameUserImageComponent
              showButtons
              gameUser={gameUser}
              currentUser={currentUser}
              playerCount={playerCount}
              select={handleSubmit}
            ></GameUserImageComponent>
          ))}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ChoosePlayerModal;
