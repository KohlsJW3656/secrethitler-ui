import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Board } from "./Board";
import { getAllPolicies, startEditingPolicy } from "./actions";

export function Home() {
  const dispatch = useDispatch();
  const allPolicies = useSelector((state) => state.allPolicies);
  const [playerCount, setPlayerCount] = useState(6);
  const policyDeck = allPolicies.filter(
    (policy) => policy.isDiscarded === 0 && policy.isEnacted === 0
  );
  const discarded = allPolicies.filter(
    (policy) => policy.isDiscarded === 1 && policy.isEnacted === 0
  );
  const notEnacted = allPolicies.filter((policy) => policy.isEnacted === 0);
  const enacted = allPolicies.filter((policy) => policy.isEnacted === 1);

  useEffect(() => {
    dispatch(getAllPolicies());
  }, []);

  const enactTop = () => {
    let topPolicy = policyDeck[0];
    topPolicy.isEnacted = 1;
    dispatch(startEditingPolicy(topPolicy));
    resetDeckOrder(
      policyDeck.filter((policy) => policy.policy_id !== topPolicy.policy_id)
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
    for (let i = 0; i < notEnacted.length; i++) {
      notEnacted[i].isDiscarded = 0;
      dispatch(startEditingPolicy(notEnacted[i]));
    }
    setTimeout(() => randomizeDeck(notEnacted), 500);
  };

  const resetGame = () => {
    for (let i = 0; i < allPolicies.length; i++) {
      allPolicies[i].isDiscarded = 0;
      allPolicies[i].isEnacted = 0;
      dispatch(startEditingPolicy(allPolicies[i]));
    }
    setTimeout(() => randomizeDeck(allPolicies), 500);
  };

  const resetDeckOrder = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].deckOrder = i;
      dispatch(startEditingPolicy(array[i]));
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
      <p>Deck: {policyDeck.length}</p>
      <p>Discarded: {discarded.length}</p>
      <Link className="button" to="/officials">
        Draw Policies
      </Link>
      <div className="container">
        <Board
          type="Liberal"
          enactedCount={
            enacted.filter((card) => card.type === "Liberal").length
          }
          playerCount={playerCount}
        />
        <Board
          type="Fascist"
          enactedCount={
            enacted.filter((card) => card.type === "Fascist").length
          }
          playerCount={playerCount}
        />
      </div>
    </div>
  );
}
