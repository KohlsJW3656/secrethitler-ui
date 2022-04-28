import React from "react";
import { BrowserRouter as Link, withRouter } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import Notification from "../components/Notification";

import "../styles/home.css";

function EmailConfirmation() {
  return (
    <>
      <Notification></Notification>
      <div className="home">
        <h1>An email has been sent!</h1>
        <p>Check your spam folder</p>
        <p className="inline">
          <Link to="/">
            <span className="logoText">Return to homepage</span>
          </Link>
        </p>
      </div>
      <FooterComponent />
    </>
  );
}

export default withRouter(EmailConfirmation);
