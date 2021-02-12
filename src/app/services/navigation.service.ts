import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Routes } from '../models/routing';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private navController: NavController) {}

  navigateForward(url: Routes, options?: NavigationOptions): Promise<boolean> {
    return this.navController.navigateForward(url, options);
  }

  navigateBack(url: Routes, options?: NavigationOptions): Promise<boolean> {
    return this.navController.navigateBack(url, options);
  }
}
