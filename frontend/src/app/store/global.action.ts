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

/**
 * Entities Actions
 */
  export const loadEntities = createAction(
    'Load Entities',
    props<{
      search?: string,
      pageIndex?: number | string,
      pageSize?: number | string,
    }>()
  );

  export const loadEntitiesSuccess = createAction(
    'Load Entities Success',
    props<{
      entities: Entity[]
    }>()
  );

  export const loadEntitiesFailure = createAction(
    'Load Entities Failure',
    props<{
      error: any
    }>()
  );
/**************************** */
