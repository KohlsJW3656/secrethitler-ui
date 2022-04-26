import React from "react";
import "../styles/policy.css";

export function Policy(props) {
  const policy = props.policy;
  const gamePolicies = props.gamePolicies;
  let path =
    policy.fascist === 0
      ? "../images/liberalpolicy.png"
      : "../images/fascistpolicy.png";

  return (
    <>
      <div className="buttonContainer">
        <img
          className="policy"
          src={path}
          alt={policy.fascist === 0 ? "Liberal policy" : +"Fascist policy"}
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
