import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Entities } from '../models/util-types';
import { FetcherFactory } from '../services/fetchers/fetcher-factory';
import { capitalize } from '../utils/string';

export interface ItemDetail {
  id: string;
  entity: Entities;
  title: string;
  subtitle: string;
  img?: string;
  secondaryCard?: { label: string; value: string };
  info: { label: string; value: string | number }[];
  related: { id: string; entity: Entities; title: string; subtitle: string }[];
}

export interface Params {
  entity: Entities;
  id: string;
}
@Component({
  selector: 'mizik-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {
  title$: Observable<string>;
  back$: Observable<string>;
  result$: Observable<ApolloQueryResult<ItemDetail>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entityFactory: FetcherFactory,
    private nav: NavController
  ) {}

  ngOnInit() {
    const onParamsChange$ = (this.activatedRoute
      .params as Observable<Params>).pipe(
      filter(({ entity, id }) => Boolean(entity) && Boolean(id))
    );

    this.back$ = onParamsChange$.pipe(map(({ entity }) => capitalize(entity)));
    this.result$ = onParamsChange$.pipe(
      switchMap(({ entity, id }) =>
        this.entityFactory.getDetailView({ entity, id })
      )
    );

    this.title$ = this.result$.pipe(map(({ data }) => data?.title));
  }

  onDetail({ entity, id }: { entity: Entities; id: string }) {
    this.nav.navigateForward([entity, id]);
  }
}
