import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../styles/table.css";
import Button from "react-bootstrap/Button";
import Notification from "./Notification";
import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function LobbyComponent(props) {
  const dispatch = useDispatch();
  const lobby = useSelector((state) => state.lobby);
  const lobbyUsers = useSelector((state) => state.lobbyUsers);
  const jwt = useSelector((state) => state.jwt);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [kickUserOpen, setKickUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ username: "" });
  const userColumns = [
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
        <p>Lobby Code: {lobby.lobby_code}</p>
      </Container>
      <Container>
        <p>Connected Players: {lobby.player_count}</p>
      </Container>
      <Container></Container>
      <Container>
        <BootstrapTable
          bootstrap4
          keyField="username"
          data={lobbyUsers}
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
