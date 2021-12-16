import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGettingUsers, startEditingUserAdmin } from "../actions";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "../styles/table.css";
import Button from "react-bootstrap/Button";
import Notification from "./Notification";
import UserModal from "./UserModal";
import ErrorModal from "./ErrorModal";
import { Container } from "react-bootstrap";

function AdminComponent(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const jwt = useSelector((state) => state.jwt);
  const playerCount = useSelector((state) => state.playerCount);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    user_id: -1,
    first_name: "",
    last_name: "",
    email: "",
    account_type: -1,
    last_used: "",
  });

  const userColumns = [
    { dataField: "user_id", text: "Id", sort: true },
    { dataField: "first_name", text: "First Name", sort: true },
    { dataField: "last_name", text: "Last Name", sort: true },
    { dataField: "email", text: "Email" },
    {
      dataField: "account_type",
      text: "Account Type",
      sort: true,
      formatter: (cell, row) => (cell === 1 ? "Admin" : "User"),
    },
    {
      dataField: "last_used",
      text: "Last Used",
      sort: true,
      formatter: (cell, row) => new Date(cell).toLocaleString(),
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

  useEffect(() => {
    dispatch(startGettingUsers(jwt));
  }, [dispatch, selectedUser.user_id, jwt]);

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleEditUserClick = () => {
    if (selectedUser.user_id !== -1) {
      setEditUserOpen(true);
    } else {
      setErrorMessage("Please select a user to edit.");
      setDisplayErrorOpen(true);
    }
  };

  const handleEditUserClose = () => {
    setEditUserOpen(false);
  };

  const handleEditUser = (
    user_id,
    first_name,
    last_name,
    email,
    account_type,
    last_used
  ) => {
    dispatch(
      startEditingUserAdmin(
        user_id,
        first_name,
        last_name,
        email,
        account_type,
        last_used,
        jwt
      )
    );
    setSelectedUser({
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      account_type: account_type,
      last_used: last_used,
    });
    setEditUserOpen(false);
  };

  return (
    <div>
      <Notification></Notification>
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Connected Players: {playerCount}</p>
      </Container>
      <div className="flex justify-content-between align-items-center my-2">
        <h1>Users</h1>
        <BootstrapTable
          bootstrap4
          keyField="user_id"
          data={users}
          columns={userColumns}
          noDataIndication="No users found"
          selectRow={userSelect}
          rowClasses="tableRow"
        />

        <ErrorModal
          open={displayErrorOpen}
          onClose={handleDisplayErrorClose}
          onSubmit={handleDisplayErrorClose}
          title="Warning!"
          message={errorMessage}
        />

        <UserModal
          user={selectedUser}
          open={editUserOpen}
          onClose={handleEditUserClose}
          onSubmit={handleEditUser}
          title="Edit User"
        />

        <div className="buttonRow">
          <span className="mr-2">
            <Button
              type="button"
              className="btn btn-warning"
              onClick={handleEditUserClick}
            >
              Edit User
            </Button>
          </span>
          <span>
            <Button type="button" className="btn btn-danger">
              Delete User
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminComponent;
