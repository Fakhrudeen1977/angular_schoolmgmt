import { Component, OnInit,Inject  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassDetails } from '../../models/classdetail.model';
import { BloodGroup } from '../../models/bloodgroup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomvalidatorService } from '../../services/customvalidator.service';
@Component({
  selector: 'app-editbloodgroup',
  templateUrl: './editbloodgroup.component.html',
  styleUrls: ['./editbloodgroup.component.css']
})
export class EditbloodgroupComponent implements OnInit {

  editBloodGrpFrm: FormGroup;
  errorMessage = '';
  bloodGroup: BloodGroup = new BloodGroup();
  isFlag:boolean=false;
  isSubmitted:boolean=false;
  rowData:any;
 
  constructor(private router: Router, private masterService: MasterService,private snackBar: MatSnackBar,
   @Inject( MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<EditbloodgroupComponent>
    ) 
   {
     this.getFormGroup();    
     this.rowData=data;       
     this.editBloodGrpFrm.get("bloodId").setValue(this.rowData.bloodId);
     this.editBloodGrpFrm.get("bloodGroupName").setValue(this.rowData.bloodGroupName);

  } 
 
  ngOnInit() {
  }

  public getFormGroup(): void {
    this.editBloodGrpFrm = new FormGroup({
      bloodId: new FormControl({value:"", disabled: true}),
      bloodGroupName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(3),CustomvalidatorService.validBloodGroup()]),

    });

  }  
 public get bloodId():any{
     return this.editBloodGrpFrm.get('bloodId');
  }
  public get bloodGroupName():any {
    return this.editBloodGrpFrm.get('bloodGroupName');
  }

  public saveBloodGroup(): void {     
    this.isSubmitted=true;   
    this.bloodGroup.bloodId = this.editBloodGrpFrm.get("bloodId").value;
    this.bloodGroup.bloodGroupName=this.editBloodGrpFrm.get("bloodGroupName").value;
   
   this.masterService.saveBloodGroup(this.bloodGroup).subscribe(
      data => {
        console.log("After SaveBloodGroup");
        console.log(data);

        if (data != null) {
             this.showAlert("success","BloodGroup updated Successfully");            
         
        }
      },err => {
        this.isFlag=true;
        this.errorMessage = err.message;
        this.showAlert("error",this.errorMessage);
        
      }
    );
  }

  public closeDialog(){    
    this.dialogRef.close();
    this.router.navigate(["/viewbloodgroup"]);
     
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
