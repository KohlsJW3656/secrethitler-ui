import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../styles/table.css";
import Notification from "./Notification";
import { AddNotification } from "../actions";
import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import { Container } from "react-bootstrap";

function LobbyComponent(props) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const gameUsers = useSelector((state) => state.gameUsers);
  const gameHost = useSelector((state) => state.gameHost);
  const socket = useSelector((state) => state.socket);
  const gameUser = useSelector((state) => state.gameUser);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [kickUserOpen, setKickUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    game_user_id: -1,
    username: "No user selected",
  });
  const [kickUserMessage, setKickUserMessage] = useState("");

  const userColumns = [
    { dataField: "game_user_id", text: "Id" },
    { dataField: "username", text: "Username" },
    {
      dataField: "ready",
      text: "Ready",
      formatter: (cell, row) => (cell === 1 ? "Yes" : "No"),
    },
  ];

  const userSelect = {
    mode: "radio",
    classes: "selectedRow",
    hideSelectColumn: true,
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedUser(row);
    },
  };

  /* Client is kicked, send to game selection */
  useEffect(() => {
    if (socket == null) return;
    socket.on("kicked", (message) => {
      dispatch(AddNotification({ type: "danger", message: message }));
      props.history.push("/game");
    });
  }, [socket, dispatch, props.history]);

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleKickUserClick = () => {
    if (selectedUser.game_user_id !== -1) {
      setKickUserMessage(
        "Are you sure you want to kick " + selectedUser.username + "?"
      );
      setKickUserOpen(true);
    } else {
      setErrorMessage("Please select a user to kick.");
      setDisplayErrorOpen(true);
    }
  };

  const handleKickUserClose = () => {
    setKickUserOpen(false);
  };

  const handleKickUser = () => {
    socket.emit("kick-user", {
      gameUserId: selectedUser.game_user_id,
      gameId: game.game_id,
      userId: selectedUser.user_id,
      username: selectedUser.username,
    });
    setSelectedUser({ game_user_id: -1, username: "No user selected" });
    setKickUserOpen(false);
  };

  const handleReadyUp = () => {
    socket.emit("user-ready", {
      gameUserId: gameUser.game_user_id,
      gameId: game.game_id,
      username: gameUser.username,
      ready: !gameUser.ready,
    });
  };

  const handleStartGame = () => {};

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
      <ConfirmModal
        open={kickUserOpen}
        onClose={handleKickUserClose}
        onSubmit={handleKickUser}
        title={"Confirm Kick Player"}
        message={kickUserMessage}
      />
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Game Name: {game.name}</p>
      </Container>
      <Container>
        <p>Connected Players: {gameUsers.length}</p>
      </Container>
      <Container>
        {gameHost && (
          <>
            <span className="button" onClick={() => handleStartGame()}>
              Start Game
            </span>
            <span className="button" onClick={() => handleKickUserClick()}>
              Kick Player
            </span>
          </>
        )}
        <span className="button" onClick={() => handleReadyUp()}>
          Ready
        </span>
      </Container>
      <Container>
        <BootstrapTable
          bootstrap4
          keyField="username"
          data={gameUsers}
          columns={userColumns}
          noDataIndication="No users connected"
          selectRow={userSelect}
          rowClasses="tableRow"
        />
      </Container>
    </div>
  );
}

export default withRouter(LobbyComponent);
