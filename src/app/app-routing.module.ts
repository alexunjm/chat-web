import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [{
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then(m => m.LayoutModule),
      canActivate: [AuthGuard]
  }, {
    path: 'home',
    loadChildren: () =>
      import('./pages/no-auth/home/home.module').then(m => m.HomeModule)
  }, {
    path: 'error',
    loadChildren: () =>
      import('./pages/no-auth/error/error.module').then(m => m.ErrorModule)
  }, {
    path: 'access-denied',
    loadChildren: () =>
      import('./pages/no-auth/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
  }, {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/no-auth/not-found/not-found.module').then(m => m.NotFoundModule)
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
