import { Component, OnInit } from '@angular/core';

import { OngDetailsComponent } from '../../ongs/ong-details/ong-details.component';

import { ModalProvider } from '../../../providers/modal.provider';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.component.html',
  //styleUrls: ['./ong.component.scss']
})
export class OngComponent implements OnInit {

  constructor(private modalProvider: ModalProvider) { }

  initLoginModal() {
    let inputs = {
      isMobile: false
    }
    this.modalProvider.init(OngDetailsComponent, inputs, {});
  }

  ngOnInit() {
  }

}
