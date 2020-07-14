import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatDataService } from './../../shared/services/api/chat-data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, OnDestroy {

  dataSource: Array<any>;

  nickname: number;
  private paramSubscriber: any;

  constructor(private route: ActivatedRoute, private chatService: ChatDataService) {}

  ngOnInit() {
    this.paramSubscriber = this.route.params.subscribe(params => {
      this.nickname = params['nickname'];

      if (!this.nickname) {
        this.chatService.list().then((data) => {
          // const {chats, chatsCount} = data;
          this.data = data['chats'];
          // console.log("ChatComponent -> ngOnInit -> this.data", this.data);
        });
       }
    });
  }

  set data(arr: Array<any>) {
    this.dataSource = arr;
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
  }

}
