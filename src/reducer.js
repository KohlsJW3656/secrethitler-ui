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
};

function reducer(state = initialState, action) {
  switch (action.type) {
    /**** Policies  ****/
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
        phones: [],
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
