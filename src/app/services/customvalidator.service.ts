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

}
