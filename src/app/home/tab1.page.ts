import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Root } from '../graphql/types';

export type GqlResult<T extends keyof Root> = Pick<Root, T>;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOpts = {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 8,
    freeMode: true,
    slidesOffsetBefore: 1,
    slidesOffsetAfter: 1
  };

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<GqlResult<'allFilms'>>({
        query: gql`
          {
            allFilms {
              films {
                title
              }
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        console.log(result.data);
        // this.rates = result?.data?.rates;
        // this.loading = result.loading;
        // this.error = result.error;
      });
  }
}
