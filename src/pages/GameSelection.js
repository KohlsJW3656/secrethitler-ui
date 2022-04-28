import React, { useEffect } from "react";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import GameComponent from "../components/GameSelectionComponent";
import FooterComponent from "../components/FooterComponent";

function GameSelection({ history }) {
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
        <GameComponent history={history} />
        <FooterComponent />
      </Container>
    </>
  );
}

export default withRouter(GameSelection);
