import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Login } from '../models/login.model';
import { ClassDetails } from '../models/classdetail.model';
import { BloodGroup } from '../models/bloodgroup.model';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

 //private  baseUrl = "http://localhost:8000/api/master/";  
   private baseUrl=environment.baseURL+"/master/";
   

  constructor(private http: HttpClient) { }

  public saveBloodGroup(bloodGroup:BloodGroup): Observable<any> {
    return this.http.post<BloodGroup>(this.baseUrl+"saveBloodGroup", bloodGroup);
     
  }
   public getBloodGroupList(): Observable<any> {    
    return this.http.get<BloodGroup>(this.baseUrl+"getBloodGroupList");     
  } 

  public getBloodGroupById(bloodGroupId:any): Observable<any> {   
     return this.http.get(`${this.baseUrl}getBloodGroupById/${bloodGroupId}`);
    
  } 
 
  public deleteByBloodGrpId(bloodGroupId: number): Observable<any> {    
     return this.http.delete(`${this.baseUrl}deleteBloodGroupId/${bloodGroupId}`, { responseType: 'text' });    
  }

 public saveClassDetail(classDetails:ClassDetails): Observable<any> {
    return this.http.post<ClassDetails>(this.baseUrl+"saveClassDetail", classDetails);
     
  }
    public getClassDetailList(): Observable<any> {
    return this.http.get<ClassDetails>(this.baseUrl+"getClassDetailList");     
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
 
 

   public getRoleList(): Observable<any> {   
     return this.http.get(`${this.baseUrl}` + 'getRoleList');
    
  }


   public getUserList(): Observable<any> {   
     return this.http.get(`${this.baseUrl}` + 'getUserList');
    
  }

}
