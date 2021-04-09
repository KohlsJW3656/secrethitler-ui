import { Action } from "./actions";

const initialState = {
  isWaiting: false,
  allPolicies: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Action.FinishLoadingPolicies:
      return {
        ...state,
        allPolicies: action.payload,
      };
    case Action.FinishEditingPolicy:
      return {
        ...state,
        allPolicies: state.allPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
      };
    default:
      return state;
  }
}

export default reducer;
