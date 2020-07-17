import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <div class="container mx-auto bg-white min-h-screen">
    <!-- top bar -->
    <!--
    <app-top-bar class="h-8 w-full">
    </app-top-bar> -->
    <!-- main -->
    <div class="relative min-h-screen sm:block">
      <app-side-bar class="w-48 h-full bg-gray-200 text-blue-600 absolute t-0 transform -translate-x-full sm:translate-x-0">
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
