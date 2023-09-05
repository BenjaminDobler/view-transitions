import { Component, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { StoreService } from 'spotify-store';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss'],
})
export class AlbumDetailComponent {
  store = inject(StoreService);
  router = inject(Router);
  zone = inject(NgZone);

  albums = this.store.artistAlbums.pipe(
    map((album) => {
      let a = {...album};
      if (a && album) {
        a.items = album.items.filter(
          (item: any) => item.id !== this.store.album.getValue().id
        );
      }
      return a;
    })
  );

  async navigateBack() {
    console.log('navigate back 1');

    const doc = document as any;
    this.zone.runOutsideAngular(() => {
      doc.startViewTransition(async () => {
        this.zone.run(() => {
          console.log('navigate back');
          this.router.navigate(['/album-overview']);
        });
      });
    });
  }
}
