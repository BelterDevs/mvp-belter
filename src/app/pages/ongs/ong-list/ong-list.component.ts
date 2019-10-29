import { Component, OnInit } from '@angular/core';

import { OngDetailsComponent } from '../ong-details/ong-details.component';

import { ModalProvider } from '../../../providers/modal.provider';

@Component({
  selector: 'app-ong-list',
  templateUrl: './ong-list.component.html'
})
export class OngListComponent implements OnInit {
  
  constructor(private modalProvider: ModalProvider){ }

  initLoginModal() {
    let inputs = {
      isMobile: false
    }
    this.modalProvider.init(OngDetailsComponent, inputs, {});
  }

  ngOnInit() {
  }

}
