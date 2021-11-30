import React from "react";
import "../styles/policy.css";

export function Policy(props) {
  const policy = props.policy;
  const drawPolicies = props.drawPolicies;
  let path =
    policy.type === "Liberal"
      ? "../images/liberalpolicy.png"
      : "../images/fascistpolicy.png";

  return (
    <>
      <div className="buttonContainer">
        <img className="policy" src={path} alt={policy.type + " policy"} />
        {drawPolicies.length === 2 ? (
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
