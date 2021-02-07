import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { trivias } from 'src/assets/info/trivia';
import { Entities, Trivia } from '../models/util-types';
import { pickRandom } from '../utils/array';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  entities = Entities;
  discover = false;
  trivia$: Observable<Trivia>;
  slideOpts = {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 0,
    freeMode: true,
    slidesOffsetBefore: 1,
    slidesOffsetAfter: 1
  };

  constructor(private nav: NavController) {}

  ngOnInit() {
    this.trivia$ = of(trivias).pipe(map(trivias => pickRandom(trivias)));
  }

  onEntityList(entity: Entities) {
    this.nav.navigateForward([entity, 'list']);
  }
}
