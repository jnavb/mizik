import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

@Injectable()
export class CustomRouteReuseStrategy extends IonicRouteStrategy {
  constructor() {
    super();
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    let shouldReuse = super.shouldReuseRoute(future, current);

    if (shouldReuse && current.data.noReuse) {
      shouldReuse = false;
    }

    return shouldReuse;
  }
}
