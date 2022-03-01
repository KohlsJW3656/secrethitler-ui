import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../styles/table.css";
import Button from "react-bootstrap/Button";
import Notification from "./Notification";
import { AddNotification } from "../actions";
import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import { Container } from "react-bootstrap";

function LobbyComponent(props) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const gameUser = useSelector((state) => state.gameUser);
  const gameUsers = useSelector((state) => state.gameUsers);
  const gameHost = useSelector((state) => state.gameHost);
  const socket = useSelector((state) => state.socket);
  const jwt = useSelector((state) => state.jwt);
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
  }, [socket]);

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
    let gameUserId = selectedUser.game_user_id;
    let gameId = game.game_id;
    let userId = selectedUser.user_id;
    let username = selectedUser.username;
    socket.emit("kick-user", { gameUserId, gameId, userId, username });
    setSelectedUser({ game_user_id: -1, username: "No user selected" });
    setKickUserOpen(false);
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
      <ConfirmModal
        open={kickUserOpen}
        onClose={handleKickUserClose}
        onSubmit={handleKickUser}
        title={"Confirm Kick Player"}
        message={kickUserMessage}
      />
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Game Code: {game.game_code}</p>
      </Container>
      <Container>
        <p>Connected Players: {gameUsers.length}</p>
      </Container>
      {gameHost && (
        <Container>
          <span className="button" onClick={() => handleKickUserClick()}>
            Kick Player
          </span>
        </Container>
      )}
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
