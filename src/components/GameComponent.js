import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startGettingJoinableGames,
  startJoiningGame,
  startCreatingGame,
} from "../actions";
import BootstrapTable from "react-bootstrap-table-next";
import Notification from "./Notification";
import ErrorModal from "./ErrorModal";
import JoinGameModal from "./JoinGameModal";
import CreateGameModal from "./CreateGameModal";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

function GameComponent(props) {
  const dispatch = useDispatch();
  const history = props.history;
  const jwt = useSelector((state) => state.jwt);
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);
  const joinableGames = useSelector((state) => state.joinableGames);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [joinGameOpen, setJoinGameOpen] = useState(false);
  const [createGameOpen, setCreateGameOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState({ game_id: -1 });
  const joinableGamesColumns = [
    {
      dataField: "private_game",
      sort: true,
      formatter: (cell, row) =>
        cell === 1 ? (
          <FontAwesomeIcon icon={faLock} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faLockOpen} className="icon" />
        ),
    },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "COUNT(game_user.game_id)", text: "Players", sort: true },
    {
      dataField: "created_time",
      text: "Created Time",
      sort: true,
      formatter: (cell, row) => new Date(cell).toLocaleString(),
    },
    // {
    //   dataField: "rules",
    //   text: "Rules",
    //   isDummyField: true,
    //   formatter: (cell, row) => <span></span>,
    // },
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
  }, [dispatch, jwt]);

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleJoinGameClose = () => {
    setJoinGameOpen(false);
  };

  const handleCreateGameClose = () => {
    setCreateGameOpen(false);
  };

  const handleJoinGame = (username, password) => {
    dispatch(
      startJoiningGame(
        selectedGame.game_id,
        username,
        password,
        socket,
        history,
        jwt
      )
    );
    setJoinGameOpen(false);
  };

  const handleCreateGame = (gameName, username, gameType, password) => {
    dispatch(
      startCreatingGame(
        gameName,
        username,
        gameType,
        password,
        socket,
        history,
        jwt
      )
    );
    setCreateGameOpen(false);
  };

  const handleJoinGameClick = () => {
    if (selectedGame.game_id !== -1) {
      setJoinGameOpen(true);
    } else {
      setErrorMessage("Please select a game to join.");
      setDisplayErrorOpen(true);
    }
  };

  const handleCreateGameClick = () => {
    setCreateGameOpen(true);
  };

  return (
    <div>
      <Notification></Notification>
      <ErrorModal
        open={displayErrorOpen}
        onClose={handleDisplayErrorClose}
        onSubmit={handleDisplayErrorClose}
        title="Warning!"
        message={errorMessage}
      />

      <JoinGameModal
        open={joinGameOpen}
        user={user}
        selectedGame={selectedGame}
        onClose={handleJoinGameClose}
        onSubmit={handleJoinGame}
      />

      <CreateGameModal
        open={createGameOpen}
        user={user}
        selectedGame={selectedGame}
        onClose={handleCreateGameClose}
        onSubmit={handleCreateGame}
      />
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <span className="button" onClick={() => handleCreateGameClick()}>
          Create Game
        </span>
        <span className="button" onClick={() => handleJoinGameClick()}>
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
