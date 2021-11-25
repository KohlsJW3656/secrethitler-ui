import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Board } from "./Board";
import {
  startGettingAllPolicies,
  startGettingDrawPolicies,
  startGettingDeckPolicies,
  startGettingDiscardedPolicies,
  startGettingEnactedPolicies,
  startGettingNotEnactedPolicies,
  startGettingTopPolicy,
  startEditingPolicy,
} from "../actions";
import { withRouter } from "react-router-dom";

import "../styles/dashboard.css";

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
    fetchAll();
  }, [dispatch, jwt]);

  const fetchAll = () => {
    dispatch(startGettingAllPolicies(jwt));
    dispatch(startGettingDrawPolicies(jwt));
    dispatch(startGettingDeckPolicies(jwt));
    dispatch(startGettingDiscardedPolicies(jwt));
    dispatch(startGettingEnactedPolicies(jwt));
    dispatch(startGettingNotEnactedPolicies(jwt));
    dispatch(startGettingTopPolicy(jwt));
  };

  const enactTop = () => {
    topPolicy.isEnacted = 1;
    dispatch(startEditingPolicy(topPolicy, jwt));
    resetDeckOrder(
      deckPolicies.filter((policy) => policy.policy_id !== topPolicy.policy_id)
    );
    fetchAll();
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
    fetchAll();
  };

  const resetGame = () => {
    for (let i = 0; i < allPolicies.length; i++) {
      allPolicies[i].isDiscarded = 0;
      allPolicies[i].isEnacted = 0;
      dispatch(startEditingPolicy(allPolicies[i], jwt));
    }
    setTimeout(() => randomizeDeck(allPolicies), 500);
    fetchAll();
  };

  const resetDeckOrder = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].deckOrder = i;
      dispatch(startEditingPolicy(array[i], jwt));
    }
  };

  return (
    <div>
      <h1 className="pageTitle">Secret Hitler</h1>
      <span className="button" onClick={() => shuffleDeck()}>
        Shuffle Deck
      </span>
      <span className="button important" onClick={() => resetGame()}>
        Reset Game
      </span>
      <span className="button important" onClick={() => enactTop()}>
        Enact Top Policy
      </span>
      <p>Deck: {deckPolicies.length}</p>
      <p>Discarded: {discardedPolicies.length}</p>
      <Link className="button" to="/officials">
        Draw Policies
      </Link>
      <div className="container">
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
      </div>
    </div>
  );
}

export default withRouter(DashboardComponent);
