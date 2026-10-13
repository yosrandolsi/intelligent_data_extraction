import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = 'http://localhost:8080';
  private path = "/user";

  constructor(private http: HttpClient) { }

  createUser(employee: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + this.path, employee);
  }

 
}
