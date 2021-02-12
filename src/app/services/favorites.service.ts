import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entities, Id } from '../models/util-types';

export type Favorite = { id: Id; entity: Entities; title: string };
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSource = new BehaviorSubject<Map<Id, Favorite>>(new Map());

  favorites$ = this.favoritesSource.asObservable();

  constructor() {
    // const a = new Map([
    //   ['ZmlsbXM6Ng==', { id: 'ZmlsbXM6Ng==', entity: 'films' }],
    //   ['cGVvcGxlOjgx', { id: 'cGVvcGxlOjgx', entity: 'people' }],
    //   ['ZmlsbXM6MQ==', { id: 'ZmlsbXM6MQ==', entity: 'films' }],
    //   ['cGVvcGxlOjgy', { id: 'cGVvcGxlOjgy', entity: 'people' }],
    //   ['cGxhbmV0czo2MA==', { id: 'cGxhbmV0czo2MA==', entity: 'planets' }],
    //   ['ZmlsbXM6NQ==', { id: 'ZmlsbXM6NQ==', entity: 'films' }],
    //   ['cGxhbmV0czox', { id: 'cGxhbmV0czox', entity: 'planets' }],
    //   ['cGVvcGxlOjI=', { id: 'cGVvcGxlOjI=', entity: 'people' }]
    // ]);
    // this.favoritesSource.next(a as any);
  }

  toggle({ id, entity, title }: Favorite) {
    const map = this.favoritesSource.getValue();
    if (map.has(id)) {
      map.delete(id);
    } else {
      map.set(id, { entity, id, title });
    }

    this.favoritesSource.next(map);
  }
}
