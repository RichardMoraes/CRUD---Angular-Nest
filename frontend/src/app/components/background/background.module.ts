import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundRoutingModule } from './background-routing.module';
import { BackgroundComponent } from './background.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LogOut, LucideAngularModule, Menu } from 'lucide-angular';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    BackgroundComponent
  ],
  imports: [
    CommonModule,
    BackgroundRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    LucideAngularModule.pick({ Menu, LogOut })
  ],
  exports: [BackgroundComponent]
})
export class BackgroundModule { }
