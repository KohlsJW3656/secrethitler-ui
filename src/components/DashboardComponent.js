import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container } from "react-bootstrap";

function DashboardComponent() {
  const playerCount = useSelector((state) => state.playerCount);

  return (
    <div>
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Connected Players: {playerCount}</p>
      </Container>
    </div>
  );
}

export default withRouter(DashboardComponent);
