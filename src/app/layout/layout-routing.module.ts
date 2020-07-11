import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [{
    path: '',
    loadChildren: () =>
      import('../pages/users/users.module').then(m => m.UsersModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
