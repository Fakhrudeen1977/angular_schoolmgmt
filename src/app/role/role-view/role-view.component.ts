import { Component, OnInit,Inject  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../../models/role.model';
import { RoleService} from "../../services/role.service";
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-role-view',
  templateUrl: './role-view.component.html',
  styleUrls: ['./role-view.component.css']
})
export class RoleViewComponent implements OnInit {

  roleViewpFrm: FormGroup;
  errorMessage = '';
  role: Role = new Role();
  isFlag:boolean=false;
  isSubmitted:boolean=false;
  rowData:Role;
 
  roleList: Role[] = [];
 
  constructor(private router: Router, private dataService:DataService, private roleService:RoleService,private snackBar: MatSnackBar,
   @Inject( MAT_DIALOG_DATA) public data:Role,
    public dialogRef: MatDialogRef<RoleViewComponent>
    ) 
   {
     this.rowData=data;   
     this.getFormGroup();     
    
        
     this.roleViewpFrm.get("roleName").setValue(this.rowData.roleName);

  } 
 
  ngOnInit() {
    
  }

  public getFormGroup(): void {
    this.roleViewpFrm = new FormGroup({
      roleId: new FormControl({value:this.rowData.roleId, disabled: true}),
      roleName: new FormControl('', [Validators.required]),

    });

  }  
 public get roleId(){
     return this.roleViewpFrm.get('roleId');
  }
  public get roleName() {
    return this.roleViewpFrm.get('roleName');
  }

   public saveRole(): void {    
    this.isSubmitted=true;    
     if (this.roleViewpFrm.invalid) {
        return;
     }


    this.role = this.roleViewpFrm.getRawValue();
   this.roleService.saveRole(this.role).subscribe({
    next: () => {
      this.showAlert("success","Role Updated Successfully");
     
    },
    error: (err) => {
      this.errorMessage = err.error.message;
      this.showAlert(this.errorMessage, "Error");
    }
  });
  }


  public closeDialog(){    
  
    this.dialogRef.close(true);
    this.router.navigate(["/viewRolesList"]);
    this.dataService.triggerRefresh();
     
  }


   public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:3000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
      this.closeDialog();
      
   }
   


}
