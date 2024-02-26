import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':entity',
    loadChildren: () => import('../../views/entity/entity.module').then(m => m.EntityModule),
    data: { title: 'Detalhes de Entidade' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
