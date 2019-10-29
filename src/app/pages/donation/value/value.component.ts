import { Component, OnInit } from '@angular/core';

import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';

import { ModalProvider } from '../../../providers/modal.provider';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class ValueComponent implements OnInit {

  constructor(private modalProvider: ModalProvider){ }

  initLoginModal() {
    let inputs = {
      isMobile: false
    }
    this.modalProvider.init(ModalConfirmationComponent, inputs, {});
  }

  ngOnInit() {
  }

}
