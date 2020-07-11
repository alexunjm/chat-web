import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  @Input()
  hidden = true;

  @Input()
  data: {title: string};

  @Output()
  handleCloseEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  get title() {
    return this.data.title;
  }

  fireClose() {
    this.handleCloseEvent.emit({fromCloseButton: true});
  }

}
