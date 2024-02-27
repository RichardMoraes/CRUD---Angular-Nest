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
      try {
        const userState = await firstValueFrom(this.store.select(state => state.global.user).pipe(first()));
        const { access_token } = userState;

        if (access_token) {
          const userCheck = await firstValueFrom(this.userService.checkUser());

          if(userCheck?.status == 'success') return true;

          throw new Error('invalid access token');
        } else {
          throw new Error('invalid access token');
        }
      } catch (error) {
        return await this.refreshToken().catch(error => {
          return this.router.createUrlTree(['/login']);
        });
      }
    }


    async refreshToken() {
      const access_token = (await firstValueFrom(this.userService.refreshUserToken())).data?.access_token!;

      if(!access_token) throw new Error('Invalid access token');

      this.store.dispatch(updateUserToken({ access_token }));
      return true;
    }
}
