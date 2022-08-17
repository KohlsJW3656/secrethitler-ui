import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import GameUserImageComponent from "./GameUserImageComponent";
import "../styles/modal.css";

function ChooseChancellorModal(props) {
  const [open, setOpen] = useState(props.open);
  const currentUser = props.currentUser;
  const eligibleUsers = props.gameUsers.filter(
    (gameUser) =>
      gameUser.role_id !== currentUser.role_id &&
      gameUser.prev_president === 0 &&
      gameUser.prev_chancellor === 0
  );
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
              gameUser={gameUser}
              currentUser={currentUser}
              playerCount={playerCount}
              select={handleSubmit}
              chooseChancellor={true}
            ></GameUserImageComponent>
          ))}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ChooseChancellorModal;
