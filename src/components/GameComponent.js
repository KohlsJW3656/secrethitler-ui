import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import Notification from "./Notification";
import ErrorModal from "./ErrorModal";
import GameOptionsModal from "./GameOptionsModal";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import randomstring from "randomstring";
import { startCreatingLobby } from "../actions";

function GameComponent(props) {
  const dispatch = useDispatch();
  const history = props.history;
  const randomLobbyCode = randomstring;
  const jwt = useSelector((state) => state.jwt);
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [gameOptionsOpen, setGameOptionsOpen] = useState(false);
  const [gameOptionsMode, setGameOptionsMode] = useState();

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleGameOptionsClose = () => {
    setGameOptionsOpen(false);
  };

  const handleGameOptions = (username, lobbyCode, gameType) => {
    if (lobbyCode === "") {
      lobbyCode = randomLobbyCode.generate(5);
      dispatch(startCreatingLobby(lobbyCode, gameType, history, jwt));
    }

    socket.emit("joinLobby", { username, lobbyCode });
    //history.push("/lobby");
  };

  const createGame = () => {
    setGameOptionsMode("Create");
    setGameOptionsOpen(true);
  };

  const joinGame = () => {
    setGameOptionsMode("Join");
    setGameOptionsOpen(true);
  };

  return (
    <div>
      <ErrorModal
        open={displayErrorOpen}
        onClose={handleDisplayErrorClose}
        onSubmit={handleDisplayErrorClose}
        title="Warning!"
        message={errorMessage}
      />

      <GameOptionsModal
        open={gameOptionsOpen}
        user={user}
        onClose={handleGameOptionsClose}
        onSubmit={handleGameOptions}
        mode={gameOptionsMode}
      />
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <span className="button" onClick={() => createGame()}>
          Create Game
        </span>
        <span className="button" onClick={() => joinGame()}>
          Join Game
        </span>
      </Container>
    </div>
  );
}

export default withRouter(GameComponent);
