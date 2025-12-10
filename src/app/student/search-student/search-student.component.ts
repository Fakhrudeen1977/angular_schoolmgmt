import { Component, OnInit, AfterViewInit, ViewChild,Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../../services/student.service";
import { MasterService } from "../../services/master.service";
import { Observable } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Student } from "../../models/student.model";
import { UpdateStudentComponent } from '../../student/update-student/update-student.component';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.css']
})
export class SearchStudentComponent {
 
  displayedColumns: string[] = ["studentId", "studentName","fatherName","motherName", "dateOfBirth","gender", "className","religionName","bloodGroupName","fatherMobileNumber","motherMobileNumber","aadharCardNumber","email","contactAddress"];
  
  dataSource = new MatTableDataSource<Student>();

  errorMessage = "";
  student: any = new Student();
 
  isFlag: boolean = false;
  searchStudentForm: FormGroup;
 
  constructor(
    private router: Router,
    private masterService: MasterService,
    private studentService: StudentService,
    private dataService: DataService,
    public snackBar: MatSnackBar,
  ) {
    this.getFormGroup();     
  }  
   

 public getFormGroup(): void {
    this.searchStudentForm = new FormGroup({
      studentId: new FormControl("")    
      
    });
  }  

   public get studentId(){
     return this.searchStudentForm.get('studentId');
  }

  public getStudentById(): void {       
    let studentId=this.searchStudentForm.get('studentId').value;
    
    this.studentService.getStudentById(studentId).subscribe(      
      data => {
        
        console.log("Student ById");  
        this.isFlag=true;
        this.student=data;               
        console.log(this.student);  
        
        this.dataSource = new MatTableDataSource([this.student]); 
       

      }, 
       error => { 
       this.student=null;
       this.errorMessage = error.error.message
       this.showAlert("error",this.errorMessage);
        
    })
  }



  public showAlert(message: string, action: string = "Dismiss") {
    this.snackBar.open(message, action, {
      duration: 8000, // Optional duration in milliseconds
      horizontalPosition: "center", // Optional horizontal position
      verticalPosition: "top" // Optional vertical position
    });
  }

  public clear():void{
    this.searchStudentForm.reset();  
  }

}
