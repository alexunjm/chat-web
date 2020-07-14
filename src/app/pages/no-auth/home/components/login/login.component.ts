import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  valid: {nickname: boolean, pass: boolean, all: boolean} = {nickname: true, pass: true, all: true};
  user: {nickname?: string, pass?: string} = {nickname: '', pass: ''};

  @Output()
  hideLogin: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  handleSignIn: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  hideLoginClick() {
    this.hideLogin.emit('clicked!');
  }

  ngOnInit(): void {
  }

  signIn() {
    for (const key in this.valid) {
      if (this.valid.hasOwnProperty(key)) {
        this.valid[key] = true;
      }
    }

    const validNicknameRegex = RegExp(/^[a-zA-Z0-9]+$/i);
    if (!validNicknameRegex.test(this.user.nickname)) {
      this.valid.nickname = false;
      this.valid.all = false;
    }
    if (!(this.user.pass && this.user.pass.length > 0)) {
      this.valid.pass = false;
      this.valid.all = false;
    }

    if (this.valid.all) {
      this.handleSignIn.emit(this.user);

      console.log('puede iniciar');
    } else {
      console.log('------NO puede iniciar');
    }
  }
}
