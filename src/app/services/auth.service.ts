import { Injectable } from '@angular/core';
import { SignupRequest } from '../models/signup.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment.prod';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + "/auth/";

  constructor(private http: HttpClient) { }

  public register(baseUrlSaving: string, file: File): Observable<any> {
    console.log("Auth Service Register called");
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post(baseUrlSaving, formData);

  }

  public login(login: Login): Observable<any> {

    return this.http.post<Login>(this.baseUrl + "login", login);
  }

  public refreshToken(token: string) {
    return this.http.post(this.baseUrl + 'refreshtoken', {
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
