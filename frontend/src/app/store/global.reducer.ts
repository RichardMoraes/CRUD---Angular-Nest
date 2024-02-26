import { Action, createReducer, on } from "@ngrx/store";
import { initialGlobalState, initialUserState } from "src/app/store/global.state";
import { loadEntities, loadEntitiesSuccess, loadEntitiesFailure, loadUser, loadUserSuccess, loadUserFailure, updateUserToken, removeUser } from "./global.action";
import { GlobalState } from "../models/global";
import { UserState } from "../models/user";

const userReducerData = createReducer(
  initialUserState,
  on(removeUser, state => ({
    ...initialUserState
  })),
  on(loadUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadUserSuccess, (state, { user }) => {
  return {
    ...state,
    ...user,
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
    access_token,
    loading: true,
    error: null
  }))
)

const globalReducerData = createReducer(
  initialGlobalState,
  on(loadEntities, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadEntitiesSuccess, (state, { entities }) =>({
    ...state,
    entities,
    loading: false,
    error: null
  })),
  on(loadEntitiesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
)

export function userReducer(state: UserState | undefined, action: Action) {
  return userReducerData(state, action);
}

export function globalReducer(state: GlobalState | undefined, action: Action) {
  return globalReducerData(state, action);
}
