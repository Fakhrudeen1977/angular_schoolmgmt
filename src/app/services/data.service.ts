import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Json } from '../models/json.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {     
  }

   getJsonData():Observable<any> {
      return this.http.get<any>('assets/test.json');   
    }

   
  
}
