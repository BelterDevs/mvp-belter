import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { OngListComponent } from './pages/ongs/ong-list/ong-list.component';
import { OngComponent } from './pages/donation/ong/ong.component';
import { ValueComponent } from './pages/donation/value/value.component';
import { CongratulationsComponent } from './pages/donation/congratulations/congratulations.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ong-list', component: OngListComponent },
  { path: 'donation-ong', component: OngComponent },
  { path: 'donation-value/:slug', component: ValueComponent },
  { path: 'donation-congratulations', component: CongratulationsComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
