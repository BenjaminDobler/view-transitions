import { Component, NgZone, inject } from '@angular/core';
import { StoreService } from 'spotify-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  albums: any[] = [];

  store: StoreService = inject(StoreService);
  ngZone = inject(NgZone);
  router = inject(Router);

  navigate(args: any[]) {
    console.log('yo');
    this.ngZone.runOutsideAngular(() => {
      (document as any).startViewTransition(() => {
        this.ngZone.run(() => {
          this.router.navigate(args);
        });
      });
    });
  }
  constructor() {}
}
