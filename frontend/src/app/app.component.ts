import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventBusService } from './shared/event-bus/event-bus.service';
import { Subscription } from 'rxjs';
import { Shared } from './shared/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  eventBusSub?: Subscription;

  constructor(
    private router: Router,
    private eventBusService: EventBusService,
    private shared: Shared,
  ) { }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.shared.logout();
    });
  }

  hasAsideMenu() {
    const removeAsideFrom = [
      '/login',
      '/register'
    ]

    return !removeAsideFrom.includes(this.router.url);
  }
}
