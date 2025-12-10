import { Component, OnInit,Inject  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
import { DatePipe } from "@angular/common";
import { DataService } from '../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Religion } from "../../models/religion.model";
@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  updateStudentForm: FormGroup;
  displayImage: SafeUrl;
  base64Image: string = "";
  student: Student;
  bloodGrp: BloodGroup[] = [];
  classDetail: ClassDetails;
  classDetil: ClassDetails[] = [];
  currentFileUpload: File;
  selectedFile: File;
  errorMessage:any=null;
  isFlag:boolean=false;
  isSubmitted:boolean = false;
  baseUrl:string;
  emailPattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  rowData:any;
  className:any;
  bloodGroupName:any;
  religionName:any;
  religionList: Religion[]=[];
  isEventAction:boolean=false;

  //displayImage:any;
  
  constructor(
    private router: Router,
    private studentService: StudentService,
    private masterService: MasterService,
    private dataService:DataService,
    private sanitizer: DomSanitizer,
    private _dataPipe: DatePipe,private snackBar: MatSnackBar,
    @Inject( MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<UpdateStudentComponent>
  ) {
    console.log("UpdateStudent Construcor loading");
    console.log(data);
    this.rowData=data;
   
    this.getFormGroup(); 
    this.getClassDetailList();
    this.getBloodGroupList();
    this.getReligionList();
    this.getRowData(this.rowData) ;  
    this.getImage(this.rowData) ;  
   
  }
   ngOnInit() {       
    
  }
 
  public getFormGroup(): void {
    this.updateStudentForm = new FormGroup({
      studentId: new FormControl({value:"", disabled: true}),
     
      studentName: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z s.]*$")
      ]),
      fatherName: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z s.]*$")
      ]),
      
        motherName: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z s.]*$")
      ]),

      gender: new FormControl("", [Validators.required]),
      religionId:new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required]),
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
      aadharCardNumber: new FormControl("", [Validators.required]),
      photoNumber: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.pattern(this.emailPattern)]),
      imageFileName: new FormControl("", [Validators.required]),
      //displayImage: new FormControl("")
    });
  }


  public get studentId(){
     return this.updateStudentForm.get('studentId');
  }
  public get studentName() {
    return this.updateStudentForm.get("studentName");
  }

  public get fatherName() {
    return this.updateStudentForm.get("fatherName");
  }
  
  public get motherName() {
    return this.updateStudentForm.get("motherName");
  }

  public get gender() {
    return this.updateStudentForm.get("gender");
  }
  public get religionId(){
    return this.updateStudentForm.get("religionId");
  }

  public get dateOfBirth() {
    return this.updateStudentForm.get("dateOfBirth");
  }

  public get aadharCardNumber() {
    return this.updateStudentForm.get("aadharCardNumber");
  }
  public get fatherMobileNumber() {
    return this.updateStudentForm.get("fatherMobileNumber");
  }

  public get motherMobileNumber() {
    return this.updateStudentForm.get("motherMobileNumber");
  }


  public get contactAddress() {
    return this.updateStudentForm.get("contactAddress");
  }

  public get bloodId() {
    return this.updateStudentForm.get("bloodId");
  }

  public get classId() {
    return this.updateStudentForm.get("classId");
  }

  public get photoNumber() {
    return this.updateStudentForm.get("photoNumber");
  }

   public get email() {
    return this.updateStudentForm.get("email");
  }

  public get imageFileName() {
    return this.updateStudentForm.get("imageFileName");
  }

   public getRowData(rowData:any):void{
      
     this.updateStudentForm.get("studentId").setValue(this.rowData.studentId);    
     this.updateStudentForm.get("studentName").setValue(this.rowData.studentName);
     this.updateStudentForm.get("fatherName").setValue(this.rowData.fatherName);
     this.updateStudentForm.get("motherName").setValue(this.rowData.motherName);
          
     
      if(this.rowData.dateOfBirth!=null){     
         let dob:any=new Date(this.rowData.dateOfBirth);                
          this.updateStudentForm.get("dateOfBirth").setValue(this._dataPipe.transform(dob, "yyyy-MM-dd"));                                                                     
                          
       }   

     this.updateStudentForm.get("gender").setValue(this.rowData.gender);
     this.updateStudentForm.get("classId").setValue(this.rowData.classId);
     this.updateStudentForm.get("bloodId").setValue(this.rowData.bloodId);
     this.updateStudentForm.get("fatherMobileNumber").setValue(this.rowData.fatherMobileNumber);
     this.updateStudentForm.get("motherMobileNumber").setValue(this.rowData.motherMobileNumber);
     this.updateStudentForm.get("contactAddress").setValue(this.rowData.contactAddress);
     this.updateStudentForm.get("religionId").setValue(this.rowData.religionId);

     this.updateStudentForm.get("aadharCardNumber").setValue(this.rowData.aadharCardNumber);

     this.updateStudentForm.get("photoNumber").setValue(this.rowData.photoNumber);
     this.updateStudentForm.get("email").setValue(this.rowData.email);  
  
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

  public getClassDetailList(): void {
    this.masterService.getClassDetailList().subscribe(
      data => {
        console.log(data);
         this.classDetil = data['content'];
      },
      error => console.log(error)
    );
  }

  public genderSelect(value:any) {
   
     console.log(value);  
     this.updateStudentForm.get("gender").setValue(value);
     
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

  public getReligion($event:any) {   
     console.log($event.source.value); 
     this.religionName=$event.source.triggerValue;
    
     this.updateStudentForm.get("religionId").setValue($event.source.value);
  }

    public getReligionithoutEvent():any{    
     let getClassObj=this.religionList.find(r=>r.religionId=== this.updateStudentForm.get("religionId").value);   
     this.religionName=getClassObj.religionName;        
     return this.className;     

   }

  
   public getClassInfo($event:any) {   
     console.log($event.source.value); 
     this.className=$event.source.triggerValue;
    
     this.updateStudentForm.get("classId").setValue($event.source.value);
  }

    public getClassNameWithoutEvent():any{    
     let getClassObj=this.classDetil.find(c=>c.classId=== this.updateStudentForm.get("classId").value);   
     this.className=getClassObj.className;        
     return this.className;     

   }

  public getBloodInfo($event:any) {   
    console.log($event.source.value);
    this.bloodGroupName=$event.source.triggerValue;
     this.updateStudentForm.get("bloodId").setValue($event.source.value);
  }

 public getBloodGroupNameWithoutEvent():any{
      let getBloodObject=this.bloodGrp.find(c=>c.bloodId=== this.updateStudentForm.get("bloodId").value);    
     this.bloodGroupName=getBloodObject.bloodGroupName;     
     this.bloodGroupName;    

   }

   public getImage(data:any):void{ 
   
     if(data!=null){   
      this.base64Image = 'data:image/jpeg;base64,'+data.studentImage.imageData;                
      this.displayImage = this.sanitizer.bypassSecurityTrustUrl(this.base64Image);          
      
      }
    

  }    


  

  
  public saveStudent(): void {
    let dateOfBirth = this._dataPipe.transform(this.updateStudentForm.get("dateOfBirth").value, "dd/MM/yyyy");  
    
    this.isSubmitted  =true;  
    
    if(this.isEventAction==false){
      this.getBloodGroupNameWithoutEvent();
      this.getClassNameWithoutEvent();
    }   


    this.baseUrl = "http://localhost:8000/schoolmanagement/student/updateStudent?studentId="+this.updateStudentForm.get("studentId").value+
                                                                   "&studentName="+this.updateStudentForm.get("studentName").value+
                                                                   "&fatherName="+this.updateStudentForm.get("fatherName").value+
                                                                   "&motherName="+this.updateStudentForm.get("motherName").value+         
                                                                   "&gender="+this.updateStudentForm.get("gender").value+                                                                                                                                   
                                                                   "&dateOfBirth="+dateOfBirth+
                                                                   "&classId="+ this.updateStudentForm.get("classId").value+                                                                    
                                                                   "&className="+this.className+  
                                                                   "&religionId="+ this.updateStudentForm.get("religionId").value+       
                                                                   "&religionName="+this.religionName+                                                                                                    
                                                                   "&bloodId="+this.updateStudentForm.get("bloodId").value+   
                                                                   "&bloodGroupName="+this.bloodGroupName+   
                                                                   "&fatherMobileNumber="+this.updateStudentForm.get("fatherMobileNumber").value+
                                                                   "&motherMobileNumber="+this.updateStudentForm.get("motherMobileNumber").value+
                                                                   "&contactAddress="+this.updateStudentForm.get("contactAddress").value+  
                                                                   "&email="+this.updateStudentForm.get("email").value+    
                                                                    "&aadharCardNumber="+this.updateStudentForm.get("aadharCardNumber").value+          
                                                                   "&photoNumber="+this.updateStudentForm.get("photoNumber").value;

                                                               
     
    this.studentService.saveStudent(this.baseUrl,this.selectedFile).subscribe(
      data => {
        console.log("After SaveStudent");
        console.log(data);
        this.isSubmitted =false;

         if (data != null) {
             this.showAlert("success","Student Details Updated Successfully");
            
            
         
        }

      },error => {
        this.isFlag=true;
        this.errorMessage = error.error.message;
        this.showAlert("error",this.errorMessage);
        
      }
    );
     
    }


 



     public validateDateOfBirth():void{

    if(this.updateStudentForm.get("dateOfBirth").value!=null){
 
    let selectedBirthDate = this._dataPipe.transform(this.updateStudentForm.get("dateOfBirth").value, "dd/MM/yyyy"); 
    let currentDate=this._dataPipe.transform(new Date(), "dd/MM/yyyy");    
    alert(selectedBirthDate+" "+currentDate);
    if (selectedBirthDate > currentDate )  {
                      

                this.showAlert("success","BirthDate should not be greater than Current Date'");
            
    
  }

    }
    else
    alert("provide dateofbirth ");
   
   
  }  

   public closeDialog(){    
    this.dialogRef.close();
    this.router.navigate(["/viewStudent"]);
    this.dataService.triggerRefresh();
     
  }

   public showAlert(message: string, action: string = 'Dismiss'){
     this.snackBar.open(message, action, {
        duration:5000, // Optional duration in milliseconds
        horizontalPosition: 'center', // Optional horizontal position
        verticalPosition: 'top', // Optional vertical position
      });
        this.closeDialog();
     
   }


  selectFile(event: any) {
    const file = event.target.files.item(0);
    //alert("File chosent"+" "+file);

    if (file.type.match("image.*")) {
      var size = event.target.files[0].size;
      if (size > 1000000) {
        alert("size must not exceeds 1 MB");
        this.updateStudentForm.get("imageFileName").setValue("");
      } else {
        this.selectedFile = file;
       
      }
    } else {
      alert("invalid format!");
    }
  }
}
