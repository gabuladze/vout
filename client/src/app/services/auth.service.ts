import { Injectable, OnInit, AfterViewInit } from '@angular/core';

declare var gapi: any;

@Injectable()
export class AuthService implements OnInit, AfterViewInit {
  constructor() { }

  ngOnInit() {
    // AppGlobals.GOOGLE_CLIENT_ID = '164895958582-a8v2625nm9o8qiegc6vk3v22c837cb0l.apps.googleusercontent.com';
    // this.getData();
    // setTimeout(() => { this.googleAuthenticate() }, 50);
  }

  ngAfterViewInit() {
    //AppGlobals.GOOGLE_CLIENT_ID = '164895958582-a8v2625nm9o8qiegc6vk3v22c837cb0l.apps.googleusercontent.com';
    // this.getData();
    // setTimeout(() => { this.gauth() }, 50);
  }

  /**
   * Authenticate the user in google
   */
  gauth(callback) {
    let auth2: any;
    let error: any;

    gapi.load('auth2', function () {
      auth2 = gapi.auth2.init({
        client_id: '22850615934-r0lrae7sd5ik8i4vpf43gp9u6hkdm48l.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      //Login button reference
      let loginButton: any = document.getElementById('google-login-button');

      auth2.attachClickHandler(loginButton, {},
        function (userDetails) {
          //Getting profile object
          let profile = userDetails.getBasicProfile();

          let result = {
            token: userDetails.getAuthResponse().id_token,
            profile: {
              image: profile.getImageUrl(),
              name: profile.getName(),
              email: profile.getEmail()
            }
          };

          return callback(null, result);
        }, function (error) {
          return callback(JSON.stringify(error))
        });
    });
  }

  /**
   * Get user data from local storage
   */
  getProfile() {
    return {
      token: localStorage.getItem('token'),
      profile: JSON.parse(localStorage.getItem('profile'))
    };
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
  logout() {
    let homeUrl = "http://localhost:4200";
    let logoutUrl = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + homeUrl;
    this.clearLocalStorage();
    document.location.href = logoutUrl;
  }

  /**
   * Clear the local storage
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }
}
