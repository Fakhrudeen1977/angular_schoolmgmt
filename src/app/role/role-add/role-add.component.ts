import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassDetails } from '../../models/classdetail.model';
import { Role } from '../../models/role.model';
import { CustomvalidatorService } from '../../services/customvalidator.service';
import { RoleService} from "../../services/role.service";
@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  roleFrm: FormGroup;
  errorMessage = '';
  role: Role = new Role();
  isFlag:boolean=false;
  isSubmitted:boolean=false;
 
  constructor(private router: Router, private roleService:RoleService,private snackBar: MatSnackBar) {
    this.getFormGroup();

  }
 

  public getFormGroup(): void {
    this.roleFrm = new FormGroup({
      roleName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
     
    });    

  }  

   ngOnInit() {
        
  }

  public get roleName():any {
    return this.roleFrm.get('roleName');
  }

  public saveRole(): void {    
    this.isSubmitted=true;    
    this.role = this.roleFrm.value;
    this.roleService.saveRole(this.role).subscribe(
      data => {
        console.log("Save Role");
        console.log(data);

        if (data != null) {
             this.showAlert("success","Role Saved Successfully");
              this.router.navigate(["/viewRolesList"]);
         
        }

      },error => {
        this.isFlag=true;               
        this.errorMessage = error.error.message;        
        this.showAlert("error",this.errorMessage);
        
      }
    );
  }

   public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:5000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
   }



}
