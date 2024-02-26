import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Shared } from './shared';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private shared: Shared) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.body && request.body.showLoading === false) {
      return next.handle(request);
    }

    this.shared.loading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.shared.loading(false);
      })
    );
  }
}
