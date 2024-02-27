import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
import { EventBusService } from './event-bus/event-bus.service';
import { EventData } from './event-bus/event.class';
import { GlobalState } from '../models/global';
import { Store } from '@ngrx/store';
import { updateUserToken } from '../store/global.action';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private store: Store<{ global: GlobalState }>,
    private userService: UserService,
    private eventBusService: EventBusService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    console.log('intercepted');

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.userService.refreshUserToken().pipe(
        switchMap((res) => {
          this.isRefreshing = false;
          this.store.dispatch(updateUserToken({ access_token: res.data?.access_token! }));

          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${res.data?.access_token}`
            }
          });

          return next.handle(request);
        }),
        catchError((error) => {
          this.isRefreshing = false;
          if (error.status === 401) {
            this.eventBusService.emit(new EventData('logout', null));
          }
          return throwError(() => error);
        }),
        finalize(() => {
          this.refreshTokenSubject.next(true);
        })
      );
    } else {
      // Aguarda até que o token seja atualizado antes de continuar com a requisição
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => {
          return next.handle(request);
        })
      );
    }
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
