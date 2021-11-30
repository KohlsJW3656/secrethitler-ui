import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Policy } from "../components/Policy";
import { startGettingAllPolicies, startEditingPolicy } from "../actions";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

function OfficialsComponent() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.jwt);
  const history = useHistory();
  const allPolicies = useSelector((state) => state.allPolicies);
  const drawPolicies = useSelector((state) => state.drawPolicies);
  const deckPolicies = useSelector((state) => state.deckPolicies);

  useEffect(() => {
    dispatch(startGettingAllPolicies(jwt));
  }, []);

  const setDiscarded = (policy) => {
    drawPolicies.filter(
      (currentPolicy) => currentPolicy.policy_id !== policy.policy_id
    );
    policy.isDiscarded = 1;
    dispatch(startEditingPolicy(policy, jwt));
    setTimeout(() => history.push(`/dashboard`), 500);
  };

  const setEnacted = (policy) => {
    let otherPolicy = drawPolicies.filter(
      (currentPolicy) => currentPolicy.policy_id !== policy.policy_id
    )[0];
    otherPolicy.isDiscarded = 1;
    dispatch(startEditingPolicy(otherPolicy, jwt));

    policy.isEnacted = 1;
    dispatch(startEditingPolicy(policy, jwt));

    resetDeckOrder(
      deckPolicies.filter(
        (deckPolicy) =>
          deckPolicy.policy_id !== policy.policy_id &&
          deckPolicy.policy_id !== otherPolicy.policy_id
      )
    );
    setTimeout(() => history.push(`/dashboard`), 500);
  };

  const resetDeckOrder = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i].deckOrder = i;
      dispatch(startEditingPolicy(array[i], jwt));
    }
  };

  const veto = () => {
    for (let i = 0; i < drawPolicies.length; i++) {
      setDiscarded(drawPolicies[i]);
    }
    resetDeckOrder(
      deckPolicies.filter(
        (deckPolicy) =>
          deckPolicy.policy_id !== drawPolicies[0].policy_id &&
          deckPolicy.policy_id !== drawPolicies[1].policy_id
      )
    );
  };

  return (
    <div>
      <h1 className="pageTitle">Policy Selection Page</h1>
      {drawPolicies.length === 3 ? (
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

      <Container>
        {drawPolicies.map((policy) => (
          <Policy
            key={policy.policy_id}
            policy={policy}
            setDiscarded={setDiscarded}
            setEnacted={setEnacted}
            drawPolicies={drawPolicies}
          />
        ))}
      </Container>
    </div>
  );
}
export default withRouter(OfficialsComponent);
