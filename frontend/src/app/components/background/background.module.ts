import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackgroundRoutingModule } from './background-routing.module';
import { BackgroundComponent } from './background.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BackgroundComponent
  ],
  imports: [
    CommonModule,
    BackgroundRoutingModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [BackgroundComponent]
})
export class BackgroundModule { }
