import { AuthState, ACTION_TYPE, AuthActionEnum } from "./types";

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

const authReducer = (state: AuthState, action: ACTION_TYPE): AuthState => {
  switch (action.type) {
    case AuthActionEnum.SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    case AuthActionEnum.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case AuthActionEnum.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
