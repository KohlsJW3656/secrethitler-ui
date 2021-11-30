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
  const allPolicies = useSelector((state) => state.allPolicies);
  const drawPolicies = useSelector((state) => state.drawPolicies);
  const deckPolicies = useSelector((state) => state.deckPolicies);
  const discardedPolicies = useSelector((state) => state.discardedPolicies);
  const enactedPolicies = useSelector((state) => state.enactedPolicies);
  const notEnactedPolicies = useSelector((state) => state.notEnactedPolicies);
  const topPolicy = useSelector((state) => state.topPolicy);

  const [playerCount, setPlayerCount] = useState(10);

  useEffect(() => {
    dispatch(startGettingAllPolicies(jwt));
  }, []);

  const enactTop = () => {
    topPolicy.isEnacted = 1;
    dispatch(startEditingPolicy(topPolicy, jwt));
    resetDeckOrder(
      deckPolicies.filter((policy) => policy.policy_id !== topPolicy.policy_id)
    );
  };

  const randomizeDeck = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    resetDeckOrder(array);
  };

  const shuffleDeck = () => {
    for (let i = 0; i < notEnactedPolicies.length; i++) {
      notEnactedPolicies[i].isDiscarded = 0;
      dispatch(startEditingPolicy(notEnactedPolicies[i], jwt));
    }
    setTimeout(() => randomizeDeck(notEnactedPolicies), 500);
  };

  const resetGame = () => {
    for (let i = 0; i < allPolicies.length; i++) {
      allPolicies[i].isDiscarded = 0;
      allPolicies[i].isEnacted = 0;
      dispatch(startEditingPolicy(allPolicies[i], jwt));
    }
    setTimeout(() => randomizeDeck(allPolicies), 500);
  };

  const resetDeckOrder = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].deckOrder = i;
      dispatch(startEditingPolicy(array[i], jwt));
    }
    dispatch(startGettingAllPolicies(jwt));
  };

  return (
    <div>
      <h1 className="pageTitle">Secret Hitler</h1>{" "}
      <Container>
        {" "}
        <Link className="button" to="/officials">
          Draw Policies
        </Link>
        <span className="button" onClick={() => shuffleDeck()}>
          Shuffle Deck
        </span>
        <span className="button" onClick={() => enactTop()}>
          Enact Top Policy
        </span>
        <span className="button" onClick={() => resetGame()}>
          Reset Game
        </span>
      </Container>
      <Container>
        <p>Deck: {deckPolicies.length}</p>
        <p>Discarded: {discardedPolicies.length}</p>
      </Container>
      <Container>
        <Board
          type="Liberal"
          enactedCount={
            enactedPolicies.filter((card) => card.type === "Liberal").length
          }
          playerCount={playerCount}
        />
        <Board
          type="Fascist"
          enactedCount={
            enactedPolicies.filter((card) => card.type === "Fascist").length
          }
          playerCount={playerCount}
        />
      </Container>
    </div>
  );
}

export default withRouter(DashboardComponent);
