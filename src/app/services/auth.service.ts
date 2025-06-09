import { Injectable } from '@angular/core';
import { SignupRequest } from '../models/signup.model';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment.prod';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

   //private  baseUrl = "http://localhost:8000/api/auth/";  

   private baseUrl=environment.baseURL+"/auth/";
   
  
  constructor(private http: HttpClient) { }  
  
  public register(signup:SignupRequest): Observable<any> {
    console.log("Before submit Singnup");
    console.log(signup);
    return this.http.post<SignupRequest>(this.baseUrl+"signup", signup);
     
  }
  
   public login(login:Login): Observable<any> {
      return this.http.post<Login>(this.baseUrl+"login", login);
  }

   public refreshToken(token: string) {
    return this.http.post(this.baseUrl +'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }


  

}
