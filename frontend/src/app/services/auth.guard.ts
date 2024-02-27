import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, first, firstValueFrom, map, of, switchMap, take } from 'rxjs';
import { UserService } from './user/user.service';
import { UserState } from '../models/user';
import { Store } from '@ngrx/store';
import { updateUserToken } from '../store/global.action';
import { GlobalState } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<{ global: GlobalState }>
  ){}

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
      return this.userService.isAuthenticated().then(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      });
    }
}
