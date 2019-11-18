import {Component, Input, OnInit} from '@angular/core';
import DataService from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

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
