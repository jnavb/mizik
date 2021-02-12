import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { WatchQueryResponse } from 'src/app/models/graphql-types';
import {
  personToItemDetail,
  speciesToItemDetail,
  specieToItemList
} from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { FetchEntityService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class SepeciesFetcher implements FetchEntityService {
  constructor(private apollo: ApolloWrapperService) {}

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
      QUERIES.list.species
    );
  }

  getDetailView(id: string) {
    return this.getDetail(id).pipe(
      map(result => ({
        ...result,
        data: result.data.species
          ? speciesToItemDetail(result.data.species)
          : null
      }))
    );
  }

  private getDetail(id: string) {
    return this.apollo.watchQuery<WatchQueryResponse<'species'>>(
      QUERIES.detail.species,
      id
    );
  }
}
