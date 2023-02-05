import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import TableTopComponent from "./TableTopComponent";
import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import ChoosePlayerModal from "./ChoosePlayerModal";
import CastBallotModal from "./CastBallotModal";
import ChoosePolicyModal from "./ChoosePolicyModal";
import InvestigationModal from "./InvestigationModal";

function SHComponent(props) {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const game = useSelector((state) => state.game);
  const gameUsers = useSelector((state) => state.gameUsers);
  const gameUser = useSelector((state) => state.gameUser);
  const drawPolicies = useSelector((state) => state.drawPolicies);
  const enactedPolicies = useSelector((state) => state.enactedPolicies);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [displayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [choosePlayerOpen, setChoosePlayerOpen] = useState(false);
  const [castBallotOpen, setCastBallotOpen] = useState(false);
  const [choosePolicyOpen, setChoosePolicyOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [investigationModalOpen, setInvestigationModalOpen] = useState(false);
  const [selectedGameUserId, setSelectedGameUserId] = useState(0);
  const [policyPeek, setPolicyPeek] = useState(false);
  const [investigation, setInvestigation] = useState(false);
  const [execution, setExecution] = useState(false);
  const [declinedVeto, setDeclinedVeto] = useState(false);

  useEffect(() => {
    if (socket == null) return;
    /* The President will begin choosing a chancellor */
    socket.on("choose-chancellor", () => {
      setModalTitle("Choose a Chancellor");

      // The previous president can be chancellor when 5 or less players are in
      if (gameUsers.length <= 5) {
        setEligibleUsers(
          gameUsers.filter(
            (eligibleUser) =>
              eligibleUser.role_id !== gameUser.role_id &&
              eligibleUser.prev_chancellor === 0
          )
        );
      } else {
        setEligibleUsers(
          gameUsers.filter(
            (eligibleUser) =>
              eligibleUser.role_id !== gameUser.role_id &&
              eligibleUser.prev_president === 0 &&
              eligibleUser.prev_chancellor === 0
          )
        );
      }
      setChoosePlayerOpen(true);
    });
    /* Users will cast their ballots */
    socket.on("initiate-ballot", () => {
      handleDisplayErrorClose();
      setCastBallotOpen(true);
    });
    /* The ballot failed */
    socket.on("ballot-failed", (data) => {
      handleDisplayErrorClose();
      setModalMessage(
        "The ballot failed " + data.jas + " to " + data.neins + "!"
      );
      setDisplayErrorOpen(true);
    });
    /* The ballot passed */
    socket.on("ballot-passed", (data) => {
      handleDisplayErrorClose();
      setModalMessage(
        "The ballot passed " + data.jas + " to " + data.neins + "!"
      );
      setDisplayErrorOpen(true);
    });
    /* President chooses a policy to discard */
    socket.on("president-policies", () => {
      setModalTitle("Select a policy to discard");
      setChoosePolicyOpen(true);
    });
    /* Chancellor chooses a policy to enact */
    socket.on("chancellor-policies", (data) => {
      setModalTitle("Select a policy to enact");
      if (data?.declinedVeto) {
        setDeclinedVeto(true);
      }
      setChoosePolicyOpen(true);
    });
    /* President chooses to accept/deny the veto */
    socket.on("requested-veto", () => {
      setModalTitle("Select a policy to enact");
      setModalMessage(
        "The chancellor has requested a veto, would you like to veto this policy?"
      );
      setConfirmModalOpen(true);
    });
    /* Investigate Loyalty */
    socket.on("investigate-loyalty", (data) => {
      setInvestigation(true);
      setModalTitle(data.presidentialPower.description);
      setEligibleUsers(
        gameUsers.filter(
          (eligibleUser) =>
            eligibleUser.role_id !== gameUser.role_id &&
            eligibleUser.investigated === 0
        )
      );
      setChoosePlayerOpen(true);
    });
    /* Call Special Election */
    socket.on("call-special-election", (data) => {
      handleDisplayErrorClose();
      setModalMessage(data.presidentialPower.description);
      setDisplayErrorOpen(true);
    });
    /* Policy Peek */
    socket.on("policy-peek", (data) => {
      setPolicyPeek(true);
      setModalTitle(data.presidentialPower.description);
      setChoosePolicyOpen(true);
    });
    /* Execution */
    socket.on("execution", (data) => {
      setExecution(true);
      setModalTitle(data.presidentialPower.description);
      setEligibleUsers(
        gameUsers.filter(
          (eligibleUser) => eligibleUser.role_id !== gameUser.role_id
        )
      );
      setChoosePlayerOpen(true);
    });
    /* Execution Veto */
    socket.on("execution-veto", (data) => {
      setExecution(true);
      setModalTitle(data.presidentialPower.description);
      setEligibleUsers(
        gameUsers.filter(
          (eligibleUser) => eligibleUser.role_id !== gameUser.role_id
        )
      );
      setChoosePlayerOpen(true);
    });
    /* The game is won */
    socket.on("game-win", (data) => {
      handleDisplayErrorClose();
      setModalMessage(data.message);
      setDisplayErrorOpen(true);
    });
  }, [
    socket,
    dispatch,
    gameUser.president,
    gameUser.chancellor,
    gameUser.role_id,
    gameUsers,
    props.history,
  ]);

  const handleDisplayErrorClose = () => {
    setDisplayErrorOpen(false);
  };

  const handleChoosePlayerClose = () => {
    setModalMessage("You must select a Player!");
    setDisplayErrorOpen(true);
  };

  const handleConfirmModalClose = () => {
    socket.emit("veto-response", {
      gameId: game.game_id,
      veto: false,
    });
    setConfirmModalOpen(false);
  };

  const handleCastBallotClose = () => {
    setModalMessage("You must cast a ballot!");
    setDisplayErrorOpen(true);
  };

  const handleChoosePolicyClose = () => {
    if (policyPeek) {
      setChoosePolicyOpen(false);
      setPolicyPeek(false);
      socket.emit("presidential-power", {
        gameId: game.game_id,
      });
    } else {
      setModalMessage("You must choose a policy!");
      setDisplayErrorOpen(true);
    }
  };

  const handleInvestigation = () => {
    setInvestigationModalOpen(false);
    socket.emit("presidential-power", {
      gameId: game.game_id,
      game_user_id: selectedGameUserId,
      value: 1,
      investigation,
    });
    setSelectedGameUserId(0);
    setInvestigation(false);
    setModalTitle("");
  };

  const handleChoosePlayer = (game_user_id) => {
    setChoosePlayerOpen(false);
    if (investigation) {
      setSelectedGameUserId(game_user_id);
      setInvestigationModalOpen(true);
      return;
    }
    setModalTitle("");
    setEligibleUsers([]);
    if (execution) {
      socket.emit("presidential-power", {
        gameId: game.game_id,
        game_user_id,
        value: 1,
        execution,
        role_id: gameUsers.filter(
          (selectedUser) => selectedUser.game_user_id === game_user_id
        )[0].role_id,
      });
      setExecution(false);
    } else {
      socket.emit("assign-chancellor", {
        gameId: game.game_id,
        game_user_id: game_user_id,
        value: 1,
      });
    }
  };

  const handleCastBallot = (ballot) => {
    setCastBallotOpen(false);
    socket.emit("cast-ballot", {
      gameId: game.game_id,
      game_user_id: gameUser.game_user_id,
      username: gameUser.username,
      ballot: ballot,
    });
    setModalMessage(
      "Other players are still casting their ballots, please wait for them to finish."
    );
    setDisplayErrorOpen(true);
  };

  const handleVeto = () => {
    setChoosePolicyOpen(false);
    socket.emit("request-veto", {
      gameId: game.game_id,
    });
  };

  const handleConfirmModal = () => {
    socket.emit("veto-response", {
      gameId: game.game_id,
      veto: true,
    });
    setConfirmModalOpen(false);
  };

  const handleChoosePolicy = (game_policy_id, isEnacted) => {
    setChoosePolicyOpen(false);
    setDeclinedVeto(false);
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
        message={modalMessage}
      />
      <ConfirmModal
        open={confirmModalOpen}
        onClose={handleConfirmModalClose}
        onSubmit={handleConfirmModal}
        title={modalTitle}
        message={modalMessage}
      />
      <ChoosePlayerModal
        open={choosePlayerOpen}
        onClose={handleChoosePlayerClose}
        onSubmit={handleChoosePlayer}
        eligibleUsers={eligibleUsers}
        currentUser={gameUser}
        playerCount={gameUsers.length}
        title={modalTitle}
      />
      <InvestigationModal
        open={investigationModalOpen}
        onClose={handleInvestigation}
        gameUsers={gameUsers}
        selectedGameUserId={selectedGameUserId}
        title={modalTitle}
      />
      <CastBallotModal
        open={castBallotOpen}
        onClose={handleCastBallotClose}
        onSubmit={handleCastBallot}
        gameUsers={gameUsers}
        currentUser={gameUser}
        playerCount={gameUsers.length}
        title="Cast your ballot"
      />
      <ChoosePolicyModal
        open={choosePolicyOpen}
        onClose={handleChoosePolicyClose}
        onSubmit={handleChoosePolicy}
        onVeto={handleVeto}
        gameUsers={gameUsers}
        gamePolicies={drawPolicies}
        enactedPolicies={enactedPolicies}
        policyPeek={policyPeek}
        declinedVeto={declinedVeto}
        title={modalTitle}
      />
      <TableTopComponent
        gameUsers={gameUsers}
        currentUser={gameUser}
        playerCount={gameUsers.length}
      />
    </>
  );
}

export default withRouter(SHComponent);
