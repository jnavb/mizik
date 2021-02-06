import { Injectable } from '@angular/core';
import {
  ApolloQueryResult,
  DocumentNode,
  NetworkStatus
} from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { concat, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApolloWrapper {
  private initialState: ApolloQueryResult<unknown> = {
    data: {},
    loading: true,
    networkStatus: NetworkStatus.loading
  };

  constructor(private apollo: Apollo) {}

  watchQuery<T>(query: DocumentNode) {
    return concat(
      of(this.initialState as ApolloQueryResult<T>),
      this.apollo.watchQuery<T>({
        query
      }).valueChanges
    );
  }
}
