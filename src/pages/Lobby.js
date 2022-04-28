import React, { useEffect } from "react";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import LobbyComponent from "../components/LobbyComponent";
import FooterComponent from "../components/FooterComponent";

function Lobby({ history }) {
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <SideBar history={history} active="game" />
      <Container>
        <LobbyComponent history={history} />
        <FooterComponent />
      </Container>
    </>
  );
}

export default withRouter(Lobby);
