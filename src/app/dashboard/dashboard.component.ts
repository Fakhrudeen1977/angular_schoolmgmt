import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { TokenStorageService } from '../services/tokenstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  public student: Student;
  public maleStudents: Student[] = [];
  public femaleStudents: Student[] = []; 
  public birthDayStudentList: Student[] = []; 
  public numberOfHit:number=0;
  constructor(public studentService: StudentService,public tokenStorageService: TokenStorageService) {
   // this.getMaleStudentList();
    //this.getFemaleStudentList();
    //this.getBirthBabiesList();

  } 

  public getMaleStudentList(): void {

    this.studentService.getMaleStudentList().subscribe(
      data => {
        this.maleStudents = data; 


      }, error => console.log(error));
  }

  public getBirthBabiesList(): void {

    this.studentService.getBirthBabiesList().subscribe(
      data => {
        this.birthDayStudentList = data;
              
      }, error => console.log(error));
  }

   public getFemaleStudentList(): void {

    this.studentService.getFemaleStudentList().subscribe(
      data => {
        this.femaleStudents = data; 

      }, error => console.log(error));
  }

  

 

}
