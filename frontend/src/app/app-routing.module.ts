import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
    data: { title: 'Login', asideMenu: false }
  },
  { path: 'list', canActivate: [AuthGuard],
    loadChildren: () => import('./views/list/list.module').then(m => m.ListModule),
    data: { title: 'Listagem' }
  },
  { path: 'criar', canActivate: [AuthGuard],
    loadChildren: () => import('./views/entity/form/form.module').then(m => m.FormModule),
    data: { title: 'Criar Entidade' }
  },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
