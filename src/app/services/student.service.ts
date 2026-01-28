import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //private  baseUrl = "http://localhost:8000/api/student/";  
  private baseUrl=environment.apiUrl+"/student/";  


  constructor(private http: HttpClient) { }


   public saveStudent(baseUrlSaving:string,file:File): Observable<any> {    
     const formData: FormData  = new FormData();           
      // Store form name as "file" with file data
      //formData.append("file", file);
      formData.append("file", file);     
     return this.http.post(baseUrlSaving, formData) ;
 
  }

  public updateStudent(baseUrlSaving:string,file:File): Observable<any> {    
     const formData: FormData  = new FormData();           
      // Store form name as "file" with file data
      //formData.append("file", file);
      formData.append("file", file);     
     return this.http.post(baseUrlSaving, formData) ;
 
  }
    
 public getStudentById(studentId:number):Observable<any> {    
     return this.http.get(`${this.baseUrl}getStudentById/${studentId}`);            
  }


  public getStudentList(): Observable<any> {
    return this.http.get<Student>(this.baseUrl+"getStudentList");
     
  }

  public uploadFile(file: File):Observable<any> {    
   
    const formData: FormData  = new FormData();    
    formData.append("file", file);    
    return this.http.post<any>('http://localhost:8000/api/student/uploadFile', formData);
 }
 

   public deleteByStudentId(studentId: number): Observable<any> {   
     return this.http.delete(`${this.baseUrl}deleteByStudentId/${studentId}`, { responseType: 'text' });    
  }

   public getMaleStudentList(): Observable<any> {
    return this.http.get<Student>(this.baseUrl+"getMaleStudentList");     
  }

   public getFemaleStudentList(): Observable<any> {
    return this.http.get<Student>(this.baseUrl+"getFemaleStudentList");
     
  }

   public getBirthBabiesList(): Observable<any> {
    return this.http.get<Student>(this.baseUrl+"getBirthBabiesList");
     
  }


}
