import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular2-google-login";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginService, AuthService]
})
export class NavbarComponent implements OnInit {

  constructor(private _login: LoginService) { }

  ngOnInit() {
  }

}
