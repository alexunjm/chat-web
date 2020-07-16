import { ChatService } from './shared/services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

  constructor(private chatService: ChatService) {
    this.chatService.newConversationWith({id: 1234, nickname: 'Alex'});
    this.chatService.onNewConversation(console.log);
  }
}
