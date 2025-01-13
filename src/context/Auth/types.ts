export type User = {
    email: string;
    fullName: string;
    profile_picture: string;
    userName: string;
    uid: string;
    createdAt: number;
}

export type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
}


export enum AuthActionEnum {
    SET_LOADING = "SET_LOADING",
    LOGOUT = "LOGOUT",
    SET_USER = "SET_USER"
}

type SET_USER = {
    type: AuthActionEnum.SET_USER;
    payload: User;
}

type LOGOUT_USER = {
    type: AuthActionEnum.LOGOUT;
    payload?: null;
}

type SET_LOADING = {
    type: AuthActionEnum.SET_LOADING;
    payload: boolean;
}

export type ACTION_TYPE = SET_USER | LOGOUT_USER | SET_LOADING;

