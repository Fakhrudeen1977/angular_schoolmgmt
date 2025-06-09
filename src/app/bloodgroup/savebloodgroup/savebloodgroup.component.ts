import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassDetails } from '../../models/classdetail.model';
import { BloodGroup } from '../../models/bloodgroup.model';
import { CustomvalidatorService } from '../../services/customvalidator.service';
@Component({
  selector: 'app-savebloodgroup',
  templateUrl: './savebloodgroup.component.html',
  styleUrls: ['./savebloodgroup.component.css']
})
export class SavebloodgroupComponent implements OnInit {

  saveBloodGrpFrm: FormGroup;
  errorMessage = '';
  bloodGroup: BloodGroup = new BloodGroup();
  isFlag:boolean=false;
  isSubmitted:boolean=false;
 
  constructor(private router: Router, private masterService: MasterService,private snackBar: MatSnackBar) {
    this.getFormGroup();

  }
  ngOnInit() {
  }

  public getFormGroup(): void {
    this.saveBloodGrpFrm = new FormGroup({
      bloodGroupName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(3),CustomvalidatorService.validBloodGroup()]),

    });

  }  

  public get bloodGroupName():any {
    return this.saveBloodGrpFrm.get('bloodGroupName');
  }

  public saveBloodGroup(): void {    
    this.isSubmitted=true;    
    this.bloodGroup = this.saveBloodGrpFrm.value;
    this.masterService.saveBloodGroup(this.bloodGroup).subscribe(
      data => {
        console.log("After SaveBloodGroup");
        console.log(data);

        if (data != null) {
             this.showAlert("success","BloodGroup Saved Successfully");
             this.router.navigate(["/viewbloodgroup"]);
         
        }

      },err => {
        this.isFlag=true;
        this.errorMessage = err.message;
        this.showAlert("error",this.errorMessage);
        
      }
    );
  }

   public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:3000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
   }


}
