import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'; 
import * as $ from "jquery"; 


// Validar que sea distinto a 3 
export function other3(control: AbstractControl) {
  if (control.value == 3) {
      return {num: true} 
  }
  return null;
}

//Validar la mayoria de edad del usuario
export function is18YO(control: AbstractControl) {
  if (typeof control.value == 'string') {
    let parts: any = control.value.split('/');
    let SelDate = new Date(parts[2], parts[1] - 1, parts[0]);
    let PastDate = new Date();
    PastDate.setFullYear(PastDate.getFullYear() - 18);

    if (!(SelDate <= PastDate)) {
      return { is18YO: true };
    }

  }

  return null;
}

//Validar que el correo y la confirmacion de correo sean iguales
export function matchesEmails(control: AbstractControl) { 

  // let email = group.get('email').value;
  // let confirmEmail = group.get('confEmail').value; 
  // if(email !== confirmEmail){
  //   return { notSameEmail: true };
  // }

  // return null;
  if (typeof control.value == 'string') {
    if (!(control.value == ($('#input-email') as any).val())) {
      return { equals: true };
    }
  }

  return null;
}

// Validar que contenga al menos un numero
export function matchNum(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (!control.value.match(/\d/)
      || control.value.substr(1, 4) === ' BT' || control.value.substr(1, 3) === ' B'
      || control.value.substr(1, 4) === ' PT' || control.value.substr(1, 8) === ' USD IN'
      || control.value.substr(1, 8) === ' USD NA' || control.value.substr(1, 4) === ' EU') {
      return { num: true };
    }
  }
  return null;
}

//Validar que contenga al menos un caracter especial
export function matchEspec(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (!control.value.match(/\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\./)) {
      return { espec: true };
    }
  }

  return null;
}

//Validar que contenga solo un caracter especial
export function matchEspecJustOne(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (control.value.match(/\_|\-|\./)) {
      if (control.value.match(/^([._-])\1+$/) ) {
        return { espec: true };
      }
    }
    
  }

  return null;
}

//Validar que contenga al menos una minuscula
export function matchMinus(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (!control.value.match(/[a-z]/)) {
      return { minus: true };
    }

  }
  return null;
}

//Validar que contenga al menos una mayuscula
export function matchMayus(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (!control.value.match(/[A-Z]/)) {
      return { mayus: true };
    }
  }
  return null;
}

//validar que no contenga espacios 
export function matchSpace(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (!control.value.match(/\d/)) {
      return { space: true };
    }
  }
  return null;
}

//Validar que contenga al menos una mayuscula
export function matchFormat(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (control.value.match(/[^A-z0-9$!@#$%&*()_\-.\^]/)) {
      return { format: true };
    }
  }

  return null;
}

export function hasSpaces(control: AbstractControl) {
  if (typeof control.value == 'string') {
    if (control.value.match(/\s/)) {
      return { spaces: true };
    }
  }
  return null;
}

//Validar que la contraseña y la confirmacion de la contraseña sean iguales
export function matchesPass(control: AbstractControl) {
  if (!(control.value == ($('#input-password') as any).val())) {
    return { equals: true };
  }

  return null;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | any, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


//Validar que la contraseña y la confirmacion de la contraseña sean iguales
export function replaceFormat(control: AbstractControl) {
  let value = control.value;

  if (value != null) {
    value.toString().replace('.', '');     ///    1000,001
    value.toString().replace(',', '.');    ///    1000.001
  }

  if (value <= 0 || value == null) {
    return { wrongFormat: true }
  }

  return null;
}

//Validar que el nombre de usuario no tenga mas de 1 caracter especia
export function tooManySpcChar(control: AbstractControl) {
  if (typeof control.value == 'string') {
    let value = control.value;
    value.split('');
    let e = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i].match(/[_-]/)) {
        e++
      }
      if (e > 1) {
        return { manyChar: true }
      }
    }
  }

  return null;
}

export function mustHaveLetter(control: AbstractControl){
  if (typeof control.value == 'string') {
   if (!control.value.match(/[a-zA-z]/)) {
        return { letters : true };
   }
  }
  return null;
}


export function autocompleteValidator(validOptions:any) {  
  return (control: AbstractControl): { [key: string]: any } | null => {    
    if (validOptions.indexOf(control.value) !== -1) {
      return null  /* valid option selected */
    }
    return { valueNotExist: true }
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}


export function balanceValidator(Balance:any, comissionQuantity:any, currency:any, userChinchin ?: boolean) {  
  return (control: AbstractControl): { [key: string]: any } | null => { 
    let currencyMils = new RegExp(`[\.]`, 'g');
    let amount = control.value;
    if(typeof amount == 'string'){
      amount = control.value.replace(currencyMils,'');
      amount = amount.replaceAll(',','.');
      amount = Number(amount)
    }    
    let decimal;
    let comission;
    if(currency == 3){
      decimal = 8;
      comission =  amount * comissionQuantity
    } else {
      decimal = 2;
      comission =  amount * comissionQuantity 
    } 
    const Total = Balance - amount - comission;               
    if (Number(Total.toFixed(decimal)) >= 0) {
      return null;
    }
    
    return { notEnoughFunds: true }
  }
}

export function minimumValueBTC(control: AbstractControl) {
  let currencyMils = new RegExp(`[\.]`, 'g');
  let amount = control.value;
  if(typeof amount == 'string'){
    amount = control.value.replace(currencyMils,'');
    amount = amount.replaceAll(',','.');
    amount = Number(amount)
  }  
  if ((amount - 0.002 < 0) ) {
      return { minimunValue: true };
  }
  return null;
}

export function minimumValue(control: AbstractControl) {
  let currencyMils = new RegExp(`[\.]`, 'g');
  let amount = control.value;
  if(typeof amount == 'string'){
    amount = control.value.replace(currencyMils,'');
    amount = amount.replaceAll(',','.');
    amount = Number(amount)
  }    
  if ((amount == 0) ) {
      return { minimunValue: true };
  }
  return null;
}