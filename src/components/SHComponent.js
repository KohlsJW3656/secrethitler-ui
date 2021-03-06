import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import TableTopComponent from "./TableTopComponent";
import ErrorModal from "./ErrorModal";
import ChooseChancellorModal from "./ChooseChancellorModal";
import CastBallotModal from "./CastBallotModal";
import ChoosePolicyModal from "./ChoosePolicyModal";

function SHComponent(props) {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const game = useSelector((state) => state.game);
  const playerCount = useSelector((state) => state.playerCount);
  const gameUsers = useSelector((state) => state.gameUsers);
  const gameUser = useSelector((state) => state.gameUser);
  const drawPolicies = useSelector((state) => state.drawPolicies);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [chooseChancellorOpen, setChooseChancellorOpen] = useState(false);
  const [castBallotOpen, setCastBallotOpen] = useState(false);
  const [choosePolicyOpen, setChoosePolicyOpen] = useState(false);

  useEffect(() => {
    if (socket == null) return;
    /* The President will begin choosing a chancellor */
    socket.on("choose-chancellor", () => {
      if (gameUser.president === 1) {
        setChooseChancellorOpen(true);
      } else {
        setErrorMessage(
          "The president is choosing a chancellor, please wait for them to finish."
        );
        setDisplayErrorOpen(true);
      }
    });
    /* Users will cast their ballots */
    socket.on("initiate-ballot", () => {
      handleDisplayErrorClose();
      setCastBallotOpen(true);
    });
    /* The ballot failed */
    socket.on("ballot-failed", (data) => {
      handleDisplayErrorClose();
      setErrorMessage(
        "The ballot failed " + data.jas + " to " + data.neins + "!"
      );
      setDisplayErrorOpen(true);
    });
    /* The ballot passed */
    socket.on("ballot-passed", (data) => {
      handleDisplayErrorClose();
      if (gameUser.president === 1) {
        setErrorMessage(
          "Congratulations President, the ballot passed " +
            data.jas +
            " to " +
            data.neins +
            "! You may now discard a policy."
        );
        setDisplayErrorOpen(true);
        setChoosePolicyOpen(true);
      } else if (gameUser.chancellor === 1) {
        setErrorMessage(
          "Congratulations Chancellor, the ballot passed " +
            data.jas +
            " to " +
            data.neins +
            "! Waiting for your president to discard a policy."
        );
        setDisplayErrorOpen(true);
      } else {
        setErrorMessage(
          "The ballot passed  " +
            data.jas +
            " to " +
            data.neins +
            "! Waiting for your elected officials to pass a policy."
        );
        setDisplayErrorOpen(true);
      }
    });
    socket.on("chancellor-policies", (data) => {
      if (gameUser.chancellor === 1) {
        setChoosePolicyOpen(true);
      }
    });
  }, [
    socket,
    dispatch,
    gameUser.president,
    gameUser.chancellor,
    props.history,
  ]);

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleChooseChancellorClose = () => {
    setErrorMessage("You must select a Chancellor!");
    setDisplayErrorOpen(true);
  };

  const handleCastBallotClose = () => {
    setErrorMessage("You must cast a ballot!");
    setDisplayErrorOpen(true);
  };

  const handleChoosePolicyClose = () => {
    setErrorMessage("You must choose a policy!");
    setDisplayErrorOpen(true);
  };

  const handleChooseChancellor = (game_user_id) => {
    setChooseChancellorOpen(false);
    socket.emit("assign-chancellor", {
      gameId: game.game_id,
      game_user_id: game_user_id,
      value: 1,
    });
  };

  const handleCastBallot = (ballot) => {
    setCastBallotOpen(false);
    socket.emit("cast-ballot", {
      gameId: game.game_id,
      game_user_id: gameUser.game_user_id,
      username: gameUser.username,
      ballot: ballot,
    });
    setErrorMessage(
      "Other players are still casting their ballots, please wait for them to finish."
    );
    setDisplayErrorOpen(true);
  };

  const handleChoosePolicy = (game_policy_id, isEnacted) => {
    setChoosePolicyOpen(false);
    if (isEnacted) {
      socket.emit("enact-policy", {
        gameId: game.game_id,
        game_policy_id: game_policy_id,
        value: 1,
      });
    } else {
      socket.emit("discard-policy", {
        gameId: game.game_id,
        game_policy_id: game_policy_id,
        value: 1,
      });
    }
  };

  return (
    <>
      <h1 className="pageTitle">Secret Hitler</h1>
      <ErrorModal
        open={displayErrorOpen}
        onClose={handleDisplayErrorClose}
        onSubmit={handleDisplayErrorClose}
        title="Warning!"
        message={errorMessage}
      />
      <ChooseChancellorModal
        open={chooseChancellorOpen}
        onClose={handleChooseChancellorClose}
        onSubmit={handleChooseChancellor}
        gameUsers={gameUsers}
        currentUser={gameUser}
        playerCount={playerCount}
        title="Chancellor Selection"
      />
      <CastBallotModal
        open={castBallotOpen}
        onClose={handleCastBallotClose}
        onSubmit={handleCastBallot}
        gameUsers={gameUsers}
        currentUser={gameUser}
        playerCount={playerCount}
        title="Cast your ballot"
      />
      <ChoosePolicyModal
        open={choosePolicyOpen}
        onClose={handleChoosePolicyClose}
        onSubmit={handleChoosePolicy}
        gameUsers={gameUsers}
        gamePolicies={drawPolicies}
        title="Select a policy"
      />
      <TableTopComponent
        gameUsers={gameUsers}
        currentUser={gameUser}
        playerCount={playerCount}
      />
    </>
  );
}

export default withRouter(SHComponent);
