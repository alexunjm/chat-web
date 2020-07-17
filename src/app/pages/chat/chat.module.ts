import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';

import { SharedPipesModule } from './../../shared/pipes/shared-pipes.module';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedPipesModule
  ]
})
export class ChatModule { }
