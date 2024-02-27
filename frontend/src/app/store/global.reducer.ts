import { Action, createReducer, on } from "@ngrx/store";
import { initialGlobalState, initialUserState } from "src/app/store/global.state";
import { loadUser, loadUserSuccess, loadUserFailure, updateUserToken, removeUser } from "./global.action";
import { GlobalState } from "../models/global";

const globalReducerData = createReducer(
  initialGlobalState,
  on(removeUser, state => ({
    ...state,
    user: initialUserState,
  })),
  on(loadUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadUserSuccess, (state, { user }) => {
  return {
    ...state,
    user,
    loading: false,
    error: null
  }}),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(updateUserToken, (state, { access_token }) => ({
    ...state,
    user: {
      ...state.user,
      access_token
    },
    loading: true,
    error: null
  })),
)

export function globalReducer(state: GlobalState | undefined, action: Action) {
  return globalReducerData(state, action);
}

