import {Component, Input, OnInit, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {

  constructor(public dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    setTimeout(() => {
      const element = document.querySelector('body');
      element.scrollIntoView();
    }, 500);

    if (this.dataService.getData('ongs').length === 0) {
      this.dataService.getOngs();
    }
    this.route.params.subscribe(params => {
      this.dataService.setSelectedOngBySlug(params.slug);
    });
  }

}
