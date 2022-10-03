import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import GameUserImageComponent from "./GameUserImageComponent";
import "../styles/modal.css";

function CastBallotModal(props) {
  const [open, setOpen] = useState(props.open);
  const eligibleUsers = props.gameUsers.filter(
    (gameUser) => gameUser.president === 1 || gameUser.chancellor === 1
  );
  const currentUser = props.currentUser;
  const playerCount = props.playerCount;

  useEffect(() => {
    setOpen(props.open);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (ballot) => {
    props.onSubmit(ballot);
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
        <Container className="verticalCenter">
          {eligibleUsers.map((gameUser) => (
            <GameUserImageComponent
              gameUser={gameUser}
              currentUser={currentUser}
              playerCount={playerCount}
            ></GameUserImageComponent>
          ))}
        </Container>
        <Container>
          <img
            className="ballot"
            src="../images/1vote.png"
            alt="Vote Ja! (yes)"
            onClick={() => handleSubmit(1)}
          />
          <img
            className="ballot"
            src="../images/0vote.png"
            alt="Vote Nein! (no)"
            onClick={() => handleSubmit(0)}
          />
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default CastBallotModal;
