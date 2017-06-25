import { Injectable, OnInit, NgZone } from '@angular/core';
import { AuthService, AppGlobals } from "angular2-google-login";

@Injectable()
export class LoginService implements OnInit {
  token: string;
  imageURL: string;
  name: string;
  email: string;

  constructor(private _gauth: AuthService, private zone: NgZone) { }

  ngOnInit() {
    AppGlobals.GOOGLE_CLIENT_ID = '';
    // this.getData();
    // setTimeout(() => { this.googleAuthenticate() }, 50);
  }

  /**
   * Authenticate the user in google
   */
  googleAuthenticate() {
    this._gauth.authenticateUser(res => {
      this.zone.run(() => {
        this.getData();
      });
    });
  }

  /**
   * Get user data from local storage
   */
  getData() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  /**
   * Check if the token is in localstorage
   * If yes, the user is logged in
   */
  loggedIn() {
    // return localStorage.getItem('token') != undefined;
    return false;
  }

  /**
   * Log out the user
   */
  logout() {
    this._gauth.userLogout(() => {
      this.clearLocalStorage();
    });
  }

  /**
   * Clear the local storage
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }
}
