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
  }

  ngOnInit(): void {
    this.chatService.sendMessage('hola');
  }
}
