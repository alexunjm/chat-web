import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {

  valid: {fullName: boolean, nickname: boolean, pass: boolean, all: boolean} = {fullName: true, nickname: true, pass: true, all: true};
  user: {fullName?: string, nickname?: string, pass?: string} = {fullName: '', nickname: '', pass: ''};

  @Output()
  hideSignUp: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  handleSignUp: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  hideSignUpClick() {
    this.hideSignUp.emit('clicked!');
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
    this.user.fullName.trim();
    if (!(
      this.user.fullName
      && this.user.fullName.length > 0
      )) {
      this.valid.fullName = false;
      this.valid.all = false;
    }
    if (!(this.user.pass && this.user.pass.length > 0)) {
      this.valid.pass = false;
      this.valid.all = false;
    }

    if (this.valid.all) {
      this.handleSignUp.emit(this.user);

      console.log('puede iniciar');
    } else {
      console.log('------NO puede iniciar', this.valid);
    }
  }

}
