import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: ':entity/list',
    loadChildren: () =>
      import('./pages/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: ':entity/:id',
    data: { noReuse: true },
    loadChildren: () =>
      import('./pages/detail/detail.module').then(m => m.DetailPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorites/favorites.module').then(
        m => m.FavoritesPageModule
      )
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
