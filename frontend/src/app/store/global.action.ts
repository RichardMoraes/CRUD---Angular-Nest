import { createAction, props } from "@ngrx/store";
import { Entity } from "../views/entity/models/entity";
import { User } from "../models/user";

/**
 * User Actions
 */
  export const removeUser = createAction(
    'Remove User'
  );

  export const loadUser = createAction(
    'Load User',
    props<{
      email: string,
      password: string
    }>()
  );

  export const loadUserSuccess = createAction(
    'Load User Success',
    props<{
      user: User
    }>()
  );

  export const loadUserFailure = createAction(
    'Load Login Failure',
    props<{
      error: any
    }>()
  );

  export const updateUserToken = createAction(
    'Update User Token',
    props<{
      access_token: string
    }>()
  );
/**************************** */
