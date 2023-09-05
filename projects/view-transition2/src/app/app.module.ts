import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumOverviewComponent } from './routes/album-overview/album-overview.component';
import { AlbumDetailComponent } from './routes/album-detail/album-detail.component';
import { SPOTIFY_STORE_OPTIONS } from 'spotify-store';
import { spotifyCredentials } from '../../../config/config';

@NgModule({
  declarations: [
    AppComponent,
    AlbumOverviewComponent,
    AlbumDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: SPOTIFY_STORE_OPTIONS, useValue: spotifyCredentials}],
  bootstrap: [AppComponent]
})
export class AppModule { }
