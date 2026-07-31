import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse,HttpParams } from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment.prod';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

   private baseUrl=environment.apiUrl+"/role/";   

  constructor(private http: HttpClient) { }

 public saveRole(role:Role): Observable<any> {
    return this.http.post<Role>(this.baseUrl+"saveRole", role);
     
  }

   public getRoleList(): Observable<any> {   
     return this.http.get(`${this.baseUrl}` + 'getRoleList');
    
  }

   public deleteByRoleId(roleId: number): Observable<any> {    
     return this.http.delete(`${this.baseUrl}deleteByRoleId/${roleId}`, { responseType: 'text' });    
  }




}
