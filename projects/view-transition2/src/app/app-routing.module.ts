import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumOverviewComponent } from './routes/album-overview/album-overview.component';
import { AlbumDetailComponent } from './routes/album-detail/album-detail.component';

const routes: Routes = [
  {
    path: 'album-overview',
    pathMatch: 'full',
    component: AlbumOverviewComponent,
  },
  {
    path: 'album-detail/:id',
    component: AlbumDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'album-overview',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
