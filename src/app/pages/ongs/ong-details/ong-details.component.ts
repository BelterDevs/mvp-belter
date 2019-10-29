import { Component } from '@angular/core';

import { ModalProvider } from '../../../providers/modal.provider';

@Component({
  selector: 'app-ong-details',
  templateUrl: './ong-details.component.html'
})
export class OngDetailsComponent {

  constructor(private modalProvider: ModalProvider) { }

  public close() {
    this.modalProvider.destroy();
  }

}
