/*
 * Public API Surface of spotify-store
 */

import { InjectionToken } from '@angular/core';

export interface SpotifyStoreModuleOptions {
  clientID: string;
  clientSecret: string;
}

export var SPOTIFY_STORE_OPTIONS =
  new InjectionToken<SpotifyStoreModuleOptions>(
    'Options for the spotify store'
  );

export * from './lib/spotify-store.service';
