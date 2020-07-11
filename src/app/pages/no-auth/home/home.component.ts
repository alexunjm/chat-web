import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../shared/services/api/auth.service';


@Component({
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  signUp: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  goToIndex() {
    this.router.navigate(['/']);
  }

  signUpOption(user) {
    this.authService.singUp(user).then(response => {
      console.log("HomeComponent -> signUpOption -> user", {user, response});
      this.goToIndex();
    }).catch(console.error);
  }

  signInOption(user) {
    this.authService.singIn(user).then(response => {
      console.log("HomeComponent -> signInOption -> user", {user, response});
      this.goToIndex();
    }).catch(console.error);
  }

}
