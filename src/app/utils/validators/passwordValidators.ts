import { AbstractControl, ValidationErrors } from '@angular/forms';




export function passwordValidators(control: AbstractControl): {[key: string]: boolean} | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password.pristine || confirmPassword.pristine) {
    return null;
  }

  return password && confirmPassword && password.value !== confirmPassword.value ? {'misMatch': true} : null;

}


export function  PasswordStrengthValidator(control: AbstractControl): ValidationErrors | null {

  const value: string = control.value || '';

  if (!value) {
    return null;
  }
  const upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `Password must atleast contain a capital letter` };
  }
  const numberCharacters = /[0-9]+/g;
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `Password must contain atleast a number` };
  }
  const specialCharacters = /[!@#$%^&.?]+/;
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `Password must contain atleast one special character` };
  }
  return null;
}
