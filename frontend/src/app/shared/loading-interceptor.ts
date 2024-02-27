import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap, take, finalize, concatMap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
import { removeUser, updateUserToken } from '../store/global.action';
import { GlobalState } from '../models/global';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private userState$ = this.store.pipe(select(state => state.global.user));

  constructor(
    private store: Store<{ global: GlobalState }>,
    private userService: UserService,
    private router : Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userState = this.userState$.pipe(take(1));

    return this.userState$.pipe(
      take(1),
      switchMap(userState => {
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if ((error.status === 401 || error.status === 403)) {
              return this.userService.refreshUserToken().pipe(
                switchMap((res) => {
                  this.store.dispatch(updateUserToken({ access_token: res.data?.access_token! }));

                  // Continua a requisição original com o novo token
                  const newRequest = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${res.data?.access_token}`
                    }
                  });

                  return next.handle(newRequest);
                }),
                catchError((error: HttpErrorResponse) => {
                  this.store.dispatch(removeUser());
                  this.router.navigate(['/login']);

                  return throwError(error);
                }),
              );
            }

            return throwError(error);
          })
        );
      })
    );
  }
}
