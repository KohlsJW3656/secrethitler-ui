import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Board } from "./Board";
import { startGettingAllPolicies, startEditingPolicy } from "../actions";
import { withRouter } from "react-router-dom";

import "../styles/dashboard.css";
import { Container } from "react-bootstrap";

function DashboardComponent() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.jwt);
  const playerCount = useSelector((state) => state.playerCount);

  useEffect(() => {}, []);

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
