import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderItemsListComponent } from './header-items-list/header-items-list.component';
import { IonicModule } from '@ionic/angular';
import { ItemListComponent } from './item-list/item-list.component';
import { CardFlipComponent } from './card-flip/card-flip.component';
import { EntityTitlecasePipe } from '../pipes/custom-titlecase.pipe';
import { FabLoveComponent } from './fab-love/fab-love.component';

@NgModule({
  declarations: [
    HeaderItemsListComponent,
    ItemListComponent,
    CardFlipComponent,
    EntityTitlecasePipe,
    FabLoveComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderItemsListComponent,
    ItemListComponent,
    CardFlipComponent,
    EntityTitlecasePipe,
    FabLoveComponent
  ]
})
export class ComponentsModule {}
