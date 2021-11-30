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
  playerCount: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    /**** Policies  ****/
    case Action.FinishLoadingAllPolicies:
      return {
        ...state,
        allPolicies: action.payload,
        drawPolicies: action.payload.filter(
          (policy) =>
            policy.deckOrder < 3 &&
            policy.isDiscarded === 0 &&
            policy.isEnacted === 0
        ),
        deckPolicies: action.payload.filter(
          (policy) => policy.isDiscarded === 0 && policy.isEnacted === 0
        ),
        discardedPolicies: action.payload.filter(
          (policy) => policy.isDiscarded === 1 && policy.isEnacted === 0
        ),
        enactedPolicies: action.payload.filter(
          (policy) => policy.isEnacted === 1
        ),
        notEnactedPolicies: action.payload.filter(
          (policy) => policy.isEnacted === 0
        ),
        topPolicy: action.payload.filter(
          (policy) =>
            policy.deckOrder === 0 &&
            policy.isDiscarded === 0 &&
            policy.isEnacted === 0
        )[0],
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
        allPolicies: state.allPolicies.map((policy) =>
          policy.policy_id === action.payload.policy_id
            ? action.payload
            : policy
        ),
        drawPolicies: state.drawPolicies.map((policy) =>
          policy.policy_id === action.payload.policy_id
            ? action.payload
            : policy
        ),
        deckPolicies: state.deckPolicies.map((policy) =>
          policy.policy_id === action.payload.policy_id
            ? action.payload
            : policy
        ),
        discardedPolicies: state.discardedPolicies.map((policy) =>
          policy.policy_id === action.payload.policy_id
            ? action.payload
            : policy
        ),
        enactedPolicies: state.enactedPolicies.map((policy) =>
          policy.policy_id === action.payload.policy_id
            ? action.payload
            : policy
        ),
        notEnactedPolicies: state.notEnactedPolicies.map((policy) =>
          policy.policy_id === action.payload.policy_id
            ? action.payload
            : policy
        ),
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
    /**** Sockets ****/
    case Action.SetPlayerCount:
      return {
        ...state,
        playerCount: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
