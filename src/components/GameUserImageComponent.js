import React from "react";
import "../styles/boardTable.css";

function GameUserImageComponent(props) {
  const currentUser = props.currentUser;
  const gameUser = props.gameUser;

  const determineImage = (gameUser, currentUser) => {
    if (currentUser.party_membership) {
      return gameUser.role_id;
    } else {
      return 0;
    }
  };

  return (
    <div className="gameUser">
      <img
        src={
          "../images/players/" + determineImage(gameUser, currentUser) + ".png"
        }
        alt={gameUser.username}
      />
      <p>{gameUser.username}</p>
    </div>
  );
}
export default GameUserImageComponent;
