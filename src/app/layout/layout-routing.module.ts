import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [{
    path: '', redirectTo: 'users', pathMatch: 'prefix'
  }, {
    path: 'users',
    loadChildren: () =>
      import('../pages/users/users.module').then(m => m.UsersModule)
  }, {
    path: 'chat',
    loadChildren: () =>
      import('../pages/chat/chat.module').then(m => m.ChatModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
