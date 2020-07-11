import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [ModalComponent, AlertComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalComponent, AlertComponent],
})
export class ComponentsModule { }
