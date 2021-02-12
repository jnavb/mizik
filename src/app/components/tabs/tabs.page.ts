import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'mizik-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isPageInFavorites$: Observable<boolean>;

  constructor(private router: Router, private nav: NavigationService) {}

  ngOnInit() {
    this.isPageInFavorites$ = this.router.events.pipe(
      filter(r => r instanceof NavigationEnd),
      map(({ url }: NavigationEnd) => url),
      map(url => url.includes('favorites'))
    );
  }

  onHome() {
    this.nav.navigateBack(['home']);
  }

  onFavorites() {
    this.nav.navigateForward(['favorites']);
  }
}
