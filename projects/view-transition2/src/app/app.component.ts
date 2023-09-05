import { Component, inject } from '@angular/core';
import { StoreService } from 'spotify-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'view-transition2';

  store = inject(StoreService);

  constructor() {
    this.store.loadArtist('1w5Kfo2jwwIPruYS2UWh56');
  }
}
