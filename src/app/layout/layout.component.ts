import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <div class="container rounded bg-gray-100 sm:my-2 mx-auto xl:p-10 md:p-5 sm:p-2">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: []
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
