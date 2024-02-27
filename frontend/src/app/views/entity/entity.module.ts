import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { EntityComponent } from './entity.component';
import { FormModule } from './form/form.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';

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
    FormsModule,
    MatSelectModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ DatePipe ]
})
export class EntityModule { }
