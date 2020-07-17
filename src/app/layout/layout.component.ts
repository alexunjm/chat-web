import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <div class="container mx-auto bg-white">
    <!-- top bar -->
    <!--
    <app-top-bar class="h-8 w-full">
    </app-top-bar> -->
    <!-- main -->
    <div class="relative h-full sm:block">
      <app-side-bar class="w-48 h-full absolute t-0 transform -translate-x-full sm:translate-x-0">
      </app-side-bar>
      <div class="chat-main h-full flex flex-col sm:flex-grow sm:pl-48 sm:border-box">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
