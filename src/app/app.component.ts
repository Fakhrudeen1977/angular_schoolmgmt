import { Component, OnInit, AfterContentInit,ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { TokenStorageService } from './services/tokenstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material'; 
import { SavestudentComponent } from './student/savestudent/savestudent.component';
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
  roleAdmin:string;
  roleUser:string;
  roleHR:string;
  refreshToken:any;
  
  constructor(public tokenStorageService: TokenStorageService,public router: Router,private _dialog:MatDialog) {
       
    console.log("App Component Loading");

   }

   openDialog(): void { 
     
    let dialogRef = this._dialog.open(SavestudentComponent) ;
     
} 

  ngOnInit() {
 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log("LoggedIn");
    console.log("Still Not Login"+this.isLoggedIn);

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      const access_token=this.tokenStorageService.getToken();
      const refres_Token=this.tokenStorageService.getRefreshToken();
      
      this.accessToken=access_token;     
      this.refreshToken=refres_Token;
   
      this.roles = user.roles;     
      this.userName = user.userName;
      this.name=user.name;         
    
      if(this.roles.length==1){
      
       this.currentRoles=this.currentRoles+this.roles;
        if(this.currentRoles==="Admin"){
                this.roleAdmin=  this.currentRoles;               
                
              }

              if(this.currentRoles==="User"){
                  this.roleUser=  this.currentRoles;                   
              
              }
              
              if(this.currentRoles==="HR"){
                  this.roleHR=  this.currentRoles;                        
              } 

       
      }
      else{
      
         this.currentRoles=this.getLoggedUserRoles(this.roles) ;         
         this.currentRole=this.currentRoles.split(",");
         
  
              for(let role of this.currentRole){
                
               if( role==="Admin"){
                this.roleAdmin= role;               
                
              }

              if( role==="User"){
                  this.roleUser= role;                   
              
              }
              
              if(role==="HR"){
                  this.roleHR= role;                        
              } 

 
              }   
      }
     
      //localStorage.setItem("currentRoles",this.currentRoles);    

      window.sessionStorage.setItem("currentRoles",this.currentRoles); 
      this.router.navigate(["/dashboard"]);
     
    }
       
  }
 
  public getLoggedUserRoles(rols:any):any{
        
        let i=1;
       for(let role of  rols){   
         
          if(i<rols.length)
          this.currentRoles=this.currentRoles+role+",";
          else
          this.currentRoles=this.currentRoles+role;
         
          i++;
             
      }
    
      return this.currentRoles;
  }  

  public getHeader():void{
     this.tokenStorageService.getHeader().subscribe(
      data => {
        console.log("Header   List");
        console.log(data);
       
      
      }, error => console.log(error));
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
