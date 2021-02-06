import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { WatchQueryResponse } from 'src/app/models/graphql-types';
import { specieToItemList } from 'src/app/utils/mappers';
import { ApolloWrapper } from '../apollo-wrapper';
import { FetchEntityService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class SepeciesFetcher implements FetchEntityService {
  constructor(private apollo: ApolloWrapper) {}

  getListView() {
    return this.getList().pipe(
      map(result => ({
        ...result,
        data: result.data.allSpecies?.species?.map(specieToItemList)
      }))
    );
  }

  private getList() {
    return this.apollo.watchQuery<WatchQueryResponse<'allSpecies'>>(
      QUERIES.LIST.SPECIES
    );
  }
}
