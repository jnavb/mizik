import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { WatchQueryResponse } from 'src/app/models/graphql-types';
import { filmToItemList } from 'src/app/utils/mappers';
import { ApolloWrapper } from '../apollo-wrapper';
import { FetchEntityService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class FilmsFetcher implements FetchEntityService {
  constructor(private apollo: ApolloWrapper) {}

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
      QUERIES.LIST.FILMS
    );
  }
}
