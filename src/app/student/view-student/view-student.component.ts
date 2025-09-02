
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
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements  OnInit ,  AfterViewInit  {

 @ViewChild(MatSort, { static: true })
  sort: MatSort;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  
  displayedColumns: string[] = ["studentId", "studentName","fatherName","dateOfBirth","gender", "className","bloodGroupName","mobileNumber","email","contactAddress","Actions"];
 
  errorMessage = "";
  public students: Student[] = [];
  isFlag: boolean = false;
  pageSizes = [10];
  dialogRef: any;
  
  constructor(
    private router: Router,
    private masterService: MasterService,
    private studentService: StudentService,
    private dataService: DataService,
    public snackBar: MatSnackBar,public dialog: MatDialog
  ) {
    
    this.getStudentList();
  }  

   ngOnInit() {       
        this.dataService.refreshNeeded$.subscribe(() => {
        
         this.getStudentList();      

        });
  }

  ngAfterViewInit() {   
              
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
              

  }

  public getStudentList(): void {
   
    this.studentService.getStudentList().subscribe(
      data => {
        console.log("Student List ");      
        this.students=data;         
        console.log(this.students);  
        this.dataSource = new MatTableDataSource(this.students);     

      }, error => console.log(error));
  }


 
 onEdit(element: any) {
   
   console.log('Edit clicked:', element.studentId);

     this.dialogRef = this.dialog.open(UpdateStudentComponent, 
      { data :element,height: '1000px', width: '1000px', autoFocus: true });

  } 

  onDelete(element: any) {  

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { message: 'Are you sure you want to delete this record?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.studentService.deleteByStudentId(element.studentId).subscribe(
      data => {
        console.log(data);
        if (data != null) {
          this.showAlert(
            "success",
            "Student Detail has been deleted successfully"
          );
        }
        this.getStudentList();
      },
      error => {
        this.errorMessage = error.message;
        console.log(error);
        this.showAlert("error", this.errorMessage);
      }
    );
    }
  });

    
  }
 

  public addStudent(): void {
    this.router.navigate(["/saveStudent"]);
  }

  public showAlert(message: string, action: string = "Dismiss") {
    this.snackBar.open(message, action, {
      duration: 3000, // Optional duration in milliseconds
      horizontalPosition: "center", // Optional horizontal position
      verticalPosition: "top" // Optional vertical position
    });
  }
}
