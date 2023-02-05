import React, { useEffect } from "react";
import SHComponent from "../components/SHComponent";

import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import FooterComponent from "../components/FooterComponent";

function Game({ history }) {
  const authenticated = useSelector((state) => state.authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  });

  return (
    <>
      <Container>
        <SHComponent history={history} />
        <FooterComponent />
      </Container>
    </>
  );
}

export default withRouter(Game);
