import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { WatchQueryResponse } from 'src/app/models/graphql-types';
import { planetsToItemList } from 'src/app/utils/mappers';
import { ApolloWrapper } from '../apollo-wrapper';
import { FetchEntityService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class PlanetsFetcher implements FetchEntityService {
  constructor(private apollo: ApolloWrapper) {}

  getListView() {
    return this.getList().pipe(
      map(result => ({
        ...result,
        data: result.data.allPlanets?.planets?.map(planetsToItemList)
      }))
    );
  }

  private getList() {
    return this.apollo.watchQuery<WatchQueryResponse<'allPlanets'>>(
      QUERIES.LIST.PLANETS
    );
  }
}
