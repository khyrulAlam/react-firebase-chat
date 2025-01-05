/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { ACTION_TYPE, AuthActionEnum } from "./types";
import authReducer, { initialState } from "./authReducer";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/config";

// Create context
const AuthContextDispatch = createContext<Dispatch<ACTION_TYPE>>(() => {});
const AuthContext = createContext(initialState);

// AuthProvider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: AuthActionEnum.SET_LOADING, payload: true });

    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch({
          type: AuthActionEnum.SET_USER,
          payload: {
            email: currentUser.email || "",
            fullName: currentUser.displayName || "",
            profile_picture: currentUser.photoURL || "",
            uid: currentUser.uid,
            userName: currentUser.displayName || "",
          },
        });
      }
      dispatch({ type: AuthActionEnum.SET_LOADING, payload: false });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={state}>
      <AuthContextDispatch.Provider value={dispatch}>
        {children}
      </AuthContextDispatch.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthContextDispatch);

export default AuthProvider;
