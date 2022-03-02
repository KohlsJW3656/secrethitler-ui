import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/modal.css";

function JoinGameModal(props) {
  const [open, setOpen] = useState(props.open);
  const [username, setUsername] = useState(
    props.user.first_name + " " + props.user.last_name
  );
  const [lobbyPassword, setLobbyPassword] = useState("");
  const isPrivate = props.selectedGame.private_game;

  useEffect(() => {
    setOpen(props.open);
    setUsername(props.user.first_name + " " + props.user.last_name);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(username, lobbyPassword);
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
        <Modal.Title id="camera-modal">Join Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Set Username</Form.Label>
            <Form.Control
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          {isPrivate === 1 && (
            <Form.Group>
              <Form.Label>Lobby Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={lobbyPassword}
                onChange={(e) => setLobbyPassword(e.target.value)}
              />
            </Form.Group>
          )}
          <div>
            <span className="float-right">
              <Button
                className="btn btn-info"
                type="button"
                variant="danger"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </span>
            <span className="float-right mr-2">
              <Button className="btn btn-info" type="submit" variant="info">
                Join Game
              </Button>
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default JoinGameModal;
