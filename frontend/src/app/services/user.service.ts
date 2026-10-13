import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(public httpclient: HttpClient,private authService : AuthService) { }
  apiurl = 'http://localhost:8080/users';
  private getAuthHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    return new HttpHeaders({ "Authorization": jwt });
  }
  getByUsername(username: String): Observable<User> {
    const url = `${this.apiurl}/getbyUsername/${username}`;

    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.httpclient.get<User>(url,{headers:httpHeaders});
    }
    getTousUsers() : Observable<User[]>{
      return this.httpclient.get<User[]>(this.apiurl+"/all");
    }
  ajouteruser(employee: User) {
    return this.httpclient.post<any>(this.apiurl,employee);
  }

  connexion(user: any): Observable<any> {
    return this.httpclient.post<any>(`${this.apiurl}/connexion`, user);
  }

  getUserByMatricule(matricule: number) {
    return this.httpclient.get<User>(this.apiurl +"/" +"byMatricule"+"/"+matricule);
  }
  getUsersByName(name: String) {
    return this.httpclient.get<User>(this.apiurl +"/" +"byName"+"/"+name);
  }

  modifierUser(user: User) {
    return this.httpclient.put(this.apiurl, user);
  }
  updateUser(user :Partial<User>) : Observable<User>    {


    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.httpclient.put<User>(this.apiurl+"/updateUser", user, {headers:httpHeaders});
    }



    deleteUser(id : number) {
      const url = `${this.apiurl}/delete/${id}`;
       let jwt = this.authService.getToken();
       jwt = "Bearer "+jwt;
       let httpHeaders = new HttpHeaders({"Authorization":jwt})
         return this.httpclient.delete(url,  {headers:httpHeaders});
       }
    addUser( user: User):Observable<User>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.httpclient.post<User>(this.apiurl+"/register", user, {headers:httpHeaders});
      }

      getUserById(id: number): Observable<User> {
        const url = `${this.apiurl}/getbyid/${id}`;

        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.httpclient.get<User>(url,{headers:httpHeaders});
        }

        listeUsers(): Observable<User[]>{
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
         
           return this.httpclient.get<User[]>(this.apiurl+"/all",{headers:httpHeaders});
      
          }

          updatePassword(user :User) : Observable<User>    {
            return this.httpclient.put<User>(this.apiurl+"/updatePassword", user);
          }
          recuperer(username: String): Observable<User> {
            const url = `${this.apiurl}/recuperer/${username}`;
              return this.httpclient.get<User>(url);
            }



            addRolesToUser(username: string, roles: string[]): Observable<User> {
              const rolesString = roles.join(',');
              return this.httpclient.post<User>(`${this.apiurl}/${username}/roles/${rolesString}`, {});
            }
            removeRoleFromUser(username: string, roleName: string): Observable<User> {
              let httpHeaders = this.getAuthHeaders();
              return this.httpclient.delete<User>(`${this.apiurl}/${username}/rolesdelete/${roleName}`, { headers: httpHeaders });
            }
          
            removeAllRolesFromUser(username: string): Observable<User> {
              return this.httpclient.delete<User>(`${this.apiurl}/${username}/roles`);
            }
            updateRolesForUser(username: string, roles: string[]): Observable<User> {
              let jwt = this.authService.getToken();
              jwt = "Bearer " + jwt;
              let httpHeaders = new HttpHeaders({ "Authorization": jwt });
              return this.httpclient.post<User>(`${this.apiurl}/${username}/roles`, roles, { headers: httpHeaders });
            }
            addRoleToUser(username: string, roleName: string): Observable<User> {
              const url = `${this.apiurl}/${username}/roles/${roleName}`;
              return this.httpclient.post<User>(url, null); // Si votre endpoint n'attend pas de corps de requête, vous pouvez passer null
            }
  }



