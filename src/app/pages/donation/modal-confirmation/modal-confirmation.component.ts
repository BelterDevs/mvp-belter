import { Component, OnInit } from '@angular/core';

import { ModalProvider } from '../../../providers/modal.provider';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

  constructor(private modalProvider: ModalProvider) { }

  public close() {
    this.modalProvider.destroy();
  }

  ngOnInit() {
  }

}
