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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]+$')
      ])
    });

    this.hidePassword = true;
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select(state => state.global)
    .subscribe(async (global: GlobalState) => {
      if(global.user.access_token.length > 0)
        await this.shared.loading({
          type: 'default',
          message: 'Sucesso! Redirecionando...',
          duration: 2000
        }).then(() => {
          this.router.navigate(['/list']);
        });

      if(global.error)
        await this.shared.loading({
          type: 'error',
          message: global.error.error.message ?? 'Erro no login, verifique suas credênciais.',
          duration: 1000
        })
        .then(() => {
          this.shared.disableForm(this.loginForm, false);
        });
    })
  }

  async onSubmit() {
    const { email, password } = this.loginForm.value

    this.shared.disableForm(this.loginForm, true);
    this.shared.loading({
      type: 'loading',
      message: 'Fazendo login...',
      duration: 3000
    }).then(() => {
      this.store.dispatch(loadUser({ email, password }));
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
