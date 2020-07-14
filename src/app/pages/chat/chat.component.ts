import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit, OnDestroy {

  id: number;
  private paramSubscriber: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramSubscriber = this.route.params.subscribe(params => {
      //  this.id = +params['id']; // (+) converts string 'id' to a number
       this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
  }

}
