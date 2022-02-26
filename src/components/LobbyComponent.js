import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../styles/table.css";
import Button from "react-bootstrap/Button";
import Notification from "./Notification";
import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import { Container } from "react-bootstrap";

function LobbyComponent(props) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const gameUser = useSelector((state) => state.gameUser);
  const gameUsers = useSelector((state) => state.gameUsers);
  const socket = useSelector((state) => state.socket);
  const jwt = useSelector((state) => state.jwt);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [kickUserOpen, setKickUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ username: "" });
  const userColumns = [
    { dataField: "game_user_id", text: "Id" },
    { dataField: "username", text: "Username" },
    // { dataField: "", text: "Kick" },
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

  useEffect(() => {
    if (socket == null) return;
    let gameId = game.game_id;
    let gameUserId = gameUser.game_user_id;
    let username = gameUser.username;
    //socket.emit("leave-game", { gameId, gameUserId, username });
  }, [socket]);

  useEffect(() => {});

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleKickUserClick = () => {
    if (selectedUser.username !== "") {
      setKickUserOpen(true);
    } else {
      setErrorMessage("Please select a user to kick.");
      setDisplayErrorOpen(true);
    }
  };

  const handleKickUserClose = () => {
    setKickUserOpen(false);
  };

  const handleKickUser = () => {};

  return (
    <div>
      <Notification></Notification>
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Game Code: {game.game_code}</p>
      </Container>
      <Container>
        <p>Connected Players: {gameUsers.length}</p>
      </Container>
      <Container></Container>
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
