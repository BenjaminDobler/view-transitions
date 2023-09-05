import { Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Album,
  Artists,
  AuthorizationCodeWithPKCEStrategy,
  Page,
  RecentlyPlayedTracksPage,
  SimplifiedAlbum,
  SpotifyApi,
  TopTracksResult,
  User,
} from '@spotify/web-api-ts-sdk';
import { SPOTIFY_STORE_OPTIONS, SpotifyStoreModuleOptions } from '../public-api';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  player: any;
  deviceID: string | null = null;
  // albums: BehaviorSubject<AlbumItem[]> = new BehaviorSubject<AlbumItem[]>([]);
  album: BehaviorSubject<Partial<Album>> = new BehaviorSubject<Partial<Album>>(
    {}
  );
  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  recentTracks: BehaviorSubject<RecentlyPlayedTracksPage | null> =
    new BehaviorSubject<RecentlyPlayedTracksPage | null>(null);
  userTopArtists: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  artist: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  artistTopTracks: BehaviorSubject<TopTracksResult | null> =
    new BehaviorSubject<TopTracksResult | null>(null);
  artistRelatedArtists: BehaviorSubject<Artists | null> = new BehaviorSubject<
    any | Artists
  >(null);
  artistAlbums: BehaviorSubject<Page<SimplifiedAlbum> | null> =
    new BehaviorSubject<Page<SimplifiedAlbum> | null>(null);

  featuredPlaylist: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  searchResult: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  playlist: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  playerState: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  client_id: string;
  client_secret: string;
  public spotify: SpotifyApi | null = null;

  constructor(
    @Inject(SPOTIFY_STORE_OPTIONS) options: SpotifyStoreModuleOptions,
    private zone: NgZone
  ) {
    this.client_id = options.clientID;
    this.client_secret = options.clientSecret;
    console.log('options ', options);
    
    this.init();
  }

  async init() {
    let scopes = ['user-read-private', 'user-read-email', 'streaming'];
    let redirectUri = location.href;

    const implicitGrantStrategy = new AuthorizationCodeWithPKCEStrategy(
      this.client_id,
      redirectUri,
      [
        'user-read-private',
        'user-read-email',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-read-playback-state',
        'user-modify-playback-state',
        'streaming',
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-top-read',
        'user-follow-read',
        'user-follow-modify',
        'user-library-read',
        'user-library-modify',
      ]
    );
    this.spotify = new SpotifyApi(implicitGrantStrategy);
    const profile = await this.spotify.currentUser.profile();
    await this.initPlayer();

    this.player.addListener('player_state_changed', (data: any) => {
      console.log('Playback state ', data);
      this.zone.run(() => {
        this.playerState.next(data);
      });
    });

    this.user.next(profile);

    // const followedArtist = await this.spotify.currentUser.followedArtists();
    // this.userTopArtists.next(followedArtist);

    console.log(profile);

    const userPlaylists = await this.spotify.currentUser.playlists.playlists();
    console.log('user playlists ', userPlaylists);

    const userTopArtists = await this.spotify.currentUser.topItems('artists');
    const userTopTracks = await this.spotify.currentUser.topItems('tracks');
    // const savedAlbums = await this.spotify.currentUser.albums.savedAlbums();
    // console.log('saved albums ', savedAlbums);

    const featuredPlaylist = await this.spotify.browse.getFeaturedPlaylists();
    console.log('featured playlist ', featuredPlaylist);
    this.featuredPlaylist.next(featuredPlaylist);

    const userRecentlyPlayedTracks =
      await this.spotify.player.getRecentlyPlayedTracks();

    console.log('user top artists ', userTopArtists);
    console.log('user top tracks ', userTopTracks);
    console.log('user recently ', userRecentlyPlayedTracks);

    this.recentTracks.next(userRecentlyPlayedTracks);
    this.userTopArtists.next(userTopArtists);

    // await this.spotify.authenticate();
    // const albums = await this.spotify.getArtistAlbums('1w5Kfo2jwwIPruYS2UWh56');
    // this.albums.next(albums.items);
  }

  async playTrack(trackID: string) {
    await this.spotify?.player.addItemToPlaybackQueue(
      'spotify:track:' + trackID
    );
  }

  async loadAlbum(id: string) {
    const album = await this.spotify?.albums.get(id);
    if (album) {
      this.album.next(album);
    }
  }

  async loadArtist(artistID: string) {
    const artist = await this.spotify?.artists.get(artistID);
    const artistRelatedArtists = await this.spotify?.artists.relatedArtists(
      artistID
    );
    const artistTopTracks = await this.spotify?.artists.topTracks(
      artistID,
      'DE'
    );
    const artistAlbums = await this.spotify?.artists.albums(artistID);

    console.log(artistRelatedArtists);
    console.log(artistTopTracks);
    console.log(artistAlbums);

    if (artist && artistRelatedArtists && artistTopTracks && artistAlbums) {
      this.artist.next(artist);
      this.artistRelatedArtists.next(artistRelatedArtists);
      this.artistAlbums.next(artistAlbums);
      this.artistTopTracks.next(artistTopTracks);
    }
  }

  async loadPlaylist(playlistID: string) {
    const playlist = await this.spotify?.playlists.getPlaylist(playlistID);
    if (playlist) {
      console.log('playlist ', playlist);

      this.playlist.next(playlist);
    }
  }

  async search(query: string) {
    const searchResult = await this.spotify?.search(query, [
      'album',
      'artist',
      'playlist',
      'track',
    ]);
    this.searchResult.next(searchResult);
  }

  async playTrack2(trackId: string) {
    const accessToken = await this.spotify?.getAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + accessToken?.access_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: ['spotify:track:' + trackId],
      }),
    });

    const data = await response.json();
    return data;
  }

  initPlayer() {
    return new Promise<any>(async (resolve) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      const w = window as any;

      const accessToken = await this.spotify?.getAccessToken();
      console.log('access token ', accessToken);
      if (accessToken) {
        w.onSpotifyWebPlaybackSDKReady = () => {
          const player = new w.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: (cb: any) => {
              cb(accessToken.access_token);
            },
            volume: 0.5,
          });

          player.addListener('ready', (data: any) => {
            console.log('Ready with Device ID', data.device_id);
            this.deviceID = data.device_id;
            this.spotify?.player.transferPlayback([data.device_id]);
          });

          player.addListener('not_ready', (data: any) => {
            console.log('Device ID has gone offline', data.device_id);
          });

          player.connect();
          this.player = player;
          resolve(player);
        };
      }
    });
  }
}
