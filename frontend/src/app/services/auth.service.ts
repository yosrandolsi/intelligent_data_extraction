import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8080/users';
  token!:string;
  private helper = new JwtHelperService();
  public loggedUser!:string;
  public roles!:string[];
  public regitredUser : User = new User();

  constructor(private router : Router, private http : HttpClient) { }

  setRegistredUser(user : User){
    this.regitredUser=user;
  }

  login(user: User) {
    return this.http.post<User>(`${this.apiURL}/login`, user, { observe: 'response' }).pipe(
      tap(response => {
        if (response.status === 200) {
          let jwt = response.headers.get('Authorization') || '';
          this.saveToken(jwt);
          // Autres actions après la connexion réussie
        }
      }),
      catchError(error => {
        if (error.status === 400) {
          console.error('Mot de passe incorrect.');
        } else {
          console.error('Erreur lors de la connexion:', error);
        }
        return throwError(error);
      })
    );
  }

  saveToken(jwt: string){
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.decodeJWT();
  }

  getToken():string {
    return this.token;
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  isAdmin(): boolean {
    if (!this.roles)
      return false;
    return (this.roles.indexOf('ADMIN') > -1);
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.token);
  }

  registerUser(user: User) {
    return this.http.post<User>(`${this.apiURL}/register`, user, { observe: 'response' });
  }

  validateEmail(code: string) {
    return this.http.get<User>(`${this.apiURL}/verifyEmail/${code}`);
  }

}
