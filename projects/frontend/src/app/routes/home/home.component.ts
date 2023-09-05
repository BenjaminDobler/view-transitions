import { Component, NgZone, inject } from '@angular/core';
import { StoreService } from 'spotify-store';
import { Router } from '@angular/router';

const wait = (time: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log('resolved');
      resolve();
    }, time);
  });
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public store: StoreService = inject(StoreService);
  ngZone = inject(NgZone);
  router = inject(Router);

  navigate(args: any[]) {
    console.log('navigate ', args);
    this.ngZone.runOutsideAngular(() => {
      (document as any).startViewTransition(async () => {
        this.ngZone.run(async () => {
          this.router.navigate(args);
        });
        await wait(600);

      });
    });
  }
}
