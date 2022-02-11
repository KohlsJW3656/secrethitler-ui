import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGettingJoinableGames, startJoiningGame } from "../actions";
import { BrowserRouter as Router, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import Notification from "./Notification";
import ErrorModal from "./ErrorModal";
import GameOptionsModal from "./GameOptionsModal";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import randomstring from "randomstring";
import { startCreatingGame } from "../actions";

function GameComponent(props) {
  const dispatch = useDispatch();
  const history = props.history;
  const randomGameCode = randomstring;
  const jwt = useSelector((state) => state.jwt);
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  const joinableGames = useSelector((state) => state.joinableGames);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [gameOptionsOpen, setGameOptionsOpen] = useState(false);
  const [gameOptionsMode, setGameOptionsMode] = useState();
  const [selectedGame, setSelectedGame] = useState({ game_id: -1 });
  const joinableGamesColumns = [
    { dataField: "game_id", text: "Id", sort: true },
    { dataField: "game_code", text: "Game Code" },
    {
      dataField: "private_game",
      text: "Game Type",
      sort: true,
      formatter: (cell, row) => (cell === 1 ? "Private" : "Public"),
    },
    {
      dataField: "created_time",
      text: "Created Time",
      sort: true,
      formatter: (cell, row) => new Date(cell).toLocaleString(),
    },
  ];

  const gameSelect = {
    mode: "radio",
    classes: "selectedRow",
    hideSelectColumn: true,
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedGame(row);
    },
  };

  useEffect(() => {
    dispatch(startGettingJoinableGames(jwt));
  }, [dispatch, selectedGame.game_id, jwt]);

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleGameOptionsClose = () => {
    setGameOptionsOpen(false);
  };

  const handleGameOptions = (username, gameCode, gameType) => {
    /* Creating game */
    if (gameCode === "") {
      gameCode = randomGameCode.generate(5);
      dispatch(
        startCreatingGame(gameCode, gameType, username, socket, history, jwt)
      );
    } else {
      /* Joining game */
      dispatch(
        startJoiningGame(selectedGame.game_id, username, socket, history, jwt)
      );
    }
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
      <Container>
        <BootstrapTable
          bootstrap4
          keyField="game_id"
          data={joinableGames}
          columns={joinableGamesColumns}
          noDataIndication="No games available"
          selectRow={gameSelect}
          rowClasses="tableRow"
        />
      </Container>
    </div>
  );
}

export default withRouter(GameComponent);
