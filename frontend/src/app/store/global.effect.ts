import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ListService } from "../views/list/services/list.service";
import { Injectable } from "@angular/core";
import { switchMap, map, catchError, of } from "rxjs";
import { loadEntities, loadEntitiesSuccess, loadEntitiesFailure, loadUserSuccess, loadUser, loadUserFailure } from "./global.action";
import { User, UserResponse } from "../models/user";
import { UserService } from "../services/user/user.service";

@Injectable()
export class GlobalEffects {
  /**
   * User Effects
   */
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(({ email, password }) =>
        this.userService.loadUser(email, password).pipe(
          map((user: UserResponse) => loadUserSuccess({ user: user.data! })),
          catchError(error => of(loadUserFailure({error})))
        )
      )
    )
  );
  /**************************** */

/**
 * Entities Effects
 */
  loadEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEntities),
      switchMap(({ search }) =>
        this.listService.getList({search}!).pipe(
          map((entities) => loadEntitiesSuccess({entities})),
          catchError(error => of(loadEntitiesFailure({error})))
        )
      )
    )
  );
/**************************** */

  constructor(
    private actions$: Actions,
    private listService: ListService,
    private userService: UserService
  ) { }
}
