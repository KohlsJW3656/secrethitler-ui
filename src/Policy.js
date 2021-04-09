import React from "react";

export function Policy(props) {
  const policy = props.policy;
  const currentPolicies = props.currentPolicies;
  let path =
    policy.type === "Liberal"
      ? "images/liberalpolicy.png"
      : "images/fascistpolicy.png";

  return (
    <>
      <div className="buttonContainer">
        <img className="policy" src={path} alt={policy.type + " policy"} />
        {/* <h1>{policy.deckOrder}</h1> */}
        {currentPolicies.length === 2 ? (
          <button
            className="actionButton"
            onClick={() => props.setEnacted(policy)}
          >
            Enact
          </button>
        ) : (
          <button
            className="actionButton"
            onClick={() => props.setDiscarded(policy)}
          >
            Discard
          </button>
        )}
      </div>
    </>
  );
}
