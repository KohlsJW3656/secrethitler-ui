import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import AccountComponent from "../components/AccountComponent";
import Container from "react-bootstrap/Container";

import { useSelector } from "react-redux";

import { withRouter } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";

function Account({ history }) {
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="account" />
      <Container>
        <AccountComponent />
        <FooterComponent />
      </Container>
    </>
  );
}

export default withRouter(Account);
