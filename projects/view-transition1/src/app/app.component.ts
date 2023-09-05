import {
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  inject,
} from '@angular/core';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'view-transition1';

  zone = inject(NgZone);
  public items: any[] = [];

  @ViewChild('list', { static: false })
  list?: ElementRef<HTMLUListElement>;

  lastIncoming?: HTMLElement;
  ngAfterViewInit() {
    const targetNode = this.list?.nativeElement;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList: any, observer: any) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.');
          console.log(mutation.addedNodes);
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes[0].classList.add('incoming');
            this.lastIncoming = mutation.addedNodes[0];
          }

          if (mutation.removedNodes.length > 0) {
            mutation.removedNodes[0].classList.add('outgoing');
            // this.lastIncoming = mutation.addedNodes[0];
          }
        } else if (mutation.type === 'attributes') {
          console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    if (targetNode) {
      observer.observe(targetNode, config);
    }
  }

  removeItem(item: string) {
    const doc: any = document;

    const transition = doc.startViewTransition(async () => {
      this.zone.run(() => {

      this.items = this.items.filter((i) => i !== item);
      });
      await wait(6000);
    });
  }

  async addItem() {
    const doc: any = document;
    const transition = doc.startViewTransition(async () => {
      this.zone.run(() => {
        this.items = [...this.items, 'item' + (this.items.length + 1)];
        console.log('start transition');
      });
      // await wait(1000);
    });

    await transition.ready;
    console.log('transition ready');

    await transition.finished;
    console.log('transition finished');
    this.lastIncoming?.classList.remove('incoming');
  }
}
