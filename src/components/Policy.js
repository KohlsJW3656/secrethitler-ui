import React from "react";
import "../styles/policy.css";

function Policy(props) {
  const policy = props.policy;
  const gamePolicies = props.gamePolicies;
  const showButtons = props.showButtons;
  let path =
    policy.fascist === 1
      ? "../images/fascistpolicy.png"
      : "../images/liberalpolicy.png";

  return (
    <>
      <div className="buttonContainer">
        <img
          className="policy"
          src={path}
          alt={policy.fascist === 1 ? "Fascist policy" : "Liberal policy"}
        />
        {showButtons &&
          (gamePolicies.length === 2 ? (
            <button
              className="actionButton button"
              onClick={() => props.select(policy.game_policy_id, true)}
            >
              Enact
            </button>
          ) : (
            <button
              className="button actionButton"
              onClick={() => props.select(policy.game_policy_id, false)}
            >
              Discard
            </button>
          ))}
      </div>
    </>
  );
}
export default Policy;
