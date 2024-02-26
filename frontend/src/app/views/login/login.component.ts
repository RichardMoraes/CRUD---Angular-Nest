import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Shared } from 'src/app/shared/shared';
import { User, UserState } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUser } from 'src/app/store/global.action';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  user$!: Observable<User>
  /**
   * Login Form Control
   */
  loginForm!: FormGroup;
  hidePassword!: boolean;

  constructor(
    public shared: Shared,
    private store: Store<{ user: UserState }>,
    private router: Router,
    private userService: UserService,
  ) {
    this.user$ = this.store.select(state => state.user);

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])
    });

    this.hidePassword = true;
  }

  ngOnInit(): void {
    this.store.select(state => state.user.access_token).subscribe((token: string) => {
      if(token.length > 0) this.router.navigate(['/list']);
    })
  }

  onSubmit(e: any) {
    const { email, password } = this.loginForm.value

    this.store.dispatch(loadUser({ email, password }));
  }
}
