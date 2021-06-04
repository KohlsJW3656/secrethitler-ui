import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Policy } from "./Policy";
import { startEditingPolicy } from "./actions";

export function Officials() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allPolicies = useSelector((state) => state.allPolicies);
  const policyDeck = allPolicies.filter(
    (policy) => policy.isDiscarded === 0 && policy.isEnacted === 0
  );
  const [currentPolicies, setCurrentPoliciesPolicies] = useState(
    policyDeck.filter((currentPolicy) => currentPolicy.deckOrder < 3)
  );

  useEffect(() => {
    setCurrentPoliciesPolicies(
      policyDeck.filter((currentPolicy) => currentPolicy.deckOrder < 3)
    );
  }, [dispatch, allPolicies.length, currentPolicies.length]);

  const setDiscarded = (policy) => {
    setCurrentPoliciesPolicies((currentPolicies) =>
      currentPolicies.filter(
        (currentPolicy) => currentPolicy.policy_id !== policy.policy_id
      )
    );
    policy.isDiscarded = 1;
    dispatch(startEditingPolicy(policy));
    setTimeout(() => history.push(`/`), 500);
  };

  const setEnacted = (policy) => {
    let otherPolicy = currentPolicies.filter(
      (currentPolicy) => currentPolicy.policy_id !== policy.policy_id
    )[0];
    otherPolicy.isDiscarded = 1;
    dispatch(startEditingPolicy(otherPolicy));

    policy.isEnacted = 1;
    dispatch(startEditingPolicy(policy));

    resetDeckOrder(
      policyDeck.filter(
        (deckPolicy) =>
          deckPolicy.policy_id !== policy.policy_id &&
          deckPolicy.policy_id !== otherPolicy.policy_id
      )
    );
    setTimeout(() => history.push(`/`), 500);
  };

  const resetDeckOrder = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].deckOrder = i;
      dispatch(startEditingPolicy(array[i]));
    }
  };

  const veto = () => {
    for (let i = 0; i < currentPolicies.length; i++) {
      setDiscarded(currentPolicies[i]);
    }
    resetDeckOrder(
      policyDeck.filter(
        (deckPolicy) =>
          deckPolicy.policy_id !== currentPolicies[0].policy_id &&
          deckPolicy.policy_id !== currentPolicies[1].policy_id
      )
    );
  };

  return (
    <div>
      <h1 className="pageTitle">Policy Selection Page</h1>
      {currentPolicies.length === 3 ? (
        <div className="center">
          <h2>Welecome President!</h2>
          <p>
            Please select a policy to <b>discard.</b>
          </p>
        </div>
      ) : (
        <div className="center">
          <h2>Welecome Chancellor!</h2>
          <p>
            Please select a policy to <b>enact.</b>
          </p>
          <p>
            {allPolicies.filter(
              (policy) => policy.isEnacted === 1 && policy.type === "Fascist"
            ).length === 5 && (
              <button className="button" onClick={() => veto()}>
                Veto
              </button>
            )}
          </p>
        </div>
      )}

      <div className="container">
        {currentPolicies.map((policy) => (
          <Policy
            key={policy.policy_id}
            policy={policy}
            setDiscarded={setDiscarded}
            setEnacted={setEnacted}
            currentPolicies={currentPolicies}
          />
        ))}
      </div>
    </div>
  );
}
