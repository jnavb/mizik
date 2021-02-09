import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { NavController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { ItemListView } from '../item-list/item-list.component';
import { Entities } from '../models/util-types';
import { FetcherFactory } from '../services/fetchers/fetcher-factory';
import { capitalize } from '../utils/string';

export interface ItemList extends ItemListView {
  id: string;
  entity: Entities;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  title$: Observable<string>;
  back$: Observable<string>;
  result$: Observable<ApolloQueryResult<ItemList[]>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entityFactory: FetcherFactory,
    private nav: NavController,
    private platform: Platform
  ) {}

  ngOnInit() {
    const onParamsChange$ = this.activatedRoute.params.pipe(
      map(({ entity }) => entity),
      filter<Entities>(Boolean)
    );

    this.back$ = onParamsChange$.pipe(
      filter(() => this.platform.is('ios')),
      mapTo('Discover')
    );
    this.title$ = onParamsChange$.pipe(map(entity => capitalize(entity)));
    this.result$ = onParamsChange$.pipe(
      switchMap(entity => this.entityFactory.getListView(entity))
    );
  }

  onDetail(id: string) {
    const entity = this.activatedRoute.snapshot.params?.entity;
    this.nav.navigateForward([entity, id]);
  }
}
