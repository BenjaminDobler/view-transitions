import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './routes/album/album.component';
import { LoginRedirectComponent } from './routes/login-redirect/login-redirect.component';
import { HomeComponent } from './routes/home/home.component';
import { ArtistComponent } from './routes/artist/artist.component';
import { PlaylistComponent } from './routes/playlist/playlist.component';
import { SearchComponent } from './routes/search/search.component';


const routes: Routes = [
  { 
    path: 'home', 
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'album/:id',
    component: AlbumComponent
  },
  { 
    path: 'artist/:id', 
    pathMatch: 'full',
    component: ArtistComponent
  },
  { 
    path: 'playlist/:id', 
    pathMatch: 'full',
    component: PlaylistComponent
  },
  { 
    path: 'search', 
    pathMatch: 'full',
    component: SearchComponent
  },
  {
    path: 'login-redirect',
    component: LoginRedirectComponent
  }, 
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
