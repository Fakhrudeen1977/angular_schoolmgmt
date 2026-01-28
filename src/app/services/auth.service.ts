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


  private baseUrl=environment.apiUrl+"/auth/";   
  
  constructor(private http: HttpClient) { }  
  
  
  public register(baseUrlSaving:string,file:File): Observable<any> {
    console.log("Register Service called");
    const formData: FormData  = new FormData();           
     
     formData.append("file", file);     
     return this.http.post(baseUrlSaving, formData) ;
    //return this.http.post<SignupRequest>(this.baseUrl+"signup", signup);
  
     
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
