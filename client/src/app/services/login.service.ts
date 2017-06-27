import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "angular2-social-login";

@Injectable()
export class LoginService implements OnInit {
  user: any;
  auth2: any;

  constructor(private router: Router, private _auth: AuthService) {
    this.user = this.getProfile();
  }

  ngOnInit() { }

  /**
   * Authenticate the user in google
   */
  gauth(callback) {
    this._auth.login('google').subscribe((data) => {
      let profile = {
        email: data['email'],
        image: data['image'],
        name: data['name']
      };

      // Save profile and token to local storage
      localStorage.setItem('token', data['token']);
      localStorage.setItem('profile', JSON.stringify(profile));
      callback(profile);
    });
  }

  /**
   * Get user data from local storage
   */
  getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  /**
   * Save profile to local storage
   * @param token {string}
   * @param profile {object}
   */
  saveProfile(token: string, profile: object) {
    localStorage.setItem('token', token);
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  /**
   * Check if the token is in localstorage
   * If yes, the user is logged in
   */
  loggedIn() {
    return localStorage.getItem('token') != undefined;
  }

  /**
   * Log out the user
   */
  logout(callback) {
    let error: any;
    let instance = JSON.parse(localStorage.getItem('instance'));

    this._auth.logout().subscribe((data) => {
      if (data) {
        this.clearLocalStorage();
        callback();
      }
    });
  }

  /**
   * Clear the local storage
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    localStorage.removeItem('instance');
  }
}
