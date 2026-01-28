import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "../../models/student.model";
import { BloodGroup } from "../../models/bloodgroup.model";
import { StudentService } from "../../services/student.service";
import { MasterService } from "../../services/master.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassDetails } from "../../models/classdetail.model";
import { Religion } from "../../models/religion.model";
import { DatePipe } from "@angular/common";
import { CustomvalidatorService } from '../../services/customvalidator.service';
@Component({
  selector: "app-save-student",
  templateUrl: "./save-student.component.html",
  styleUrls: ["./save-student.component.css"]
})
export class SaveStudentComponent {

  saveStudentForm: FormGroup;
  student: Student;
  bloodGrp: BloodGroup[] = [];
  classDetail: ClassDetails;
  classDetil: ClassDetails[] = [];
  religionList: Religion[]=[];
  selectedFiles: File;
  currentFileUpload: File;
  selectedFile: File;
  errorMessage:any=null;
  isFlag:boolean=false;
  isSubmitted:boolean = false;
  baseUrl:string;
  emailPattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  className:any;
  religionName:any;
  bloodGroupName:any;
  constructor(
    private router: Router,
    private studentService: StudentService,
    private masterService: MasterService,
    private _dataPipe: DatePipe,private snackBar: MatSnackBar
  ) {
    console.log("SaveStudent Construcor loading");
    this.getFormGroup();
    this.getBloodGroupList();
    this.getClassDetailList();
    this.getReligionList();
  }

