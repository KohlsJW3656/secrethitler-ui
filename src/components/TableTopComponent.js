import React from "react";
import { useSelector } from "react-redux";
import { Board } from "./Board";
import { Container } from "react-bootstrap";
import GameUserImageComponent from "./GameUserImageComponent";

import "../styles/tabletop.css";

function TableTopComponent(props) {
  const gameUsers = props.gameUsers;
  const currentUser = props.currentUser;
  const deckPolicies = useSelector((state) => state.deckPolicies);
  const discardedPolicies = useSelector((state) => state.discardedPolicies);
  const enactedPolicies = useSelector((state) => state.enactedPolicies);
  const electionTracker = useSelector((state) => state.electionTracker);

  return (
    <>
      <Container className="center">
        {gameUsers.map((gameUser) => (
          <GameUserImageComponent
            gameUser={gameUser}
            currentUser={currentUser}
            playerCount={gameUsers.length}
          ></GameUserImageComponent>
        ))}
      </Container>
      <Container className="verticalCenter">
        <div className="pile center">
          <img id="drawPile" src="../images/draw.png" alt="Draw Pile" />
          <p>Policies: {deckPolicies.length}</p>
        </div>
        <Board
          type="Fascist"
          enactedCount={
            enactedPolicies.filter((card) => card.fascist === 1).length
          }
          playerCount={gameUsers.length}
        />
      </Container>
      <Container className="verticalCenter">
        <div className="pile center">
          <img
            id="discardPile"
            src="../images/discard.png"
            alt="Discard Pile"
          />
          <p>Policies: {discardedPolicies.length}</p>
        </div>
        <Board
          type="Liberal"
          enactedCount={
            enactedPolicies.filter((card) => card.fascist === 0).length
          }
          playerCount={gameUsers.length}
          electionTracker={electionTracker}
        />
      </Container>
    </>
  );
}
export default TableTopComponent;
