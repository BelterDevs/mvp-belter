import {ActivatedRoute, ParamMap} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreditCardValidator} from 'ngx-credit-cards';
import * as Payment from 'payment';

Payment.fns.restrictNumeric = Payment.restrictNumeric;
Payment.fns.formatCardExpiry = Payment.formatCardExpiry;
Payment.fns.formatCardCVC = Payment.formatCardCVC;

import {ModalConfirmationComponent} from '../modal-confirmation/modal-confirmation.component';

import {ModalProvider} from '../../../providers/modal.provider';
import DataService from '../../../services/data.service';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html'
})
export class ValueComponent implements OnInit {

  private route: ActivatedRoute;
  dataService: DataService;
  donationValues = [10, 15, 20, 30, 50];
  registerForm: FormGroup;
  submitted = false;

  constructor(private modalProvider: ModalProvider, dataService: DataService, route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.dataService = dataService;
    this.route = route;
  }

  initLoginModal() {
    if (this.registerForm.invalid) {
      return;
    }

    const inputs = {
      isMobile: false
    };
    this.modalProvider.init(ModalConfirmationComponent, inputs, {});
  }

  selectDonationValue(option) {
    (document.getElementById('custom-donation-input') as HTMLInputElement).value = option.value;

    // document.querySelector('#custom-donation-input').value = ' ';
    this.dataService.setDonation(option);
    return option.value;
  }

  selectCustomDonationValue(value) {
    this.dataService.setDonation(value);
    return value;
  }

  isCustomDonation() {
    return !this.donationValues.includes(this.dataService.getData('donation').value);
  }

  setDonationCardNumber(option) {
    this.dataService.setDonation(option);

    return option.cardNumber;
  }

  setDonationExpiration(option) {
    console.log('setDonationExpiration', option);
    this.dataService.setDonation(option);

    return option.expiration;
  }

  setDonationCVV(option) {
    console.log('setDonationCVV', option);
    this.dataService.setDonation(option);

    return option.cvv;
  }

  setDonationOwnerName(option) {
    console.log('setDonationOwnerName', option);
    this.dataService.setDonation(option);

    return option.ownerName;
  }

  setDonationOwnerCPF(option) {
    console.log('setDonationOwnerCPF', option);
    this.dataService.setDonation(option);

    return option.ownerCPF;
  }

  ngOnInit() {
    if (this.dataService.getData('ongs').length === 0) {
      this.dataService.getOngs();
    }
    this.route.params.subscribe(params => {
      this.dataService.setSelectedOngBySlug(params.slug);
    });

    const rules = {
      value: ['', [Validators.required]],
      cardNumber: ['', [CreditCardValidator.validateCardNumber]],
      expiration: ['', [CreditCardValidator.validateCardExpiry]],
      cvv: ['', [CreditCardValidator.validateCardCvc]],
      ownerCPF: ['', [Validators.required]],
      ownerName: ['', [
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ]]
    };
    this.registerForm = this.formBuilder.group(rules);

    /*this.registerForm = this.formBuilder.group({
      value: ['', Validators.required],
      cardNumber: ['', CreditCardValidator],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerCPF: ['', Validators.required],
    });*/
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
