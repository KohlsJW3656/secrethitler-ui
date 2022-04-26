import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Board } from "./Board";
import { withRouter } from "react-router-dom";

import "../styles/sh.css";
import { Container } from "react-bootstrap";

function SHComponent() {
  const dispatch = useDispatch();
  const playerCount = useSelector((state) => state.playerCount);
  const gamePolicies = useSelector((state) => state.gamePolicies);

  useEffect(() => {}, []);

  const enactTop = () => {
    /*topPolicy.isEnacted = 1;
    dispatch(startEditingPolicy(topPolicy, jwt));
    resetDeckOrder(
      deckPolicies.filter((policy) => policy.policy_id !== topPolicy.policy_id)
    );*/
  };

  const randomizeDeck = (array) => {
    /*
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
    */
  };

  const shuffleDeck = () => {
    /*
    for (let i = 0; i < notEnactedPolicies.length; i++) {
      notEnactedPolicies[i].isDiscarded = 0;
      dispatch(startEditingPolicy(notEnactedPolicies[i], jwt));
    }
    setTimeout(() => randomizeDeck(notEnactedPolicies), 500);
    */
  };

  const resetGame = () => {
    /*
    for (let i = 0; i < allPolicies.length; i++) {
      allPolicies[i].isDiscarded = 0;
      allPolicies[i].isEnacted = 0;
      dispatch(startEditingPolicy(allPolicies[i], jwt));
    }
    setTimeout(() => randomizeDeck(allPolicies), 500);
    */
  };

  const resetDeckOrder = (array) => {
    /*
    for (let i = 0; i < array.length; i++) {
      array[i].deckOrder = i;
      dispatch(startEditingPolicy(array[i], jwt));
    }
    dispatch(startGettingAllPolicies(jwt));
    */
  };

  return (
    <div>
      <h1 className="pageTitle">Secret Hitler</h1>
      <Container>
        <p>Connected Players: {playerCount}</p>
      </Container>

      <Container>
        <p>Policies: {gamePolicies.length}</p>
        {/* <p>Discarded: {discardedPolicies.length}</p> */}
      </Container>
      <Container>
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
        <Board
          type="Liberal"
          enactedCount={
            // enactedPolicies.filter((card) => card.type === "Liberal").length
            0
          }
          playerCount={playerCount}
        />
        <Board
          type="Fascist"
          enactedCount={
            // enactedPolicies.filter((card) => card.type === "Fascist").length
            0
          }
          playerCount={playerCount}
        />
      </Container>
    </div>
  );
}

export default withRouter(SHComponent);
