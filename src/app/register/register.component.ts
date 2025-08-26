import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupRequest } from '../models/signup.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../models/role.model';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  signupFrm: FormGroup;
  signup: SignupRequest = new SignupRequest();
  roles: string[] = [];
  splitedRoleNames: string[]=[];
  assignedRoles: string[] = [];
  selectedRoles: Role[] = [];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roleList: Role[] = [];

  constructor( public router: Router, public authService: AuthService,public masterService:MasterService ,private snackBar: MatSnackBar) {
    this.getFormGroup();
    this.getRoleList();
   
  }

  public getFormGroup(): void {
    this.signupFrm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      role: new FormControl('', [Validators.required]),

    });

  }

  public get name() {
    return this.signupFrm.get('name');
  }

  public get userName() {
    return this.signupFrm.get('userName');
  }

  public get password() {
    return this.signupFrm.get('password');
  }

  public get email() {
    return this.signupFrm.get('email');
  }

  public get role() {
    return this.signupFrm.get('role');
  }

  public getRoleList(): void {
    this.masterService.getRoleList().subscribe(
      data => {
        this.roleList = data;
      },
    )
  }

  public getRoles(event:any){  
    let roleName="";
    this.roles=[];
    if(event.source.selected) {   
      let roleId=event.value;  
      roleName=event.source.triggerValue;  
      this.roles.push(roleName);    
        
           
    }             
    

  } 

  public register(): void {
    console.log("Register");  
    this.signup.name=this.signupFrm.get("name").value;
    this.signup.userName=this.signupFrm.get("userName").value;
    this.signup.password=this.signupFrm.get("password").value;
    this.signup.email=this.signupFrm.get("email").value;
    //this.signup.roles=this.roles;
    
    
    for (let i = 0; i < this.roles.length; i++) {
        
        const resultString: string = this.roles.toString();
        this.splitedRoleNames= resultString.split(",");
              

    }     
      
    for (let i = 0; i <this.splitedRoleNames.length; i++) {
     
         this.assignedRoles.push(this.splitedRoleNames[i].toString().trim());
        

    }

   //this.signup.roles=['Admin','User'];
   this.signup.roles=this.assignedRoles;

    console.log(this.signup);
  
  
 this.authService.register(this.signup).subscribe(
      data => {
          console.log("Registration Done");          

          if(data!=null){
             this.showAlert("success","Registration Saved Successfully");  
             this.router.navigate(["/login"]);           
         
          }

      },
      err => {
        this.errorMessage = err.message;
        this.showAlert("error",this.errorMessage);
        
      }
    );
    
     

  }

  public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:15000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
   }

  public login() {
    event.preventDefault();
    this.router.navigate(["/login"]);
  } 




}
