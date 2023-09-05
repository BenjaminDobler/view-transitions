import { Component, Input } from '@angular/core';
import { Page, PlaylistedTrack, Track, Tracks } from '@spotify/web-api-ts-sdk';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent {
  @Input()
  tracks: Page<PlaylistedTrack> | null = null;

  constructor() {
    // this.tracks?.items[0].track.
  }
}
