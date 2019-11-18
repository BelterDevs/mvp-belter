import { Injectable } from '@angular/core';
import { DomProvider } from './dom.provider';

@Injectable()
export class ModalProvider {

  constructor(private domService: DomProvider) { }

private modalElementId = 'modal-container';
  private overlayElementId = 'overlay';

  init(component: any, inputs: object, outputs: object) {
    let componentConfig = {
      inputs:inputs,
      outputs:outputs
    }
    this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
    document.getElementById(this.modalElementId).className = 'show';
    document.getElementById(this.overlayElementId).className = 'show';
  }

  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.overlayElementId).className = 'hidden';
  }
}
