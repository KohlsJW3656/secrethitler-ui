import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../components/Notification";
import { startSendingEmail } from "../actions";

import "../styles/home.css";

function Forgotpassword({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onForgotPassword = (event) => {
    event.preventDefault();
    dispatch(startSendingEmail(email, history));
  };

  return (
    <>
      <Notification></Notification>
      <div className="home1">
        <h1>
          <span class="logoText">Forgot Password</span>
        </h1>
        <Form onSubmit={onForgotPassword}>
          <Form.Group controlId="Enter Email Address">
            <Form.Label>Enter Your Email Address</Form.Label>
            <Form.Control
              required
              className="input2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="su">
            <p className="inline">
              Remember your password?
              <Link to="/">
                <span className="link">Login here!</span>
              </Link>
            </p>
            <Button className="button" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default withRouter(Forgotpassword);
