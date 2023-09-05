import { Component, inject } from '@angular/core';
import { StoreService } from 'spotify-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent {
  public store: StoreService = inject(StoreService);

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.store.loadArtist(id);
      // In a real app: dispatch action to load the details here.
    });
  }
}
