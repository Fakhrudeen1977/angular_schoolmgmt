import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidatorService {

  static bloodGroupPattern: RegExp = /^(A|B|AB|O)[+-]$/;

  constructor() {

   }  

  // The blood group validator function
  static validBloodGroup(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;  // If the input is empty, we consider it valid
      }
      const isValidBloodGroup = CustomvalidatorService.bloodGroupPattern.test(control.value);
      return isValidBloodGroup ? null : { invalidBloodGroup: { value: control.value } };
    };
  }

     // The FutureDateValidator function
    static futuerDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;  // If the input is empty, we consider it valid
      }
      const selectedDate = new Date(control.value);
      const today=new Date();
      today.setHours(0,0,0,0);
      return selectedDate>today? {futureDate:true} :null}
    
  }


  static aadharValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    // Regex for basic Aadhaar number format: 12 digits, not starting with 0 or 1.
    // Accepts formats with or without spaces/hyphens after every 4 digits.
    const isValidFormat = /^[2-9]{1}[0-9]{3}[\s-]{0,1}[0-9]{4}[\s-]{0,1}[0-9]{4}$/.test(value);
    
    // Remove spaces/hyphens for Verhoeff check
    const cleanValue = value.replace(/[\s-]/g, ''); 

    // Use the Verhoeff check
    //const isValidChecksum = validateVerhoeff(cleanValue); // Assume this function is available

    //return isValidFormat && isValidChecksum ? null : { aadharInvalid: { value: control.value } };

    return isValidFormat  ? null : { aadharInvalid: { value: control.value } };
  }


}

}