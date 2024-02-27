import { createSelector } from "@ngrx/store";
import { GlobalState } from "../models/global";
import { UserState } from "../models/user";

export const selectState = (state: GlobalState) => state;
export const selectUserState = (state: UserState) => state;

/**
 * User Selectors
 */
export const selectUser = createSelector(
  selectUserState,
  state => state
);

export const selectUserLoading = createSelector(
  selectUserState,
  state => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  state => state.error
);
/**************************** */
