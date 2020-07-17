import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';



@NgModule({
  declarations: [ModalComponent, TopBarComponent, SideBarComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalComponent, TopBarComponent, SideBarComponent],
})
export class ComponentsModule { }
