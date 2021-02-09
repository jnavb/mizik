import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { of, Subject } from 'rxjs';
import { delay, map, repeatWhen } from 'rxjs/operators';
import { trivias } from 'src/app/data/trivia';
import { Entities, Trivia } from '../../models/util-types';
import { pickRandom } from '../../utils/array';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  entities = Entities;
  discover = false;
  trivia$: Observable<Trivia>;
  repeat$ = new Subject();
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
    this.trivia$ = of(trivias).pipe(
      delay(200),
      repeatWhen(() => this.repeat$),
      map(trivias => pickRandom(trivias))
    );
  }

  onFront() {
    if (!this.discover) {
      this.discover = true;
    }
  }

  onRepeat() {
    this.discover = false;
    this.repeat$.next();
  }

  onEntityList(entity: Entities) {
    this.nav.navigateForward([entity, 'list']);
  }
}
