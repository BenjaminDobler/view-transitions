import { Component, inject } from '@angular/core';
import { StoreService } from 'spotify-store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public store: StoreService = inject(StoreService);


  public search(value: string) {
    this.store.search(value);
  }


}
