import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupRequest } from '../models/signup.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../models/role.model';

import { RoleService } from "../services/role.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupFrm: FormGroup;
  signup: SignupRequest = new SignupRequest();
  roles: any[] = [];

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  roleList: Role[] = [];
  selectedFile: File;
  baseUrl: string;
  constructor(public router: Router, public authService: AuthService, public roleService: RoleService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
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
      imageFileName: new FormControl("", [Validators.required])

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

  public get imageFileName() {
    return this.signupFrm.get("imageFileName");
  }


  public getRoleList(): void {
    this.roleService.getRoleList().subscribe(
      data => {
        this.roleList = data;
      },
    )
  }


  public getRoles(event: any): void {


  }

  selectFile(event: any) {
    const file = event.target.files.item(0);
    //alert("File chosent"+" "+file);

    if (file.type.match("image.*")) {
      var size = event.target.files[0].size;
      if (size > 1000000) {
        alert("size must not exceeds 1 MB");
        this.signupFrm.get("imageFileName").setValue("");
      } else {
        this.selectedFile = file;

      }
    } else {
      alert("invalid format!");
    }
  }



  public saveUserWithRoles(): void {

    if (this.signupFrm.invalid) {
      this.signupFrm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append("name", this.signupFrm.value.name);
    formData.append("userName", this.signupFrm.value.userName);
    formData.append("password", this.signupFrm.value.password);
    formData.append("email", this.signupFrm.value.email);

    this.roles = this.signupFrm.get('role').value;
    this.roles.forEach((roleId: number) => {
      formData.append('role', roleId.toString());
    });
    formData.append("file", this.selectedFile);

    this.authService.saveUserWithRoles(formData).subscribe(
      
      data => {
          if (data != null) {
          console.log("UserRegistration Saved Successfully");
          this.showAlert("success", "UserRegistration Saved Successfully");
          this.router.navigate(["/login"]);

        }

      },
      error => {
        console.log("Error Finding");
        console.log(error);
        this.errorMessage = error.error;
        this.showAlert("error", this.errorMessage);

      }
    );



  }

  public showAlert(message: string, action: string = 'Dismiss') {
    this.snackBar.open(message, action, {
      duration: 5000, // Optional duration in milliseconds
      horizontalPosition: 'center', // Optional horizontal position
      verticalPosition: 'top', // Optional vertical position
    });
  }

  public login() {
    event.preventDefault();
    this.router.navigate(["/login"]);
  }







}
