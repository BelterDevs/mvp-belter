import {Router} from '@angular/router';

import {Component, OnInit} from '@angular/core';

import {OngDetailsComponent} from '../../ongs/ong-details/ong-details.component';

import {ModalProvider} from '../../../providers/modal.provider';
import DataService from '../../../services/data.service';
import {slugify} from '../../../utils/helpers';

@Component({
  selector: 'app-ong-list',
  templateUrl: './ong-list.component.html'
})
export class OngListComponent implements OnInit {

  dataService: DataService;
  router: Router;

  constructor(private modalProvider: ModalProvider, dataService: DataService, router: Router) {
    this.dataService = dataService;
    this.router = router;
  }

  initLoginModal(data) {
    const inputs = {
      isMobile: false
    };
    this.dataService.setSelectedOng(data);
    this.modalProvider.init(OngDetailsComponent, inputs, {});
  }

  getList() {
    this.dataService.getOngs();
  }

  selectOng(data) {
    this.dataService.setSelectedOng(data);
    //this.router.navigate(['/donation-value'], data);
    this.router.navigate(['/donation-value', slugify(data.recipient.bankAccount.legalName)]);
  }

  ngOnInit() {
    this.getList();
  }

}