  public getFormGroup(): void {
    this.saveStudentForm = new FormGroup({
      studentName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z s.]*$")
      ]),
      fatherName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z s.]*$")
      ]),
     motherName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z s.]*$")
      ]),

      gender: new FormControl("", [Validators.required]),
      religionId:new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required,CustomvalidatorService.futuerDateValidator()]),
      classId: new FormControl("", [Validators.required]),
     
      bloodId: new FormControl("", [Validators.required]),
      fatherMobileNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$")
      ]),
      
        motherMobileNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$")
      ]),

      contactAddress: new FormControl("", [Validators.required]),
      aadharCardNumber: new FormControl("", [Validators.required,CustomvalidatorService.aadharValidator()]),
    

      photoNumber: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.pattern(this.emailPattern)]),
      imageFileName: new FormControl("", [Validators.required])
    });
  }

  public get studentName() {
    return this.saveStudentForm.get("studentName");
  }

  public get fatherName() {
    return this.saveStudentForm.get("fatherName");
  }

 
  public get motherName() {
    return this.saveStudentForm.get("motherName");
  }
  
   public get aadharCardNumber() {
    return this.saveStudentForm.get("aadharCardNumber");
  }
  
  public get religionId(){
    return this.saveStudentForm.get("religionId");
  }

  public get gender() {
    return this.saveStudentForm.get("gender");
  }
  public get dateOfBirth() {
    return this.saveStudentForm.get("dateOfBirth");
  }

  public get fatherMobileNumber() {
    return this.saveStudentForm.get("fatherMobileNumber");
  }

  public get motherMobileNumber() {
    return this.saveStudentForm.get("motherMobileNumber");
  }

  public get contactAddress() {
    return this.saveStudentForm.get("contactAddress");
  }

  public get bloodId() {
    return this.saveStudentForm.get("bloodId");
  }

 
  public get classId() {
    return this.saveStudentForm.get("classId");
  }

  public get photoNumber() {
    return this.saveStudentForm.get("photoNumber");
  }

   public get email() {
    return this.saveStudentForm.get("email");
  }

  public get imageFileName() {
    return this.saveStudentForm.get("imageFileName");
  }

  public getBloodGroupList(): void {
    this.masterService.getBloodGroupList().subscribe(
      data => {
        console.log(data);
        this.bloodGrp = data;
      },
      error => console.log(error)
    );
  }


   public getReligionList(): void {
    this.masterService.getReligionList().subscribe(
      data => {
        console.log(data);
        this.religionList = data;
      },
      error => console.log(error)
    );
  }


  public getClassDetailList(): void {
    this.masterService.getClassDetailList().subscribe(
      data => {
        console.log(data);
        this.classDetil = data['content'];
        
      },
      error => console.log(error)
    );
  }

  public genderSelect($event:any) {
   
     console.log($event.source.value);   
       
     this.saveStudentForm.get("gender").setValue($event.source.value);
  }

    public getClassInfo($event:any) {   
     console.log($event.source.value); 
     this.className=$event.source.triggerValue;
    
     this.saveStudentForm.get("classId").setValue($event.source.value);
  }

  public getReligion($event:any) {   
     console.log($event.source.value); 
     this.religionName=$event.source.triggerValue;
    
     this.saveStudentForm.get("religionId").setValue($event.source.value);
  }

    public getBloodInfo($event:any) {   
    console.log($event.source.value);
    this.bloodGroupName=$event.source.triggerValue;
     this.saveStudentForm.get("bloodId").setValue($event.source.value);
  }

  
  public saveStudent(): void {
    let dateOfBirth = this._dataPipe.transform(this.saveStudentForm.get("dateOfBirth").value, "dd/MM/yyyy");      
   
    this.isSubmitted  =true;   
    this.baseUrl = "http://localhost:8000/schoolmanagement/student/saveStudent?studentName="+this.saveStudentForm.get("studentName").value+
                                                                  "&fatherName="+this.saveStudentForm.get("fatherName").value+
                                                                  "&motherName="+this.saveStudentForm.get("motherName").value+                                                               
                                                                   "&gender="+this.saveStudentForm.get("gender").value+                                                                                                                                   
                                                                   "&dateOfBirth="+dateOfBirth+
                                                                   "&classId="+ this.saveStudentForm.get("classId").value+   
                                                                   "&className="+this.className+ 
                                                                   "&religionId="+ this.saveStudentForm.get("religionId").value+       
                                                                   "&religionName="+this.religionName+                                              
                                                                   "&bloodId="+this.saveStudentForm.get("bloodId").value+   
                                                                   "&bloodGroupName="+this.bloodGroupName+                                                                 
                                                                   "&fatherMobileNumber="+this.saveStudentForm.get("fatherMobileNumber").value+
                                                                   "&motherMobileNumber="+this.saveStudentForm.get("motherMobileNumber").value+
                                                                   "&aadharCardNumber="+this.saveStudentForm.get("aadharCardNumber").value+  
                                                                   "&contactAddress="+this.saveStudentForm.get("contactAddress").value+  
                                                                   "&email="+this.saveStudentForm.get("email").value+            
                                                                   "&photoNumber="+this.saveStudentForm.get("photoNumber").value;

                                                                 
          
    
     
       this.studentService.saveStudent(this.baseUrl,this.selectedFile).subscribe(
      data => {
        console.log("After SaveStudent");
        console.log(data);
        this.isSubmitted =false;

         if (data != null) {
             this.showAlert("success","Student Details Saved Successfully");
             this.router.navigate(["/viewStudent"]);
         
        }

      },error => {
        this.isFlag=true;
        console.log(error);
        this.errorMessage = error.error.message
        this.showAlert("error",this.errorMessage);
        
      }
    );
     
   
   
  }
   

    /* public validateDateOfBirth():boolean{
     let isFlag=false;
    if(this.saveStudentForm.get("dateOfBirth").value!=null){
      
      let selectedBirthDate = this._dataPipe.transform(this.saveStudentForm.get("dateOfBirth").value, "dd/MM/yyyy"); 
      let currentDate=this._dataPipe.transform(new Date(), "dd/MM/yyyy");    
      
      alert("Date"+" "+selectedBirthDate+" "+currentDate);

      if (selectedBirthDate > currentDate ){                    
            isFlag=true;
            this.showAlert("info","BirthDate should not be greater than Current Date'");        
      
      }
      }
      return isFlag;
   
   
  }  */

   public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:5000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
   }


  selectFile(event: any) {
    const file = event.target.files.item(0);
    //alert("File chosent"+" "+file);

    if (file.type.match("image.*")) {
      var size = event.target.files[0].size;
      if (size > 1000000) {
        alert("size must not exceeds 1 MB");
        this.saveStudentForm.get("imageFileName").setValue("");
      } else {
        this.selectedFile = file;
       
      }
    } else {
      alert("invalid format!");
    }
  }
}
