import { TestBed } from '@angular/core/testing';

import { SpotifyStoreService } from './spotify-store.service';

describe('SpotifyStoreService', () => {
  let service: SpotifyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
