import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isPageInFavorites$: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isPageInFavorites$ = this.router.events.pipe(
      filter(r => r instanceof NavigationEnd),
      map(({ url }: NavigationEnd) => url),
      map(url => url.includes('favorites'))
    );
  }
}
