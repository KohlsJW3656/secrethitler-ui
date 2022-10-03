import React from "react";
import { useSelector } from "react-redux";
import "../styles/tabletop.css";

function GameUserImageComponent(props) {
  const currentUser = props.currentUser;
  const playerCount = props.playerCount;
  const chooseChancellor = props.chooseChancellor;
  const gameUser = props.gameUser;
  const fascist = useSelector((state) => state.fascist);
  const hitler = useSelector((state) => state.hitler);

  const determineImage = (gameUser, currentUser) => {
    if (fascist && (!hitler || playerCount < 7)) {
      return gameUser.role_id;
    } else if (gameUser.role_id === currentUser.role_id) {
      return gameUser.role_id;
    }
    return 0;
  };

  return (
    <div className="gameUser center">
      <img
        src={
          "../images/roles/" + determineImage(gameUser, currentUser) + ".png"
        }
        alt={gameUser.username}
      />
      <p className="noMargin">{gameUser.username}</p>
      {gameUser.president === 1 && (
        <img
          className="status"
          src="../images/president.jpg"
          alt="President Plaque"
        />
      )}
      {gameUser.chancellor === 1 && (
        <img
          className="status"
          src="../images/chancellor.jpg"
          alt="Chancellor Plaque"
        />
      )}
      {chooseChancellor && (
        <button
          className="button"
          onClick={() => props.select(gameUser.game_user_id)}
        >
          Select
        </button>
      )}
    </div>
  );
}
export default GameUserImageComponent;
