'use strict';

import { FormGroup } from '@angular/forms';

export const slugify = (text: string) => {
  return text.toLowerCase()
    .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
    .replace(/[èÈéÉêÊëË]+/g, 'e')       	// Special Characters #2
    .replace(/[ìÌíÍîÎïÏ]+/g, 'i')       	// Special Characters #3
    .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')       	// Special Characters #4
    .replace(/[ùÙúÚûÛüÜ]+/g, 'u')       	// Special Characters #5
    .replace(/[ýÝÿŸ]+/g, 'y')       		// Special Characters #6
    .replace(/[ñÑ]+/g, 'n')       			// Special Characters #7
    .replace(/[çÇ]+/g, 'c')       			// Special Characters #8
    .replace(/[ß]+/g, 'ss')       			// Special Characters #9
    .replace(/[Ææ]+/g, 'ae')       			// Special Characters #10
    .replace(/[Øøœ]+/g, 'oe')       		// Special Characters #11
    .replace(/[%]+/g, 'pct')       			// Special Characters #12
    .replace(/\s+/g, '-')           		// Replace spaces with -
    .replace(/[^\w\-]+/g, '')       		// Remove all non-word chars
    .replace(/\-\-+/g, '-')         		// Replace multiple - with single -
    .replace(/^-+/, '')             		// Trim - from start of text
    .replace(/-+$/, '');            		// Trim - from end of text
};

// custom validator to check that two fields match
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
  };
}
