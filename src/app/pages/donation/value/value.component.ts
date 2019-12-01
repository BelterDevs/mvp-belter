import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CreditCardValidators } from 'ngx-validators';
import { GenericValidator } from '../../../utils/GenericValidator';
import { slugify } from '../../../utils/helpers';
import { DataService } from 'src/app/services/data.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html'
})
export class ValueComponent implements OnInit {

  valor: any;
  form: FormGroup;
  disableTextbox = true;

  constructor(
    dataService: DataService,
    route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.dataService = dataService;
    this.route = route;
    this.router = router;
    this.form = new FormGroup({
      field: new FormControl('', CustomValidators.gt(10))
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  private route: ActivatedRoute;
  dataService: DataService;
  donationValues = [5, 10, 15, 20, 30, 50];
  registerForm: FormGroup;
  submitted = false;
  modalIsOpen = false;
  showModalError = false;

  isHidden: boolean = false;

  openModalConfirmation(open = true) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return false;
    }

    this.modalIsOpen = open;
  }

  openModalError(open = true) {
    this.showModalError = open;
  }

  selectDonationValue(option) {

    this.disableTextbox = true;

    (document.getElementById('custom-donation-input') as HTMLInputElement).value = option.value;

    this.dataService.setDonation(option);
    this.registerForm.controls.value.setValue(option.value);
    this.selectPlanByValue(option.value);

    return option.value;
  }

  selectPlanByValue(value) {
    const plans = this.dataService.resolvePlans(true).filter(plan => plan.amount === value);
    const selected = plans.length === 0 ? '443364' : plans[0].id;
    this.dataService.setDonation({ planId: selected });
  }

  selectCustomDonationValue(option) {

    this.disableTextbox = false;

    (document.getElementById('custom-donation-input') as HTMLInputElement).value = option.value;

    this.dataService.setDonation(option);
    this.selectPlanByValue(option);

    return option;

    // this.isHidden = true;
  }

  isCustomDonation() {
    return !this.donationValues.includes(this.dataService.getData('donation').value);
  }

  setDonationCardNumber(option) {
    this.dataService.setDonation(option);

    return option.cardNumber;
  }

  setDonationExpiration(option) {
    this.dataService.setDonation(option);

    return option.expiration;
  }

  setDonationCVV(option) {
    this.dataService.setDonation(option);

    return option.cvv;
  }

  setDonationOwnerName(option) {
    this.dataService.setDonation(option);

    return option.ownerName;
  }

  setDonationOwnerCPF(option) {
    this.dataService.setDonation(option);

    return option.ownerCPF;
  }

  setDonationEmail(option) {
    this.dataService.setDonation(option);
    return option.ownerEmail;
  }

  ngOnInit() {
    this.dataService.getPlans();

    if (this.dataService.getData('ongs').length === 0) {
      this.dataService.getOngs();
    }
    this.route.params.subscribe(params => {
      this.dataService.setSelectedOngBySlug(params.slug);
    });

    const rules = {
      ownerEmail: ['', Validators.compose([Validators.required, Validators.email])],
      value: ['', Validators.compose([Validators.required, Validators.min(1)])],
      cardNumber: ['', Validators.compose([Validators.required, CreditCardValidators.isCreditCard])],
      expiration: ['', Validators.compose([Validators.required, GenericValidator.validateExpDate()])],
      cvv: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+$'),
        Validators.minLength(3),
        Validators.maxLength(4)
      ])],
      ownerCPF: ['', Validators.compose([Validators.required, GenericValidator.isValidCpf()])],
      ownerName: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    };
    this.registerForm = this.formBuilder.group(rules);

    // this.fakeData();
  }

  onSubmit(evt?: any) {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return false;
    }
    this.dataService.postDonation()
      .then(response => {
        this.submitted = false;
        this.openModalConfirmation(false);
        this.redirectToCongratulation();
        this.resetForm();
      })
      .catch(error => {
        // mostrar mensagem de erro ?
        this.openModalConfirmation(false);
        this.openModalError(true);
      });

    return false;
  }

  redirectToCongratulation() {
    this.router.navigate(['donation-congratulations', slugify(this.dataService.getData('ong').recipient.bankAccount.legalName)]);
  }

  resetForm() {
    this.submitted = false;
    this.registerForm.reset();
  }

  fakeData() {
    // tslint:disable-next-line:one-variable-per-declaration
    const
      value = '5,00',
      cardNumber = '5211321553377981',
      expiration = '0520',
      cvv = '412',
      ownerEmail = 'suporte@belter.com',
      ownerName = 'Aardvark Silva',
      ownerCPF = '35965816804';

    this.registerForm.controls.value.setValue(value);
    this.registerForm.controls.cardNumber.setValue(cardNumber);
    this.registerForm.controls.expiration.setValue(expiration);
    this.registerForm.controls.cvv.setValue(cvv);
    this.registerForm.controls.ownerEmail.setValue(ownerEmail);
    this.registerForm.controls.ownerName.setValue(ownerName);
    this.registerForm.controls.ownerCPF.setValue(ownerCPF);

    this.dataService.setDonation({ value });
    this.dataService.setDonation({ cardNumber });
    this.dataService.setDonation({ expiration });
    this.dataService.setDonation({ ownerEmail });
    this.dataService.setDonation({ ownerName });
    this.dataService.setDonation({ ownerCPF });
    this.dataService.setDonation({ cvv });
  }

  resolvedPlans(needResolver = true) {
    return this.dataService.resolvePlans(needResolver);
  }
}
