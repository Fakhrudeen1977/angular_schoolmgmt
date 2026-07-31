import { Injectable } from '@angular/core';
import { SignupRequest } from '../models/signup.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + "/auth/";

  constructor(private http: HttpClient ,private router: Router) { }

  public saveUserWithRoles(formData:any): Observable<any> {  
    return this.http.post(this.apiUrl+ "saveUserWithRoles", formData);
  }

 
 public logout(): void {
  
    this.router.navigate(['/login']);
  }

   public changePassword(request: any): Observable<any> {
    return this.http.put('/api/auth/change-password', request);
  }


  public login(login: Login): Observable<any> {

    return this.http.post<Login>(this.apiUrl + "login", login);
  }

  public refreshToken(token: string) {
    return this.http.post(this.apiUrl + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }



  private rolesSubject =
  new BehaviorSubject<string[]>([]);

  roles$ = this.rolesSubject.asObservable();

  setRoles(roles: string[]): void {
    this.rolesSubject.next(roles);
  }

  getRoles(): string[] {
    return this.rolesSubject.value;
  }

  hasRole(role: string): boolean {
    return this.rolesSubject.value.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role =>
      this.rolesSubject.value.includes(role)
    );
  }



}
