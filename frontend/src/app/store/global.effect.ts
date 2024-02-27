import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { switchMap, map, catchError, of } from "rxjs";
import { loadUserSuccess, loadUser, loadUserFailure } from "./global.action";
import { UserResponse } from "../models/user";
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

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
