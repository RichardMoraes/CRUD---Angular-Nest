import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { EntityComponent } from './entity.component';
import { FormModule } from './form/form.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntityComponent
  ],
  imports: [
    CommonModule,
    EntityRoutingModule,
    FormModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EntityModule { }
