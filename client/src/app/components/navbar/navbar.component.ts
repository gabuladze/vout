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
    private _login: LoginService,
    private _flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.user = this._login.getProfile();
  }

  onLoginClick() {
    this._login.gauth((user) => {
      this.user = user;
    });
  }

  onLogoutClick() {
    this._login.logout(() => {
      this._flashMessage.show('Bye!', { cssClass: 'alert-info', timeout: 5000 });
    });
  }
}
