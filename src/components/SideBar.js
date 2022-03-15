import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SecretIdComponent from "./SecretIdComponent";

import { startLoggingOutUser } from "../actions";

function SideBar(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const gameUser = useSelector((state) => state.gameUser);
  const socket = useSelector((state) => state.socket);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(startLoggingOutUser(socket, props.history));
  };

  return (
    <div className="nav">
      <div className="nav-content">
        <h3 className="p-2 center">
          {user.first_name} {user.last_name}
        </h3>

        {Object.entries(gameUser).length !== 0 && gameUser.role_id !== 0 && (
          <div className="center">
            <SecretIdComponent roleId={gameUser.role_id}></SecretIdComponent>
          </div>
        )}
        <div className="d-flex flex-column mt-2">
          {admin && (
            <Link
              to="/admin"
              className={`aLink ${props.active === "admin" ? "active" : ""}`}
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            to="/dashboard"
            className={`aLink ${props.active === "dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/game"
            className={`aLink ${props.active === "game" ? "active" : ""}`}
          >
            Game
          </Link>
          <Link
            to="/account"
            className={`aLink ${props.active === "account" ? "active" : ""}`}
          >
            Account
          </Link>
        </div>
      </div>
      <Button className="logout" variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default SideBar;
