import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <app-top-bar class="absolute top-0 left-0 w-full">
  </app-top-bar>
  <div class="pt-10">
  <!--
    <app-side-bar class="w-25">
    </app-side-bar>
    -->
    <div class="container bg-gray-100">
      <router-outlet></router-outlet>
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
