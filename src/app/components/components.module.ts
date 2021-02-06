import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderItemsListComponent } from './header-items-list/header-items-list.component';
import { IonicModule } from '@ionic/angular';
import { ItemListComponent } from '../item-list/item-list.component';

@NgModule({
  declarations: [HeaderItemsListComponent, ItemListComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderItemsListComponent, ItemListComponent]
})
export class ComponentsModule {}
