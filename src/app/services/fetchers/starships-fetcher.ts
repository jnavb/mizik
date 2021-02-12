import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { WatchQueryResponse } from 'src/app/models/graphql-types';
import {
  starshipToItemDetail,
  starshipToItemList
} from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { FetchEntityService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class StarshipsFetcher implements FetchEntityService {
  constructor(private apollo: ApolloWrapperService) {}

  getListView() {
    return this.getList().pipe(
      map(result => ({
        ...result,
        data: result.data.allStarships?.starships?.map(starshipToItemList)
      }))
    );
  }

  private getList() {
    return this.apollo.watchQuery<WatchQueryResponse<'allStarships'>>(
      QUERIES.list.starships
    );
  }

  getDetailView(id: string) {
    return this.getDetail(id).pipe(
      map(result => ({
        ...result,
        data: result.data.starship
          ? starshipToItemDetail(result.data.starship)
          : null
      }))
    );
  }

  private getDetail(id: string) {
    return this.apollo.watchQuery<WatchQueryResponse<'starship'>>(
      QUERIES.detail.starships,
      id
    );
  }
}
