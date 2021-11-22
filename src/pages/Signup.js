import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startAddingUser, AddNotification } from "../actions";
import { Link, withRouter } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notification from "../components/Notification";

import "../styles/home.css";

function Signup({ history }) {
  const dispatch = useDispatch();
  const recaptchaRef = React.createRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const validatePasswords = (e) => {
    if (password1 !== e.target.value) {
      e.target.setCustomValidity("Passwords do not match");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const onSignup = (event) => {
    event.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue === "") {
      dispatch(
        AddNotification({
          type: "danger",
          message: "Please verify you are not a robot.",
        })
      );
    } else {
      dispatch(startAddingUser(firstName, lastName, email, password2, history));
    }
  };

  return (
    <>
      <Notification></Notification>
      <div className="sup">
        <h1>
          <span class="logoText">Secret Hitler Sign up</span>
        </h1>
        <Form onSubmit={onSignup}>
          <Form.Group controlId="signupFirstName">
            <Form.Label className="inline">First Name</Form.Label>
            <Form.Control
              required
              className="inputsignup4"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="signupLastName">
            <Form.Label className="inline">Last Name</Form.Label>
            <Form.Control
              required
              className="inputsignup3"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="signupEmail">
            <Form.Label className="inline">Email address</Form.Label>
            <Form.Control
              required
              className="inputsignup5"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="signupPassword1">
            <Form.Label className="inline">Password</Form.Label>
            <Form.Control
              required
              className="inputsignup6"
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="signupPassword2">
            <Form.Label className="inline">Confirm Password</Form.Label>
            <Form.Control
              required
              className="inputsignup7"
              type="password"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
                validatePasswords(e);
              }}
            />
          </Form.Group>
          <ReCAPTCHA
            required
            ref={recaptchaRef}
            sitekey="6LeXDMgcAAAAAPjWUEhJ0ioTXQhwDV9WlRzfJBA3"
          />

          <p className="inline">
            Have an account?
            <Link to="/">
              <span className="logoText">Login here!</span>
            </Link>
          </p>
          <div className="but2">
            <Button type="submit">Signup</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default withRouter(Signup);
