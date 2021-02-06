import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ItemListView } from '../item-list/item-list.component';
import { Entities } from '../models/util-types';
import { FetcherFactory } from '../services/fetchers/fetcher-factory';
import { capitalize } from '../utils/string';

export interface ItemList extends ItemListView {
  id: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  title$: Observable<string>;
  result$: Observable<ApolloQueryResult<ItemList[]>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entityFactory: FetcherFactory
  ) {}

  ngOnInit() {
    const onParamsChange$ = this.activatedRoute.params.pipe(
      map(({ entity }) => entity),
      filter<Entities>(Boolean)
    );

    this.title$ = onParamsChange$.pipe(map(entity => capitalize(entity)));
    this.result$ = onParamsChange$.pipe(
      switchMap(entity => this.entityFactory.getListView(entity))
    );
  }
}
