import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Platform } from '@ionic/angular';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { QParams } from 'src/app/models/routing';
import { Favorite, FavoritesService } from 'src/app/services/favorites.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Entities } from '../../models/util-types';
import { FetcherFactory } from '../../services/fetchers/fetcher-factory';
import { capitalize } from '../../utils/string';

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
@Component({
  selector: 'mizik-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit, OnDestroy {
  title$: Observable<string>;
  back$: Observable<string>;
  result$: Observable<ApolloQueryResult<ItemDetail>>;
  private favoriteToggle$ = new Subject<Favorite>();
  private destroy$ = new Subject();
  isFavorite = false;
  myCtrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entityFactory: FetcherFactory,
    private nav: NavigationService,
    private platform: Platform,
    private favoritesService: FavoritesService
  ) {}

  toggleFavorite({ id, entity, title }: ItemDetail) {
    this.isFavorite = !this.isFavorite;
    this.favoriteToggle$.next({ id, entity, title });
  }

  ngOnInit() {
    const onParamsChange$ = (this.activatedRoute
      .params as Observable<QParams>).pipe(
      filter(({ entity, id }) => Boolean(entity) && Boolean(id))
    );

    this.back$ = onParamsChange$.pipe(
      filter(() => this.platform.is('ios')),
      map(({ entity }) => capitalize(entity))
    );

    this.result$ = onParamsChange$.pipe(
      switchMap(({ entity, id }) =>
        this.entityFactory.getDetailView({ entity, id })
      )
    );

    this.title$ = this.result$.pipe(map(({ data }) => data?.title));

    combineLatest([onParamsChange$, this.favoritesService.favorites$])
      .pipe(
        map(([{ id, entity }, favorites]) => favorites.has(id)),
        takeUntil(this.destroy$)
      )
      .subscribe(isFavorite => (this.isFavorite = isFavorite));

    this.favoriteToggle$.pipe(takeUntil(this.destroy$)).subscribe(favorite => {
      this.favoritesService.toggle(favorite);
    });
  }

  onDetail({ entity, id }: { entity: Entities; id: string }) {
    this.nav.navigateForward([entity, id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
