import { ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Shared } from 'src/app/shared/shared';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadUser } from 'src/app/store/global.action';
import { Router } from '@angular/router';
import { GlobalState } from 'src/app/models/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit,OnDestroy {
  private userSubscription: Subscription | undefined;
  /**
   * Login Form Control
   */
  loginForm!: FormGroup;
  hidePassword!: boolean;

  constructor(
    public shared: Shared,
    private store: Store<{ global: GlobalState }>,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')])
    });

    this.hidePassword = true;
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select(state => state.global).subscribe((global: GlobalState) => {
      if(global.user.access_token.length > 0) this.router.navigate(['/list']);

      if(global.loading) this.shared.loading(true, 'Fazendo login...');

      if(global.error) this.shared.loading(false, global.error.error.mesage, 5000)
    })
  }

  onSubmit() {
    const { email, password } = this.loginForm.value

    this.store.dispatch(loadUser({ email, password }));
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
