import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

import "../styles/sh.css";
import { Container } from "react-bootstrap";
import TableComponent from "./TableComponent";

function SHComponent() {
  const dispatch = useDispatch();
  const playerCount = useSelector((state) => state.playerCount);
  const gameUsers = useSelector((state) => state.gameUsers);
  const gameUser = useSelector((state) => state.gameUser);
  const gamePolicies = useSelector((state) => state.gamePolicies);

  useEffect(() => {});

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

  const distributeFields = () => {
    let radius = 400;
    let fields = document.getElementsByClassName("gameUser"),
      container = document.getElementById("gameUserContainer"),
      width = container.offsetWidth,
      height = container.offsetHeight,
      angle = 0,
      step = (2 * Math.PI) / fields.length;
    for (let i = 0; i < fields.length; i++) {
      let x = Math.round(
        width / 2 + radius * Math.cos(angle) - fields[i].offsetWidth / 2
      );
      let y = Math.round(
        height / 2 + radius * Math.sin(angle) - fields[i].offsetHeight / 2
      );
      if (window.console) {
        console.log(fields[i].innerHTML, x, y);
      }
      fields[i].style.left = x + "px";
      fields[i].style.top = y + "px";
      angle += step;
    }
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
      </Container>

      <TableComponent
        gameUsers={gameUsers}
        currentUser={gameUser}
        playerCount={playerCount}
        gamePolicies={gamePolicies}
      ></TableComponent>
    </div>
  );
}

export default withRouter(SHComponent);
