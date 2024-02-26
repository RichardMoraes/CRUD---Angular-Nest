import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private router: Router
  ) {
    console.log(this.router)
  }

  hasAsideMenu() {
    const removeAsideFrom = [
      '/login',
      '/register'
    ]

    return !removeAsideFrom.includes(this.router.url);
  }
}
