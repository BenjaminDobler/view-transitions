import { Component, inject } from '@angular/core';
import { StoreService } from 'spotify-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {

  public store: StoreService = inject(StoreService);
  public route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.store.loadPlaylist(id);
      // In a real app: dispatch action to load the details here.
    });
  }
}
