import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse,HttpParams } from '@angular/common/http';
import { Login } from '../models/login.model';
import { ClassDetails } from '../models/classdetail.model';
import { BloodGroup } from '../models/bloodgroup.model';
import { Religion } from "../models/religion.model";
import { environment } from '../../environments/environment.prod';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

 
   private baseUrl=environment.apiUrl+"/master/";
   

  constructor(private http: HttpClient) { }

  public saveBloodGroup(bloodGroup:BloodGroup): Observable<any> {
    return this.http.post<BloodGroup>(this.baseUrl+"saveBloodGroup", bloodGroup);
     
  }
   public getBloodGroupList(): Observable<any> {    
    return this.http.get<BloodGroup>(this.baseUrl+"getBloodGroupList");     
  } 

   public getReligionList(): Observable<any> {    
    return this.http.get<Religion>(this.baseUrl+"getReligionList");     
  } 

  public getBloodGroupById(bloodGroupId:any): Observable<any> {   
     return this.http.get(`${this.baseUrl}getBloodGroupById/${bloodGroupId}`);
    
  } 
 
  public deleteByBloodGroupId(bloodGroupId: number): Observable<any> {    
     return this.http.delete(`${this.baseUrl}deleteByBloodGroupId/${bloodGroupId}`, { responseType: 'text' });    
  }

 public saveClassDetail(classDetails:ClassDetails): Observable<any> {
    return this.http.post<ClassDetails>(this.baseUrl+"saveClassDetail", classDetails);
     
  }

   public getClassDetailList(): Observable<any> {    
    return this.http.get<BloodGroup>(this.baseUrl+"getClassDetailList");     
  } 
 

   public getClassDetailListPagination(pageIndex: number, pageSize: number): Observable<any> {
  
     let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.baseUrl+"getClassDetailListPagination", { params });
  }


  public getClassDetailById(classId:any): Observable<any> {    
     return this.http.get(`${this.baseUrl}getClassDetailById/${classId}`);
    
  } 

  public getStudentListByClassId(classId:number): Observable<any> {        
     return this.http.get(`${this.baseUrl}getStudentListByClassId/${classId}`);       
    
  }

  
  public deleteByClassId(classId: number): Observable<any> {    
     return this.http.delete(`${this.baseUrl}deleteByClassId/${classId}`, { responseType: 'text' });    
  }

   
 public deleteByUserId(userId: number): Observable<any> {    
     return this.http.delete(`${this.baseUrl}deleteByUserId/${userId}`, { responseType: 'text' });    
  }
 
 


   public getUserList(): Observable<any> {   
     return this.http.get(`${this.baseUrl}` + 'getUserList');
    
  }

}
