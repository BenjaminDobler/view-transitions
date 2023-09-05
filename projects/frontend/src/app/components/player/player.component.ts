import { Component, inject } from '@angular/core';
import { StoreService } from 'spotify-store';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  store: StoreService = inject(StoreService);
}
