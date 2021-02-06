import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { Entities } from 'src/app/models/util-types';
import { ItemList } from '../../list/list.page';
import { FilmsFetcher } from './films-fetcher';
import { PeopleFetcher } from './people-fetcher';
import { SepeciesFetcher } from './species-fetcher';
import { VehiclesFetcher } from './vehicles-fetcher';
import { PlanetsFetcher } from './planets-fetcher';
import { StarshipsFetcher } from './starships-fetcher';

export interface FetchEntityService {
  getListView(): Observable<ApolloQueryResult<ItemList[]>>;
}

@Injectable({
  providedIn: 'root'
})
export class FetcherFactory {
  constructor(
    private peopleFetcher: PeopleFetcher,
    private filmsFetcher: FilmsFetcher,
    private vehiclesFetcher: VehiclesFetcher,
    private speciesFetcher: SepeciesFetcher,
    private planetsFetcher: PlanetsFetcher,
    private starshipsFetcher: StarshipsFetcher
  ) {}

  getListView(entity: Entities) {
    return this.getFetcher(entity).getListView();
  }

  private getFetcher(entity: Entities): FetchEntityService {
    switch (entity) {
      case Entities.FILMS:
        return this.filmsFetcher;
      case Entities.PEOPLE:
        return this.peopleFetcher;
      case Entities.VEHICLES:
        return this.vehiclesFetcher;
      case Entities.SPECIES:
        return this.speciesFetcher;
      case Entities.PLANETS:
        return this.planetsFetcher;
      case Entities.STARSHIPS:
        return this.starshipsFetcher;
      default:
        return this.filmsFetcher;
    }
  }
}
