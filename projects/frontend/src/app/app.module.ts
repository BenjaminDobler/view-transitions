import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './routes/album/album.component';
import { LoginRedirectComponent } from './routes/login-redirect/login-redirect.component';
import { HomeComponent } from './routes/home/home.component';
import { ArtistComponent } from './routes/artist/artist.component';
import { PlayerComponent } from './components/player/player.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PlaylistComponent } from './routes/playlist/playlist.component';
import { SearchComponent } from './routes/search/search.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { SPOTIFY_STORE_OPTIONS } from 'spotify-store';
import { spotifyCredentials } from 'projects/config/config';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    LoginRedirectComponent,
    HomeComponent,
    ArtistComponent,
    PlayerComponent,
    CarouselComponent,
    PlaylistComponent,
    SearchComponent,
    TracksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: SPOTIFY_STORE_OPTIONS, useValue: spotifyCredentials }],
  bootstrap: [AppComponent],
})
export class AppModule {}
