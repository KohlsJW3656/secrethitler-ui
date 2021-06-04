export const Action = Object.freeze({
  FinishLoadingPolicies: "FinishLoadingPolicies",
  FinishEditingPolicy: "FinishEditingPolicy",
});

const host = "https://secrethitleronline-server.duckdns.org:8445";

function checkForErrors(response) {
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response;
}

/*********************************************/

export function getAllPolicies() {
  return (dispatch) => {
    fetch(`${host}/policies`)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(FinishLoadingPolicies(data.allPolicies));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function FinishLoadingPolicies(allPolicies) {
  return {
    type: Action.FinishLoadingPolicies,
    payload: allPolicies,
  };
}

/*********************************************/

export function startEditingPolicy(policy) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(policy),
  };

  return (dispatch) => {
    fetch(`${host}/policy/${policy.policy_id}`, options)
      .then(checkForErrors)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          dispatch(finishEditingPolicy(policy));
        }
      })
      .catch((e) => console.error(e));
  };
}

export function finishEditingPolicy(policy) {
  return {
    type: Action.FinishEditingPolicy,
    payload: policy,
  };
}
