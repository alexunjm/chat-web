import { ChatComponent } from './chat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: ChatComponent,
  children: [/* {
    path: '', redirectTo: 'users', pathMatch: 'prefix'
  }, */ {
    path: 'with/:id',
    component: ChatComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
