import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}


  public isAuthenticated(): boolean {
    // once the user logined, we have store our access token on localstorage for
    // future operations.
    // Here we are validating jwt token(response access) with help of jwtHelper
    // Don't foreget to enable the JwtHelperService in the app.module.ts
    // Here I'm using angualr-jwt for the handle and verify the jwt token

    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
}