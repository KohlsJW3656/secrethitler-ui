import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/modal.css";

function CreateGameModal(props) {
  const [open, setOpen] = useState(props.open);
  const [username, setUsername] = useState(
    props.user.first_name + " " + props.user.last_name
  );
  const [gameType, setGameType] = useState(0);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const validatePasswords = (e) => {
    if (password1 !== e.target.value) {
      e.target.setCustomValidity("Passwords do not match");
    } else {
      e.target.setCustomValidity("");
    }
  };

  useEffect(() => {
    setOpen(props.open);
    setUsername(props.user.first_name + " " + props.user.last_name);
    setGameType(0);
    setPassword1("");
    setPassword2("");
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(username, gameType, password2);
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
        <Modal.Title id="camera-modal">Create Game</Modal.Title>
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
          {gameType === 1 && (
            <>
              <Form.Group>
                <Form.Label>Lobby Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                    validatePasswords(e);
                  }}
                />
              </Form.Group>
            </>
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
                Create Game
              </Button>
            </span>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateGameModal;
