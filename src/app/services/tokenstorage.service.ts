import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

   private baseUrl=environment.apiUrl+"/test/";  

  constructor(private http: HttpClient) {
    console.log("TokenStorageService Loading");
   }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
   }
  public saveUser(user:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
 public saveRefreshToken(refreshToken: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, refreshToken);
  }

   public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }


  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

   public getHeader(): Observable<any> {
    return this.http.get<void>(this.baseUrl+"listHeaders");
     
  }
}
