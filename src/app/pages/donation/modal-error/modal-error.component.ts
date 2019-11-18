import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ModalProvider} from '../../../providers/modal.provider';
import DataService from '../../../services/data.service';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {

  VALIDATION_ERROR_CODE = 422;
  SERVER_ERROR_CODE = 500;

  dataService: DataService;
  el: ElementRef;
  @Input() isOpen = false;
  @Input() code = 500;

  @Output() submitFormActionEvent = new EventEmitter<boolean>();
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(dataService: DataService, el: ElementRef) {
    this.dataService = dataService;
    this.el = el;
  }

  public close() {
    this.closeModalEvent.emit(false);
  }

  ngOnInit() {
  }

  submitDonationForm() {
    this.submitFormActionEvent.emit(true);
  }
}
