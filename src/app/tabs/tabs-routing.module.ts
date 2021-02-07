import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../favorites/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: ':entity/list',
        loadChildren: () =>
          import('../list/list.module').then(m => m.ListPageModule)
      },
      {
        path: ':entity/:id',
        data: { noReuse: true },
        loadChildren: () =>
          import('../detail/detail.module').then(m => m.DetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
