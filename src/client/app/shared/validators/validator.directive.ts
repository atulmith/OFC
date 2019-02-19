import {FormControl} from '@angular/forms';
// import { Directive, forwardRef, Attribute } from '@angular/core';
// import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

// export function CustomValidator(max: Number): ValidatorFn {
export class CustomValidator{
    static isEmailValid(control:FormControl){
        if(control.value.indexOf('')>=0){

            var atpos = control.value.indexOf("@");
        var dotpos = control.value.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=control.value.length) {
            // alert("Not a valid e-mail address");
            return { isEmailValid: true };  
         }

        }
         return null;
            
    }
}

// import { AbstractControl, ValidatorFn } from '@angular/forms';
// @Directive({
//     selector: '[isEmailValid][formControlName],[isEmailValid][formControl],[isEmailValid][ngModel]',
//     providers: [
//         { provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomValidator), multi: true }
//     ]
// })
// export class CustomValidator implements Validator{
    
//     // constructor(@Attribute('validateEqual') public validateEqual: string,
//     // @Attribute('reverse') public reverse: string) {
//     // }
//     validate(control: AbstractControl): { [key: string]: any } {
//         if(control.value.indexOf('')>=0){

//             var atpos = control.value.indexOf("@");
//         var dotpos = control.value.lastIndexOf(".");
//         if (atpos<1 || dotpos<atpos+2 || dotpos+2>=control.value.length) {
//             // alert("Not a valid e-mail address");
//                return { isEmailValid: false };
//          }

//         }
//             return { isEmailValid: true };
        
//     }
// }