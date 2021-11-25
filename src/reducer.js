import { Action } from "./actions";

const initialState = {
  isWaiting: false,
  authenticated: false,
  jwt: "",
  user: {},
  email: "",
  admin: false,
  notification: {},
  users: [],
  allPolicies: [],
  drawPolicies: [],
  deckPolicies: [],
  discardedPolicies: [],
  enactedPolicies: [],
  notEnactedPolicies: [],
  topPolicy: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    /**** Policies  ****/
    case Action.FinishLoadingAllPolicies:
      return {
        ...state,
        allPolicies: action.payload,
      };
    case Action.FinishLoadingDrawPolicies:
      return {
        ...state,
        drawPolicies: action.payload,
      };
    case Action.FinishLoadingDeckPolicies:
      return {
        ...state,
        deckPolicies: action.payload,
      };
    case Action.FinishLoadingDiscardedPolicies:
      return {
        ...state,
        discardedPolicies: action.payload,
      };
    case Action.FinishLoadingEnactedPolicies:
      return {
        ...state,
        enactedPolicies: action.payload,
      };
    case Action.FinishLoadingNotEnactedPolicies:
      return {
        ...state,
        notEnactedPolicies: action.payload,
      };
    case Action.FinishLoadingTopPolicy:
      return {
        ...state,
        topPolicy: action.payload,
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
        drawPolicies: state.drawPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        deckPolicies: state.deckPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        discardedPolicies: state.discardedPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        enactedPolicies: state.enactedPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        notEnactedPolicies: state.notEnactedPolicies.map((policy) => {
          if (policy.policy_id === action.policy_id) {
            return action.payload;
          } else {
            return policy;
          }
        }),
        topPolicy:
          state.topPolicy.policy_id === action.policy_id
            ? action.payload
            : state.topPolicy,
      };
    /**** User Login  ****/
    case Action.FinishLoggingInUser:
      return {
        ...state,
        jwt: action.payload,
        authenticated: true,
      };
    case Action.FinishSettingUser:
      return {
        ...state,
        user: action.payload,
        admin: action.payload.account_type === 1,
        authenticated: true,
      };
    case Action.FinishEditingUser:
      return {
        ...state,
        user: action.payload,
      };
    /**** User Logout  ****/
    case Action.FinishLoggingOutUser:
      return {
        ...state,
        authenticated: false,
        jwt: "",
        user: {},
        admin: false,
        email: action.payload,
        users: [],
      };
    /**** User Signup  ****/
    case Action.FinishAddingUser:
      return {
        ...state,
        email: action.payload,
      };
    /**** Admin ****/
    case Action.FinishLoadingUsers:
      return {
        ...state,
        users: action.payload,
      };
    case Action.FinishEditingUserAdmin:
      return {
        ...state,
        users: state.users.map((user) =>
          user.user_id === action.payload.user_id ? action.payload : user
        ),
        user:
          state.user.user_id === action.payload.user_id
            ? action.payload
            : state.user,
        admin:
          state.user.user_id === action.payload.user_id
            ? action.payload.account_type === 1
            : state.admin,
      };
    /**** Notifications ****/
    case Action.AddNotification:
      return {
        ...state,
        notification: action.payload,
      };
    case Action.DismissNotification:
      return {
        ...state,
        notification: {},
      };
    default:
      return state;
  }
}

export default reducer;
