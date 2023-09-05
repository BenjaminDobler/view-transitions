import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'spotify-store';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {

  public store: StoreService = inject(StoreService);


  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.store.loadAlbum(id);
      // In a real app: dispatch action to load the details here.
    });
  }
}
