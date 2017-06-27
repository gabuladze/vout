import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  // selector: 'app-login',
  selector: 'ul[app-login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(private _auth: AuthService, private _flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.user = this._auth.getProfile();
  }

  onLoginClick() {
    this._auth.gauth((err, result) => {
      if (err) {
        this._flashMessage.show(err, { cssClass: 'alert-success', timeout: 5000 });
      } else {
        this._auth.saveProfile(result.token, result.profile);
      }
    });
  }

  onLogoutClick() {
    this._auth.logout();
  }
}
