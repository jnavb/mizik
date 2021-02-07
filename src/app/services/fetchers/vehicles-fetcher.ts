import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { WatchQueryResponse } from 'src/app/models/graphql-types';
import { vehicleToItemDetail, vehicleToItemList } from 'src/app/utils/mappers';
import { ApolloWrapper } from '../apollo-wrapper';
import { FetchEntityService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class VehiclesFetcher implements FetchEntityService {
  constructor(private apollo: ApolloWrapper) {}

  getListView() {
    return this.getList().pipe(
      map(result => ({
        ...result,
        data: result.data.allVehicles?.vehicles?.map(vehicleToItemList)
      }))
    );
  }

  private getList() {
    return this.apollo.watchQuery<WatchQueryResponse<'allVehicles'>>(
      QUERIES.list.vehicles
    );
  }

  getDetailView(id: string) {
    return this.getDetail(id).pipe(
      map(result => ({
        ...result,
        data: result.data.vehicle
          ? vehicleToItemDetail(result.data.vehicle)
          : null
      }))
    );
  }

  private getDetail(id: string) {
    return this.apollo.watchQuery<WatchQueryResponse<'vehicle'>>(
      QUERIES.detail.vehicles,
      id
    );
  }
}
