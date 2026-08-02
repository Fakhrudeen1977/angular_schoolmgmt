import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoleService} from "../../services/role.service";
import { Observable } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatDialog } from '@angular/material';
import { EditbloodgroupComponent } from '../../bloodgroup/editbloodgroup/editbloodgroup.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Role } from '../../models/role.model';
import { RoleViewComponent } from '../../role/role-view/role-view.component';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  displayedColumns: string[] = ["roleId", "roleName","Actions"]; 
 

  public bloodGrpFrm: FormGroup;
  errorMessage = "";
  role: Role = new Role();
  roleList: Role[] = [];
  isFlag: boolean = false;
  pageSizes = [10];
  dialogRef: any;
  
  

  constructor(
    private router: Router,
    private roleService: RoleService,private dataService: DataService,
    public snackBar: MatSnackBar,public dialog: MatDialog
  ) {
   
    this.getRoleList();
  }


   ngOnInit() {       
        this.dataService.refreshNeeded$.subscribe(() => {
          this.getRoleList();             

        });
  }
      
  
  public getRoleList(): void {
    this.roleService.getRoleList().subscribe(
      data => {
        console.log("Role  List");
        console.log(data);
        this.roleList = data;        
        this.dataSource = new MatTableDataSource(this.roleList);         

        console.log(this.roleList);
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 
 onEdit(element: any) {
   
   console.log('Edit clicked:', element.roleId);

     this.dialogRef = this.dialog.open(RoleViewComponent, 
      { data :element,height: '500px', width: '5000px', autoFocus: true });

  } 

  onDelete(element: any) {  

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '300px',
    data: { message: 'Are you sure you want to delete this record?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
    
      this.roleService.deleteByRoleId(element.roleId).subscribe(
      data => {
        console.log(data);
        if (data != null) {
          this.showAlert(
            "success",
            "Role Id has been deleted successfully"
          );
        }
        this.getRoleList();
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

  public addRole(): void {
    this.router.navigate(["/saveRole"]);
  }

  public showAlert(message: string, action: string = "Dismiss") {
    this.snackBar.open(message, action, {
      duration: 3000, // Optional duration in milliseconds
      horizontalPosition: "center", // Optional horizontal position
      verticalPosition: "top" // Optional vertical position
    });
  }
}

