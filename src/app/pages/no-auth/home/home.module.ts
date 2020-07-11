import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent, SignUpComponent } from './components';


@NgModule({
  declarations: [HomeComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
