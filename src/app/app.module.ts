import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { NgXCreditCardsModule } from 'ngx-credit-cards';

import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {OngListComponent} from './pages/ongs/ong-list/ong-list.component';
import {OngDetailsComponent} from './pages/ongs/ong-details/ong-details.component';
import {OngComponent} from './pages/donation/ong/ong.component';
import {ValueComponent} from './pages/donation/value/value.component';
import {CongratulationsComponent} from './pages/donation/congratulations/congratulations.component';
import {ModalConfirmationComponent} from './pages/donation/modal-confirmation/modal-confirmation.component';
import {ContactComponent} from './pages/contact/contact.component';

import {DomProvider} from './providers/dom.provider';
import {ModalProvider} from './providers/modal.provider';
import DataService from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    OngListComponent,
    OngDetailsComponent,
    OngComponent,
    ValueComponent,
    CongratulationsComponent,
    ModalConfirmationComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgXCreditCardsModule
  ],
  entryComponents: [
    OngDetailsComponent,
    ModalConfirmationComponent
  ],
  providers: [
    DomProvider,
    ModalProvider,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
