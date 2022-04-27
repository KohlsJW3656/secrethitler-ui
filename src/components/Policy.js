import React from "react";
import "../styles/policy.css";

export function Policy(props) {
  const policy = props.policy;
  const gamePolicies = props.gamePolicies;
  let path = policy.fascist
    ? "../images/fascistpolicy.png"
    : "../images/liberalpolicy.png";

  return (
    <>
      <div className="buttonContainer">
        <img
          className="policy"
          src={path}
          alt={policy.fascist ? "Fascist policy" : +"Liberal policy"}
        />
        {gamePolicies.length === 2 ? (
          <button
            className="actionButton button"
            onClick={() => props.setEnacted(policy)}
          >
            Enact
          </button>
        ) : (
          <button
            className="button actionButton"
            onClick={() => props.setDiscarded(policy)}
          >
            Discard
          </button>
        )}
      </div>
    </>
  );
}
