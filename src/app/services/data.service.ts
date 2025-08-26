import { Injectable } from '@angular/core';
import { Observable,Subject,BehaviorSubject } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Json } from '../models/json.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {   
     
  }

  private refreshNeeded=new BehaviorSubject<boolean>(false);
  refreshNeeded$=this.refreshNeeded.asObservable();

  triggerRefresh(){
    this.refreshNeeded.next(true);
  }


   getJsonData():Observable<any> {
      return this.http.get<any>('assets/test.json');   
    }



   
  
}
