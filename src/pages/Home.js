import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { startLoggingInUser } from "../actions";
import Notification from "../components/Notification";

import "../styles/home.css";

function Home({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const socket = useSelector((state) => state.socket);

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(startLoggingInUser(email, password, socket, history));
  };

  return (
    <>
      <Notification></Notification>
      <div className="home">
        <h1>
          <span class="logoText">Secret Hitler Login</span>
        </h1>
        <Form onSubmit={onLogin}>
          <Form.Group controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="loginPassword">
            <Form.Label>
              Password
              <Link to="/forgotpassword">
                <span className="link">(Forgot Password)</span>
              </Link>
            </Form.Label>
            <Form.Control
              required
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div>
            <p className="inline">
              Don't have an account?
              <Link to="/signup">
                <span className="link">Sign up here!</span>
              </Link>
            </p>
            <div className="c">
              <Button type="submit" className="button">
                Login
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default withRouter(Home);
