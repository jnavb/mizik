import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Favorite, FavoritesService } from 'src/app/services/favorites.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { groupArrayBy } from 'src/app/utils/rxjs';

@Component({
  selector: 'mizik-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  favoritesByEntities$: Observable<{ key: string; values: Favorite[] }[]>;

  constructor(
    private favoritesService: FavoritesService,
    private nav: NavigationService
  ) {}

  ngOnInit() {
    this.favoritesByEntities$ = this.favoritesService.favorites$.pipe(
      map(a => Array.from(a.values())),
      switchMap(values => groupArrayBy<Favorite>(values, 'entity'))
    );
  }

  onFavorite({ id, entity }: Favorite) {
    this.nav.navigateForward([entity, id]);
  }
}
