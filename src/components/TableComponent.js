import React from "react";
import { Board } from "./Board";
import { Container } from "react-bootstrap";
import GameUserImageComponent from "./GameUserImageComponent";

import "../styles/boardTable.css";

function TableComponent(props) {
  const gameUsers = props.gameUsers;
  const currentUser = props.currentUser;
  const playerCount = props.playerCount;
  const enactedPolicies = props.gamePolicies.filter((policy) => policy.enacted);

  return (
    <Container id="gameUserContainer">
      {gameUsers.map((gameUser) => (
        <GameUserImageComponent
          gameUser={gameUser}
          currentUser={currentUser}
        ></GameUserImageComponent>
      ))}

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
  );
}
export default TableComponent;
