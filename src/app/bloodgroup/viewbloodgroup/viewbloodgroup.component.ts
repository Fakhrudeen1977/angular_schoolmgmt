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
@Component({
  selector: "app-viewbloodgroup",
  templateUrl: "./viewbloodgroup.component.html",
  styleUrls: ["./viewbloodgroup.component.css"]
})
export class ViewbloodgroupComponent implements AfterViewInit {

  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  displayedColumns: string[] = ["bloodId", "bloodGroupName","Actions"];
  public bloodGrpFrm: FormGroup;
  errorMessage = "";
  bloodGroup: BloodGroup = new BloodGroup();
  bloodGroupList: BloodGroup[] = [];
  isFlag: boolean = false;

  pageSizes = [10];

  dialogRef: any;
  
  public updateBloodGrpForm: FormGroup;

  constructor(
    private router: Router,
    private masterService: MasterService,
    public snackBar: MatSnackBar,public dialog: MatDialog
  ) {
    this.getFormGroup();
    this.getBloodGroupList();
  }

  public getFormGroup(): void {
    this.updateBloodGrpForm = new FormGroup({
      bloodId: new FormControl({ value: "", disabled: true }),
      // bloodId: new FormControl(''),
      bloodGroupName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(3)
      ])
    });
  }

  public get bloodGroupName(): any {
    return this.updateBloodGrpForm.get("bloodGeoupName");
  }

  public get bloodId(): any {
    return this.updateBloodGrpForm.get("bloodId");
  }

  public saveBloodGroup(): void {
    this.bloodGroup.bloodId = this.updateBloodGrpForm.get("bloodId").value;
    this.bloodGroup.bloodGroupName = this.updateBloodGrpForm.get(
      "bloodGroupName"
    ).value;

    this.masterService.saveBloodGroup(this.bloodGroup).subscribe(
      data => {
        if (data != null) {
          this.showAlert(
            "success",
            "BloodGroup information uupdated successfully"
          );
          
          this.getBloodGroupList();
        }
      },
      err => {
        this.isFlag = true;
        this.errorMessage = err.message;
      }
    );
  }

  public getBloodGroupList(): void {
    this.masterService.getBloodGroupList().subscribe(
      data => {
        console.log("Blood Group  List");
        console.log(data);
        this.bloodGroupList = data;

        this.dataSource = new MatTableDataSource(this.bloodGroupList);
        

        console.log(this.bloodGroupList);
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getBloodGroupById(): void {
    this.masterService
      .getBloodGroupById(this.updateBloodGrpForm.get("bloodId").value)
      .subscribe(
        data => {
          console.log("Blood Group Id  Fetched");
          console.log(data);
          this.bloodGroup = data;

          console.log(this.bloodGroup);
        },
        error => {
          this.errorMessage = error.error.message;
          console.log(error);
          this.showAlert("error", this.errorMessage);
        }
      );
  }

 
 onEdit(element: any) {
   
   console.log('Edit clicked:', element.bloodId);

     this.dialogRef = this.dialog.open(EditbloodgroupComponent, 
      { data :element,height: '500px', width: '5000px', autoFocus: true });

  } 

  onDelete(element: any) {  

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { message: 'Are you sure you want to delete this record?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.masterService.deleteByBloodGrpId(element.bloodId).subscribe(
      data => {
        console.log(data);
        if (data != null) {
          this.showAlert(
            "success",
            "Blood Information has been deleted successfully"
          );
        }
        this.getBloodGroupList();
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
 

  public addBloodGroup(): void {
    this.router.navigate(["/savebloodgroup"]);
  }

  public showAlert(message: string, action: string = "Dismiss") {
    this.snackBar.open(message, action, {
      duration: 3000, // Optional duration in milliseconds
      horizontalPosition: "center", // Optional horizontal position
      verticalPosition: "top" // Optional vertical position
    });
  }
}
