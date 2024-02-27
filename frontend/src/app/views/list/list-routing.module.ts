import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard],
    component: ListComponent
  },
  { path: ':entity', canActivate: [AuthGuard],
    loadChildren: () => import('../../views/entity/entity.module').then(m => m.EntityModule),
    data: { title: 'Detalhes de Entidade' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
