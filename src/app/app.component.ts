import { Component } from '@angular/core';

import { ModalProvider } from './providers/modal.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private modalProvider: ModalProvider) { }

  public close() {
    this.modalProvider.destroy();
  }
}
