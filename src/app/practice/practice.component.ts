import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Register } from '../models/register.model';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl 
  
} from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";


@Component({
  selector: "app-practice",
  templateUrl: "./practice.component.html",
  styleUrls: ["./practice.component.css"]
})
export class PracticeComponent implements OnInit {
  registerForm: FormGroup;
  selectedLanguages:string[]=[];
  public isSubmitted:boolean=false;
  emailPattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  LanguageArray = [
    { key: 'Tamil', value: 'Tamil' },
    { key: 'English', value: 'English' },
    { key: 'Arabic', value: 'Arabic' }
  ];
 
  registerModel: Register = new Register();
  constructor(private fb: FormBuilder,private dataPipe: DatePipe) {
     this.registerForm = this.fb.group({
     languagesKnown: this.fb.array([], this.minSelectedCheckboxes(1))
    });
    this.getFormGroup();  }

 
  ngOnInit() {}
 

  public getFormGroup(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,       
        Validators.pattern(/^[a-zA-Z\s.]*$/),  // allows letters, spaces, and dots
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.]*$/),  // allows letters, spaces, and dots
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      civilId: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]),
      dateOfBirth: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required,Validators.min(18),Validators.max(100)]),
      gender: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
     // languagesKnown: new FormControl("", [Validators.requiredTrue]),
      email: new FormControl("", [Validators.required,Validators.pattern(this.emailPattern)]),
      mobileNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
  }

  public get firstName() {
    return this.registerForm.get("firstName");
  }

  public get lastName() {
    return this.registerForm.get("lastName");
  }

  public get civilId() {
    return this.registerForm.get("civilId");
  }

  public get dateOfBirth() {
    return this.registerForm.get("dateOfBirth");
  }
  public get age() {
    return this.registerForm.get("age");
  }
  public get gender() {
    return this.registerForm.get("gender");
  }

  public get address() {
    return this.registerForm.get("address");
  }

  /*public get languagesKnown():FormArray {
    return this.registerForm.get("languagesKnown") as FormArray//
  }*/

  public get email() {
    return this.registerForm.get("email");
  }
  public get mobileNumber() {
    return this.registerForm.get("mobileNumber");
  }

  public genderSelect($event:any) {
   
     console.log($event.source.value);
      this.registerForm.get("gender").setValue($event.source.value);
  }


  minSelectedCheckboxes(min = 1) {
    return (formArray: FormArray) => {
      const totalSelected = formArray.controls.length;
      return totalSelected >= min ? null : { required: true };
    };
  }

 /* public getLanguages($event: any) {   
    
      if($event.checked){        
        this.selectedLanguages.push($event.source.value);
         this.count++;
        
      }
      
      else{       
          this.selectedLanguages.pop();
          this.count--;
      }    
      

  }*/
  
  
   onCheckboxChange($event: any) {
  const languagesKnown = this.registerForm.get('languagesKnown') as FormArray;

    if ($event.checked) {
      languagesKnown.push(this.fb.control($event.source.value));
    } else {
      const index = languagesKnown.controls.findIndex(x => x.value === $event.source.value);
      if (index !== -1) {
        languagesKnown.removeAt(index);
      }
    }
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  public register(): void {

   // let selectedBirthDate:string = this.dataPipe.transform(this.registerForm.get("dateOfBirth").value, "dd/MM/yyyy"); 
    //let currentDate=this.dataPipe.transform(new Date(), "dd/MM/yyyy");    
    //alert(selectedBirthDate+" "+currentDate);
  
   this.isSubmitted=true;
   if (this.registerForm.invalid) {
      return;
   }
     
     
    console.log(this.registerForm.value);
    this.registerModel=this.registerForm.value;
    console.log("After Assigning");
    this.registerModel.languagesKnown=this.selectedLanguages;
    //this.registerModel.dateOfBirth=selectedBirthDate;
    console.log(this.registerModel);
  }

  public clear() {
    this.isSubmitted = false;
    this.registerForm.reset();
  }
}
