import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class RecupererService {

  private apiUrl = 'http://localhost:8080/user';


  constructor(private httpclient: HttpClient) { }


  getUser(iduser: number) {
    return this.httpclient.get(this.apiUrl + iduser);
  }
  getMailMatricule(email: string, matricule: string) {
    return this.httpclient.get(this.apiUrl +"/" + "recuperer"+"/" + email +"/"+ matricule );
  }
}
