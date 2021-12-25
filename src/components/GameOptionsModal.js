import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/modal.css";

function GameOptionsModal(props) {
  const [open, setOpen] = useState(props.open);
  const isJoin = props.mode === "Join";
  const [username, setUsername] = useState(
    props.user.first_name + " " + props.user.last_name
  );
  const [lobbyCode, setLobbyCode] = useState("");
  const [gameType, setGameType] = useState(0);

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
    props.onSubmit(username, lobbyCode, gameType);
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
        <Modal.Title id="camera-modal">
          {isJoin ? "Join Game" : "Create Game"}
        </Modal.Title>
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
          {!isJoin && (
            <Form.Group>
              <Form.Label>Game Type</Form.Label>
              <Form.Control
                required
                as="select"
                value={gameType}
                onChange={(e) => setGameType(parseInt(e.target.value))}
              >
                <option value="0">Public</option>
                <option value="1">Private</option>
              </Form.Control>
            </Form.Group>
          )}
          {isJoin && (
            <Form.Group>
              <Form.Label>Lobby Id</Form.Label>
              <Form.Control
                required
                type="text"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
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
              <Button
                className="btn btn-info"
                type="button"
                variant="info"
                onClick={handleSubmit}
              >
                {isJoin ? "Join Game" : "Create Game"}
              </Button>
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default GameOptionsModal;
