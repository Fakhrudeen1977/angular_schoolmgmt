import { Component, OnInit, AfterViewInit, ViewChild,Inject } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassDetails } from '../../models/classdetail.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomvalidatorService } from '../../services/customvalidator.service';

import { ViewClassComponent } from '../../classinfo/view-class/view-class.component';
@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent  {

  updateClassFrm: FormGroup;
  errorMessage = '';  
  isFlag:boolean=false;
  isSubmitted:boolean=false;
  rowData:any;
  classDetails: ClassDetails = new ClassDetails();  
  classDetailList:ClassDetails[]=[];
  
 
  constructor(private router: Router, private masterService: MasterService,private snackBar: MatSnackBar,private dataService:DataService,
   @Inject( MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<UpdateClassComponent>
    ) 
   {
     this.rowData=data; 
     this.getFormGroup();    
         
     this.updateClassFrm.get("className").setValue(this.rowData.className);

  } 
 
 

  public getFormGroup(): void {
    this.updateClassFrm = new FormGroup({
      classId: new FormControl({value:this.rowData.classId, disabled: true}),
      className: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]),

    });

  }  
  public get className():any {
    return this.updateClassFrm.get('className');
  }

  public get classId():any{
     return this.updateClassFrm.get('classId');

  }
  public saveClass(): void {     
    this.isSubmitted=true;   
    this.classDetails.classId = this.updateClassFrm.get("classId").value;
    this.classDetails.className=this.updateClassFrm.get("className").value;
   
   this.masterService.saveClassDetail(this.classDetails).subscribe(
      data => {
        console.log("Update Class Detail");
        console.log(data);

        if (data != null) {
             this.showAlert("success","Class Detail updated Successfully");   
            
            this.dataService.triggerRefresh();
            
         
        }
      },error => {
        this.isFlag=true;
        this.errorMessage = error.error.message;
        this.showAlert("error",this.errorMessage);
        
      }
    );
  }

  public closeDialog(){    
    this.dialogRef.close();
    this.router.navigate(["/viewClass"]);
     
  }

   public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:4000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
        
      this.closeDialog();
      
   }
   


}
