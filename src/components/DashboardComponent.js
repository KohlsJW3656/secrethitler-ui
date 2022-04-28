import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import "../styles/dashboard.css";
import { Container } from "react-bootstrap";

function DashboardComponent() {
  const playerCount = useSelector((state) => state.playerCount);

  return (
    <div>
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Connected Players: {playerCount}</p>
      </Container>
      <h3>Sources</h3>
      <Container>
        <ul>
          <li>
            <a
              href="//encyclopedia.ushmm.org/content/en/question/how-did-the-united-states-government-and-american-people-respond-to-nazism"
              target="_blank"
            >
              https://encyclopedia.ushmm.org/content/en/question/how-did-the-united-states-government-and-american-people-respond-to-nazism
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default withRouter(DashboardComponent);
