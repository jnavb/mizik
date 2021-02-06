import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Entities } from '../models/util-types';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  entities = Entities;
  slideOpts = {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 0,
    freeMode: true,
    slidesOffsetBefore: 1,
    slidesOffsetAfter: 1
  };

  constructor(private nav: NavController) {}

  ngOnInit() {}

  onEntityList(entity: Entities) {
    this.nav.navigateForward([entity, 'list']);
  }
}
