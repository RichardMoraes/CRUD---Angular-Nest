import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, firstValueFrom, switchMap } from 'rxjs';
import { User, UserResponse, UserState } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loadUserSuccess, removeUser } from 'src/app/store/global.action';
import { initialUserState } from 'src/app/store/global.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = `${environment.apiUrl}/auth`;
  private userState$ = this.store.select(state => state.user)

  constructor(
    private http: HttpClient,
    private store: Store<{ user: UserState }>,
    private router: Router
  ) { }

  loadUser(email: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.api}/login`, {email, password}, { withCredentials: true });
  }

  checkUser(): Observable<UserResponse> {
    return this.userState$.pipe(
      switchMap(token => {
        return this.http.get<UserResponse>(`${this.api}/check`, {
          headers: { 'Authorization': `Bearer ${token.access_token}`},
          withCredentials: true
        });
      })
    )
  }

  refreshUserToken(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.api}/refresh`, { withCredentials: true });
  }

  async logout(): Promise<void> {
    const user = await firstValueFrom(this.userState$);

    await firstValueFrom(this.http.get<UserResponse>(`${this.api}/logout`, {
      headers: { 'Authorization': `Bearer ${user.access_token}`},
      withCredentials: true
    }));

    this.store.dispatch(removeUser());
    this.router.navigate(['/login']);
  }
}
