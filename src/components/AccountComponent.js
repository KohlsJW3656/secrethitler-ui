import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Notification from "./Notification";

import { startEditingUser } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import "../styles/account.css";

function AccountComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const jwt = useSelector((state) => state.jwt);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email1, setEmail1] = useState(user.email);
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const validateEmails = (e) => {
    if (email1 !== e.target.value) {
      e.target.setCustomValidity("Emails do not match");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const validatePasswords = (e) => {
    if (password1 !== e.target.value) {
      e.target.setCustomValidity("Passwords do not match");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const onEdit = (event) => {
    event.preventDefault();
    dispatch(startEditingUser(firstName, lastName, email2, password2, jwt));
  };

  return (
    <>
      <div className="admin">
        <Notification></Notification>
        <div className="a2">
          <h1>Account Settings</h1>
          <Form onSubmit={onEdit} className="inline">
            <Form.Group controlId="editFirstName">
              <Form.Label className="inline">First name : </Form.Label>
              <Form.Control
                className="textbar-a"
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="changeLastName">
              <Form.Label className="inline">Last name : </Form.Label>
              <Form.Control
                className="textbar-b"
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="changeEmail1">
              <Form.Label className="inline">Email : </Form.Label>
              <Form.Control
                className="textbar-e"
                required
                type="email"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="changeEmail2">
              <Form.Label className="inline">Confirm Email : </Form.Label>
              <Form.Control
                className="textbar-f"
                required
                type="email"
                value={email2}
                onChange={(e) => {
                  setEmail2(e.target.value);
                  validateEmails(e);
                }}
              />
            </Form.Group>

            <Form.Group controlId="changePassword">
              <Form.Label className="inline">Password : </Form.Label>
              <Form.Control
                className="textbar"
                required
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="changePassword">
              <Form.Label className="inline">Confirm Password : </Form.Label>
              <Form.Control
                className="textbar-g"
                required
                type="password"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  validatePasswords(e);
                }}
              />
            </Form.Group>
            <div>
              <Button type="submit">Edit information</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default withRouter(AccountComponent);
