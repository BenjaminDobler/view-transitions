import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input()
  identifier: string = '';

  @Input()
  public items: any;

  @Input()
  public label: string = '';

  @Input()
  public type: string = '';

  @Output()
  public select: EventEmitter<any> = new EventEmitter();

  setAlbumTransitionName(name: string) {
    const root = document.querySelector('body');
    if (root) {
      console.log('set property ', '--' + this.identifier + '-shared-transition  ', name);
      root.style.setProperty('--' + this.identifier + '-shared-transition', name);
    }
  }
}
