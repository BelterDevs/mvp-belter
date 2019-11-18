import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ModalProvider} from '../../../providers/modal.provider';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

  dataService: DataService;
  el: ElementRef;
  @Input() isOpen = false;

  @Output() submitFormActionEvent = new EventEmitter<boolean>();
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private modalProvider: ModalProvider, dataService: DataService, el: ElementRef) {
    this.dataService = dataService;
    this.el = el;
  }

  public close() {
    this.closeModalEvent.emit(false);
  }

  ngOnInit() {}

  submitDonationForm() {
    this.submitFormActionEvent.emit(true);
  }
}
