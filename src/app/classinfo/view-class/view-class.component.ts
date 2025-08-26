import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BloodGroup } from "../../models/bloodgroup.model";
import { StudentService } from "../../services/student.service";
import { MasterService } from "../../services/master.service";
import { Observable } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatDialog } from '@angular/material';
import { EditbloodgroupComponent } from '../../bloodgroup/editbloodgroup/editbloodgroup.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { DataService } from '../../services/data.service';
import { ClassDetails } from '../../models/classdetail.model';
import { UpdateClassComponent } from '../../classinfo/update-class/update-class.component';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css']
})
export class ViewClassComponent implements  OnInit   {

  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  displayedColumns: string[] = ["classId", "className","Actions"]; 
   
  errorMessage = "";
 
  isFlag: boolean = false;
  pageSizes = [10];
  dialogRef: any;
  totalElements: number = 0;
  classDetails: ClassDetails = new ClassDetails();  
  classDetailList:ClassDetails[]=[];

   ngOnInit() {
       
        this.dataService.refreshNeeded$.subscribe(() => {
          //this.getClassDetailList();
          this.getClassDetailList({ page: "0", size: "5" });

        });
  }


   
    nextPage(event: PageEvent) {
       const request = {};
        request['page'] = event.pageIndex.toString();
        request['size'] = event.pageSize.toString();
        this.getClassDetailList(request);
    }
       
    
  constructor(
    private router: Router,
    private masterService: MasterService,
    private dataService: DataService,
    public snackBar: MatSnackBar,public dialog: MatDialog
  ) {
  
    //this.getClassDetailList(request);
  }

  

  public getClassDetailList(request): void {

    this.masterService.getClassDetailList().subscribe(
      data => {
        console.log("ClassDetails  List");
        console.log(data);
        this.classDetailList=data;
         this.totalElements = data;
         this.dataSource = new MatTableDataSource(this.classDetailList);
       
      }, error => console.log(error));
  }

 
 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 
 onEdit(element: any) {
   
   console.log('Edit clicked:', element.classId);

     this.dialogRef = this.dialog.open(UpdateClassComponent, 
      { data :element,height: '500px', width: '5000px', autoFocus: true });

      
  } 

  onDelete(element: any) {  

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { message: 'Are you sure you want to delete this record?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.masterService.deleteByClassId(element.classId).subscribe(
      data => {
        console.log(data);
        if (data != null) {
          this.showAlert(
            "success",
            "Class Detail Information has been deleted successfully"
          );
        }
        // this.getClassDetailList();
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

  public addClassDetail(): void {
    this.router.navigate(["/saveClass"]);
  }

 

  public showAlert(message: string, action: string = "Dismiss") {
    this.snackBar.open(message, action, {
      duration: 5000, // Optional duration in milliseconds
      horizontalPosition: "center", // Optional horizontal position
      verticalPosition: "top" // Optional vertical position
    });
  }

}
