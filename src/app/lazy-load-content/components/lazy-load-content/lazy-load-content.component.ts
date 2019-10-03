import { AfterContentInit, Component, ContentChildren, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators';
import { LzyLoadItemDirective, LL_PRO_NAME } from '../../directives/lazy-load-item.directive';

@Component({
  selector: 'lzy-load-cont',
  templateUrl: './lazy-load-content.component.html',
  styleUrls: ['./lazy-load-content.component.css']
})
export class LzyLoadContComponent implements OnInit, AfterContentInit, OnDestroy {
  // IntersectionObserver settings
  observer: IntersectionObserver;
  IOOptions: { root: any, rootMargin: '0px', threshold: [0.1]};

  // Component fields
  isReady = false;
  preloadAmount = 0;
  preInBothDir = 0;
  scrollEvent = new Subject<void>();
  onResizeEvent = new Subject<void>();

  @Input() factor = 2;
  @Input() container: HTMLElement;
  @Input() unload = false;

  // Subscription that is gonna handle the unsubscribe to all the other subscriptions
  subscription = new Subscription();

  @ContentChildren(LzyLoadItemDirective, {descendants: true}) itemsIO: QueryList<LzyLoadItemDirective>;

  /*
  * Important note: Is required that the items marked as lazy-load-items using the "LazyLoadItemDirective"
  * are present in the template at the moment of the initialization of the component because the
  * ContentChildren query is evaluated just before the AfterContentInit life cicle,
  * if the items are being added dynamically later to the template then is possible that the parent of this component needs to run manualy
  * change detection to notify this component that the template has changed. Example of this case is in the cases-table in
  * gallery-management
  */
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}


  ngOnInit() {
    //  Initializing the IO options
    this.IOOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.1]
    };
    // If the container was passed then use it as a root for the IO
    if (this.container) {
      this.IOOptions.root = this.container;
    } else {
      // If the container input was not provided then use the self component as a container
      this.container = this.hostElement.nativeElement;
      this.IOOptions.root = this.container;
    }

    // Listening for scroll event in the container
    this.renderer.listen(this.container, 'scroll', () => {
        this.scrollEvent.next();
    });

    // subscribing to scroll events to preload the items that need to be
    // preload in both directions up and down of the current position
    // including 100 mil of debounce time
    this.subscription.add(this.scrollEvent.pipe(debounceTime(100)).subscribe(() => {
      this.updateVisibleAndPreloadItems();
    }));

    // Subscribint to the resize event and giving it a 300 miliseconds delay to prevent trigger this code too offten
    this.subscription.add(this.onResizeEvent.pipe(debounceTime(300)).subscribe(() => {
      // Getting the visible items
      const visibleItems = this.itemsIO.filter((item: LzyLoadItemDirective) => {
        return item.isVisible;
      });
      // Updating the settings after changing the viewport
      this.calSettings(visibleItems.length);
      // resetting the component after the change in the layout
      this.updateVisibleAndPreloadItems();
    }));
  }

  // Used for initialize the component settings
  initialize(): void {
    this.initializeIntersectionObs();
  }

  resetAndRecalculateSettings(): void {
    // Resetting the isReady variable to false that will trigger the initial calculations for the first
    // execution of the IO callback
    this.isReady =  false;
    // Disconnecting from the observer and its targets
    if (this.observer) {
      this.observer.disconnect();
    }
    // Initializing again the observer with the current elements
    this.initializeIntersectionObs();
  }

  ngAfterContentInit(): void {
    // Listening for changes in the elements
    this.subscription.add(this.itemsIO.changes.subscribe((changes) => {
        this.resetAndRecalculateSettings();
    }));
    // Initializing if are items to observe for
    if (this.itemsIO.length > 0) {
     this.initialize();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.subscription.unsubscribe();
  }

  // Calculate preload amounts
  private calSettings(visibleItemsCount: number) {
    // Recalculating the amount of preload elements depending the amount of visible items in the view
    this.preloadAmount = Math.ceil(this.factor * visibleItemsCount);
    // Calculating the amount of items to be load in both directions
    this.preInBothDir = Math.ceil(this.preloadAmount / 2);
  }

  // Initialize the IO and the targets to observe
  private initializeIntersectionObs() {
    // callback provided to the IO
    const ioCallBack = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      // differentiating between the first call to the function and the rest. The first is always gonna be
      // the initialization of all the targets
      if (!this.isReady) {
        let visibleElements = 0;
        // Updating the visibility of each element
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            visibleElements += 1;
            const itemElement = this.itemsIO.toArray()[entry.target[LL_PRO_NAME]];
            itemElement.isVisible = true;
          }
        });
        // Calculating the amount of preload elements depending the amount of visible items in the view
        this.preloadAmount = Math.ceil(this.factor * visibleElements);
        // Calculating the amount of items to be load in both directions
        this.preInBothDir = Math.ceil(this.preloadAmount / 2);

        // Preloading the items
        this.updateVisibleAndPreloadItems();

        // setting the ready state to true
        this.isReady = true;
      } else {
        // This code will be executed always after the first time

        // updating the visibility field of the items in the list
        entries.forEach((entry: IntersectionObserverEntry) => {
          // getting the element by getting its position on the list using the added property by the
          //  directive
          const itemElement = this.itemsIO.toArray()[entry.target[LL_PRO_NAME]];
          if (itemElement) {
            itemElement.isVisible = entry.isIntersecting;
          }
        });
      }
    };
    // Creating the observer
    this.observer = new IntersectionObserver(ioCallBack, this.IOOptions);
    // Registering the items with the observer
    this.itemsIO.forEach((item: LzyLoadItemDirective) => {
      this.observer.observe(item.hostElement.nativeElement);
    });
  }

  // calculate the new range of elements in the list that should be preload
  calPreloadRange(visibleItems: LzyLoadItemDirective[]): number[] {
    const newRange = [0, 0];
    // getting the range of current visible items
    const firstVisibleItem = visibleItems[0];
    const lastVisibleItem = visibleItems[visibleItems.length - 1];
    // Last item position in the array of items
    const lastItemPosInArray = (this.itemsIO.length - 1);
    // Setting the new start position to the current position menus the preload amount divided by two
    // in order to preload forward and in backward
    newRange[0] = firstVisibleItem.pos - this.preInBothDir;
    if (newRange[0] < 0) {
      newRange[0] = 0;
    }
    // If the new start pos is at the beginning of the array, means that we should preload forward only
    if (newRange[0] === 0) {
      // prefetching the elements ahead of the last visible item
      const newLastElementPos = lastVisibleItem.pos + this.preloadAmount;
      newRange[1] = (newLastElementPos >= lastItemPosInArray) ? lastItemPosInArray : newLastElementPos;
    } else {
      // pre-fetching the elements ahead and backward of the range of visible items
      newRange[1] = (lastVisibleItem.pos) >= lastItemPosInArray ? lastItemPosInArray
          : (lastVisibleItem.pos + this.preInBothDir);
    }
    return newRange;
  }

  // Function that calculate the current visible items and the ones that need to be preload
  updateVisibleAndPreloadItems() {
     //  Getting the current visible elements in the container
     const visibleItems = this.itemsIO.filter((item: LzyLoadItemDirective) => {
      return item.isVisible;
    });

    // if are not visible items, then do nothing
    if (visibleItems.length > 0) {
      // Calculating the elements should be preload
      const newRange = this.calPreloadRange(visibleItems);
      // Loading the content of the preload elements
      this.itemsIO.forEach((item: LzyLoadItemDirective, index) => {
        if (index >= newRange[0] && index <= newRange[1]) {
          item.loadContent = true;
        } else if (this.unload) {
          // unloading the elements that where load or preload if the unload property is set to true
          item.loadContent = false;
        }
      });
    }
  }

  // Listening to the resize event so we can recalculate the amount of visible items in the list and other
  // important properties that are use for the component
  @HostListener('window:resize', ['$event']) onResize($event) {
    this.onResizeEvent.next();
  }
}
