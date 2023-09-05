import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { StoreService } from 'spotify-store';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
})
export class LoginRedirectComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private store: StoreService = inject(StoreService);

  constructor() {}

  ngOnInit() {
    
  }
}
