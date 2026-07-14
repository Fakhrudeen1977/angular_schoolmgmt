import { Component, OnInit, AfterContentInit,ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { TokenStorageService } from './services/tokenstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material'; 
import { SaveStudentComponent } from './student/save-student/save-student.component';
import { UserImageService } from './services/user-image.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  roles: string[];  
  currentRoles:string="";  
  isLoggedIn:any=false;
  userName: string;
  name:string;
  accessToken:any;
  currentRole:string[];
  current_Role:string="";
  refreshToken:any;  
  userRoles:string;
  base64Image: string = "";   
  
  constructor(private authService: AuthService,private tokenStorageService: TokenStorageService,public router: Router,private _dialog:MatDialog,private userImageService: UserImageService) {
        
   }

   openDialog(): void {      
    let dialogRef = this._dialog.open(SaveStudentComponent) ;
     
} 

  ngOnInit() { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log("Token is Not Availaibale"+" "+"Still Not Login"+this.isLoggedIn);
  
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      const access_token=this.tokenStorageService.getToken();
      const refres_Token=this.tokenStorageService.getRefreshToken();
      
      this.accessToken=access_token;     
      this.refreshToken=refres_Token;   
      this.roles = user.roles;     
      this.userName = user.userName;
      this.name=user.name;  
      const userImage = sessionStorage.getItem('userImage'); 

      this.authService.setRoles(this.roles);


      this.base64Image = 'data:image/jpeg;base64,'+userImage;  
      this.router.navigate(["/dashboard"]);
     
    }
       
  }
  

  public changePassword():void{
    
    
  }

  public goToHome():void{
    this.router.navigate(["/home"]);
  }

   public logout():void {        
   this.tokenStorageService.signOut();
  
   this.router.navigate(["/login"]);
       
  }
 
 
 
}



