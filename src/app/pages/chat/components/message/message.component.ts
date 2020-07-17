import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styles: []
})
export class MessageComponent implements OnInit {

  @Input()
  text = '';

  @Input()
  notMine = true;

  constructor() { }

  ngOnInit(): void {
  }

}
