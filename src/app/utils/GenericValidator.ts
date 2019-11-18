import {AbstractControl, Validators} from '@angular/forms';

export class GenericValidator {
  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
   */
  static isValidCpf() {
    //console.log('isValidCPF');
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return {cpfNotValid: true};
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          //console.log(result !== Number(digits.charAt(1)));

          if (result !== Number(digits.charAt(1))) {
            return {cpfNotValid: true};
          }

          return null;
        }

        return {cpfNotValid: true};
      }

      return null;
    };
  }

  static validateExpDate() {
    return (control: AbstractControl): Validators => {
      if (control.value.length !== 4) {
        return {expiration: true};
      }

      const v = control.value;
      const format = `${v[0]}${v[1]}/20${v[2]}${v[3]}}`;
      const value = format;

      if (Validators.required(control) !== undefined && Validators.required(control) !== null) {
        return {expiration: true};
      }

      if (typeof value !== 'undefined' && value.length >= 6) {
        let [month, year] = value.split(/[\s\/]+/, 2),
          prefix;

        if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
          prefix = new Date().getFullYear();
          prefix = prefix.toString().slice(0, 2);
          year = prefix + year;
        }
        month = parseInt(month, 10).toString();
        year = parseInt(year, 10).toString();

        // @ts-ignore
        if (/^\d+$/.test(month) && /^\d+$/.test(year) && (month >= 1 && month <= 12)) {
          let currentTime, expiry;
          expiry = new Date(Number(year), Number(month));
          currentTime = new Date();
          expiry.setMonth(expiry.getMonth() - 1);
          expiry.setMonth(expiry.getMonth() + 1, 1);

          if (expiry > currentTime) {
            return null;
          }
        }
      }

      return {expiration: true};
    };
  }
}
