import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../services/tokenstorage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFrm: FormGroup;
  isLogindIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  login: Login = new Login();
  getUserName: string;
  isSubmitted:boolean=false;  
 
  constructor(public router: Router, public authService: AuthService, public tokenStorage: TokenStorageService,private snackBar: MatSnackBar) {
    console.log("Login Component Loadkibng");
    this.getFormGroup();
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLogindIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  public getFormGroup(): void {
    this.loginFrm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),

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
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveRefreshToken(data.refreshToken);


        this.isLoginFailed = false;
        this.isLogindIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.getUserName = this.tokenStorage.getUser().userName;

        console.log("Roles");
        console.log(this.roles);
        console.log(this.getUserName);
       
        this.reloadPage();
      },
      error => {       
        this.errorMessage = error.error.message;
        this.isLoginFailed = false;
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
