import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { WatchQueryResponse } from 'src/app/models/graphql-types';
import { filmToItemDetail, filmToItemList } from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { FetchEntityService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class FilmsFetcher implements FetchEntityService {
  constructor(private apollo: ApolloWrapperService) {}

  getListView() {
    return this.getList().pipe(
      map(result => ({
        ...result,
        data: result.data.allFilms?.films?.map(filmToItemList)
      }))
    );
  }

  private getList() {
    return this.apollo.watchQuery<WatchQueryResponse<'allFilms'>>(
      QUERIES.list.films
    );
  }

  getDetailView(id: string) {
    return this.getDetail(id).pipe(
      map(result => ({
        ...result,
        data: result.data.film ? filmToItemDetail(result.data.film) : null
      }))
    );
  }

  private getDetail(id: string) {
    return this.apollo.watchQuery<WatchQueryResponse<'film'>>(
      QUERIES.detail.films,
      id
    );
  }
}
