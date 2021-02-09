import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderItemsListComponent } from './header-items-list/header-items-list.component';
import { IonicModule } from '@ionic/angular';
import { ItemListComponent } from '../item-list/item-list.component';
import { CardFlipComponent } from '../card-flip/card-flip.component';
import { EntityTitlecasePipe } from '../pipes/custom-titlecase.pipe';

@NgModule({
  declarations: [
    HeaderItemsListComponent,
    ItemListComponent,
    CardFlipComponent,
    EntityTitlecasePipe
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    HeaderItemsListComponent,
    ItemListComponent,
    CardFlipComponent,
    EntityTitlecasePipe
  ]
})
export class ComponentsModule {}
