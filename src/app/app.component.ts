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
    // this.chatService.joinToChatRooms([{id: 'a'}, {id: 'b'}], 'abc');
    // this.chatService.onSomeUserConnected(console.log);
  }
}
