import { Injectable, OnInit, NgZone, AfterViewInit } from '@angular/core';

declare var gapi: any;

@Injectable()
export class AuthService implements OnInit, AfterViewInit {
  token: string;
  imageURL: string;
  name: string;
  email: string;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    // AppGlobals.GOOGLE_CLIENT_ID = '164895958582-a8v2625nm9o8qiegc6vk3v22c837cb0l.apps.googleusercontent.com';
    // this.getData();
    // setTimeout(() => { this.googleAuthenticate() }, 50);
  }

  ngAfterViewInit() {
    //AppGlobals.GOOGLE_CLIENT_ID = '164895958582-a8v2625nm9o8qiegc6vk3v22c837cb0l.apps.googleusercontent.com';
    this.getData();
    setTimeout(() => { this.googleAuthenticate() }, 2000);
  }

  /**
   * Authenticate the user in google
   */
  googleAuthenticate() {
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

          // Save data to localstorage.
          localStorage.setItem('token', userDetails.getAuthResponse().id_token);
          localStorage.setItem('image', profile.getImageUrl());
          localStorage.setItem('name', profile.getName());
          localStorage.setItem('email', profile.getEmail());
        }, function (error) {
          this.error = (JSON.stringify(error, undefined, 2));
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
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }
}
