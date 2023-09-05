import { Component, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'spotify-store';


const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
@Component({
  selector: 'app-album-overview',
  templateUrl: './album-overview.component.html',
  styleUrls: ['./album-overview.component.scss'],
})
export class AlbumOverviewComponent {
  store = inject(StoreService);
  router = inject(Router);
  zone = inject(NgZone);

  async selectAlbum(album: any) {
    await this.store.loadAlbum(album.id);
    const doc = document as any;
    this.zone.runOutsideAngular(() => {
      doc.startViewTransition(async () => {
        this.zone.run(() => {
          this.router.navigate(['album-detail', album.id]);
        });
        await wait(200);
      });
    });
  }

  hoverAlbum(album: any) {
    document.body.style.setProperty('--album-cover', 'transition-' + album.id);
  }
}
