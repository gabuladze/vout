import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _login: LoginService
  ) { }

  canActivate() {
    if (this._login.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
