import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "angular2-social-login";
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService implements OnInit {
  user: any;
  auth2: any;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private http: Http
  ) {
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

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:3500/api/auth/login', data, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          if (data.success) {
            // Save profile and token to local storage
            localStorage.setItem('token', data['token']);
            localStorage.setItem('profile', JSON.stringify(profile));
            return callback(null, profile);
          } else {
            return callback(data.message);
          }
        });
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let email = this.getProfile().email;
        this.http.post('http://localhost:3500/api/auth/logout', email, {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            if (data.success) {
              this.clearLocalStorage();
              callback(null);
            } else {
              callback(data.message);
            }
          })
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
