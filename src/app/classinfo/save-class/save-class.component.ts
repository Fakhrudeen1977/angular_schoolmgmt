import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassDetails } from '../../models/classdetail.model';
import { BloodGroup } from '../../models/bloodgroup.model';
import { CustomvalidatorService } from '../../services/customvalidator.service';
@Component({
  selector: 'app-save-class',
  templateUrl: './save-class.component.html',
  styleUrls: ['./save-class.component.css']
})
export class SaveClassComponent implements OnInit {

  classDetailsFrm: FormGroup;
  errorMessage = '';
  classDetails: ClassDetails = new ClassDetails();
  isFlag:boolean=false;
  isSubmitted:boolean=false;
 
  constructor(private router: Router, private masterService: MasterService,private snackBar: MatSnackBar) {
    this.getFormGroup();

  }
 

  public getFormGroup(): void {
    this.classDetailsFrm = new FormGroup({
      className: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]),
     
    });    

  }  

   ngOnInit() {
        
  }

  public get className():any {
    return this.classDetailsFrm.get('className');
  }

  public saveClassDetail(): void {    
    this.isSubmitted=true;    
    this.classDetails = this.classDetailsFrm.value;
    this.masterService.saveClassDetail(this.classDetails).subscribe(
      data => {
        console.log("Save Class Details");
        console.log(data);

        if (data != null) {
             this.showAlert("success","ClassDetail Saved Successfully");
              this.router.navigate(["/viewClass"]);
         
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
