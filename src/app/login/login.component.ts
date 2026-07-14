import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../services/tokenstorage.service';
import { CustomvalidatorService } from '../services/customvalidator.service';
import { UserImageService } from '../services/user-image.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFrm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  login: Login = new Login();
  getUserName: string;
  isSubmitted:boolean=false;  
  displayImage: SafeUrl;
  base64Image: string = "";
 
  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService,private snackBar: MatSnackBar,private sanitizer: DomSanitizer,private userImageService: UserImageService) {
  
    this.getFormGroup();
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }
  public getFormGroup(): void {
    this.loginFrm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30),CustomvalidatorService.noLeadingSpace()]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),

    });

  }
  public get userName() {
    return this.loginFrm.get('userName');
  }

  public get password() {
    return this.loginFrm.get('password');
  }


  public signIn() {
     this.isSubmitted=true;  
     this.login = this.loginFrm.value;
     if(this.loginFrm.invalid)
     return;
         
        this.authService.login(this.login).subscribe(
        data => {
        console.log("After Login");
        console.log(data);       
        console.log(data.token);
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.tokenStorageService.saveRefreshToken(data.refreshToken);       
       
        this.base64Image = 'data:image/jpeg;base64,'+data.imageData;  
        sessionStorage.setItem('userImage', data.imageData);     
              
        this.reloadPage();
      },
      error => {       
        this.errorMessage = error.error;       
        this.isLoginFailed = false;-
        this.showAlert("error",this.errorMessage);    
        

      }
    );     
 
  }

  reloadPage() {
    window.location.reload();
  }
 

  public signUp(): void {
    event.preventDefault();
    this.router.navigate(["/register"]);
  }



    public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:5000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
   }


}
