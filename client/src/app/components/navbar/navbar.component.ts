import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginService]
})
export class NavbarComponent implements OnInit {

  user: any;

  constructor(
    public _login: LoginService,
    private _flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.user = this._login.getProfile();
  }

  onLoginClick() {
    this._login.gauth((err, user) => {
      if (err) {
        this._flashMessage.show('Failed to login!', { cssClass: 'alert-danger', timeout: 5000 });
      } else {
        this.user = user;
      }
    });
  }

  onLogoutClick() {
    this._login.logout((err) => {
      if (err) {
        this._flashMessage.show(err.message, { cssClass: 'alert-danger', timeout: 5000 });
      } else {
        this._flashMessage.show('Bye!', { cssClass: 'alert-info', timeout: 5000 });
      }
    });
  }
}
