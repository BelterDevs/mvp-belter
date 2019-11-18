import {Component} from '@angular/core';

import {ModalProvider} from '../../../providers/modal.provider';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ong-details',
  templateUrl: './ong-details.component.html'
})
export class OngDetailsComponent {

  dataService: DataService;

  constructor(private modalProvider: ModalProvider, dataService: DataService) {
    this.dataService = dataService;
  }

  public close() {
    this.modalProvider.destroy();
  }

}
