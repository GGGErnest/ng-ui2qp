/*
  * Important note: Is required that the items marked as lazy-load-items using the "LazyLoadItemDirective"
  * are present in the template at the moment of the initialization of the component because the
  * ContentChildren query is evaluated just before the AfterContentInit life circle,
  * if the items are being added dynamically later to the template then is possible that the parent of this component needs to run manualy
  * change detection to notify this component that the template has changed. Example of this case is in the cases-table in
  * gallery-management
  */
 import { AfterContentInit, Component, ContentChildren,
  ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
 import { Subject, Subscription } from 'rxjs';
 import { debounceTime } from 'rxjs/internal/operators';
 import { LzyLoadItemDirective, LL_PRO_NAME } from '../../directives/lzy-load-item.directive';
 import { Settings, LoadStrategy, UnloadStrategy } from '../../models/settings';

 @Component({
  selector: 'lzy-load-cont',
  templateUrl: './lzy-load-content.component.html',
  styleUrls: ['./lzy-load-content.component.css']
})
export class LzyLoadContComponent implements OnInit, AfterContentInit, OnDestroy {
  // IntersectionObserver settings
  private observer: IntersectionObserver;
  private IOOptions: { root: any, rootMargin: '0px', threshold: [0.1]};

  // Component fields
  private init = false;
  private loadingRangeAmount = 0;
  private preloadAmo = 0;
  private scrollEvent = new Subject<void>();
  private onResizeEvent = new Subject<void>();

  // new properties
  private numOfVisiElem = 0;
  private loadedRange = [];

  @Input() settings: Settings = {
    loadStrategy: LoadStrategy.PctOfVisibleElem,
    unloadStrategy: UnloadStrategy.KeepLoaded,
    percent: 2
  };

  @Input() container: HTMLElement;
  // Subscription that is gonna handle the unsubscribe to all the other subscriptions
  subscription = new Subscription();

  @ContentChildren(LzyLoadItemDirective, {descendants: true}) itemsIO: QueryList<LzyLoadItemDirective>;

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}


  ngOnInit() {

    this.registerIO();

    this.initScroll();

    this.initScreenResizing();
  }

  private registerIO() {
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
  }

  private initScroll() {
    // Listening for scroll event in the container
    this.renderer.listen(this.container, 'scroll', () => {
      this.scrollEvent.next();
    });

    // subscribing to scroll events to preload the items that need to be
    // preload in both directions up and down of the current position
    // including 100 mil of debounce time
    this.subscription.add(this.scrollEvent.pipe(debounceTime(100)).subscribe(() => {
    this.updateLoadedElements();
    }));
  }

  private initScreenResizing() {
    // Subscribing to the resize event and giving it a 300 miliseconds delay to prevent trigger this code too offten
    this.subscription.add(this.onResizeEvent.pipe(debounceTime(300)).subscribe(() => {
      // Updating the settings after changing the viewport
      this.calSettings();
      // resetting the component after the change in the layout
      this.updateLoadedElements();
    }));
  }

  // Used for initialize the component settings
  initialize(): void {
    this.initializeIntersectionObs();
  }

  resetAndRecalculateSettings(): void {
    // Resetting the isReady variable to false that will trigger the initial calculations for the first
    // execution of the IO callback
    this.init =  false;
    // Disconnecting from the observer and its targets
    if (this.observer) {
      this.observer.disconnect();
    }
    // Initializing again the observer with the current elements
    this.initializeIntersectionObs();
  }

  ngAfterContentInit(): void {
    // Listening for changes in the elements
    this.subscription.add(this.itemsIO.changes.subscribe(() => {
        this.resetAndRecalculateSettings();
    }));
    // Initializing if are items to observe for
    if (this.itemsIO.length > 0) {
     this.initialize();
    }
  }

  // Calculate preload amounts
  private calSettings() {
    switch (this.settings.loadStrategy) {
        case LoadStrategy.AheadOfVisElem: {
          this.loadingRangeAmount = Math.ceil(this.settings.number + this.numOfVisiElem);
          // Calculating the amount of items to be load in both directions
          this.preloadAmo = this.settings.number;
          break;
        }
        case LoadStrategy.PctOfVisibleElem: {
          // Calculating the amount of preload elements depending of the amount of visible items in the view
          this.loadingRangeAmount = Math.ceil(this.settings.factor * this.numOfVisiElem);
          // Calculating the amount of items to be load in both directions
          this.preloadAmo = Math.ceil((this.loadingRangeAmount - this.numOfVisiElem) / 2);
          break;
        }
        case LoadStrategy.OnVisible: {
          this.loadingRangeAmount = this.numOfVisiElem;
          this.preloadAmo = 0;
          break;
        }
        case LoadStrategy.PctOfTotElem: {
          // Calculating the amount of preload elements depending of the amount of visible items in the view
          this.loadingRangeAmount = Math.ceil(this.settings.percent * this.itemsIO.length);
          // Calculating the amount of items to be load in both directions
          this.preloadAmo = Math.ceil((this.loadingRangeAmount - this.numOfVisiElem) / 2);
          break;
        }
      }
  }

  // loading the content
  private inLoadingRange(element: LzyLoadItemDirective) {
      element.loadContent = true;
  }

  // unloading the content
  private outOfLoadingRange(element: LzyLoadItemDirective) {
    if (this.settings.unloadStrategy === UnloadStrategy.LeavLoadedRange) {
        element.loadContent = false;
    }
  }

  // Calculate the amount of visible elements  that are in the exact moment and update the property in the component
  private getVisibleItems() {
    this.numOfVisiElem = this.itemsIO.filter((item: LzyLoadItemDirective) => {
      return item.isVisible;
    }).length;
    return this.numOfVisiElem;
  }

  // Initialize the IO and the targets to observe
  private initializeIntersectionObs() {

    // callback provided to the IO
    const ioCallBack = (entries: IntersectionObserverEntry[]) => {
      const updEntriesVisibility = () => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          // when an element is intersecting the view
          const itemElement = this.itemsIO.toArray()[entry.target[LL_PRO_NAME]];
          if (itemElement) {
            itemElement.isVisible = entry.isIntersecting;
          }
        });
      };
      // differentiating between the first call to the function and the rest. The first is always gonna be
      // the initialization of all the targets
      if (!this.init) {
        // Updating the visibility of each element
        updEntriesVisibility();
        // Calculating the amount of visible items and updating the property "visibleItemsAmo" for first time
        this.getVisibleItems();
        // calculating amount of visible items depending if the selected model for the component needs it
        this.calSettings();
        // Preloading the items
        this.updateLoadedElements();
        this.init = true;
      } else {
        // This code will be executed always after the first time
        // Updating the visibility of each element
        updEntriesVisibility();
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
  calLoadedRange(visibleItems: LzyLoadItemDirective[]): number[] {
    const newRange = [0, 0];
    // getting the range of current visible items
    const firstVisibleItem = visibleItems[0];
    const lastVisibleItem = visibleItems[visibleItems.length - 1];
    // Last item position in the array of items
    const lastItemPosInArray = (this.itemsIO.length - 1);
    // Setting the new start position to the current position menus the preload amount divided by two
    // in order to preload forward and in backward
    newRange[0] = Math.max(0, (firstVisibleItem.pos - this.preloadAmo));
    if (newRange[0] === 0) {
      // prefetching the elements ahead of the last visible item
      newRange[1] = Math.min(this.loadingRangeAmount, lastItemPosInArray);
    } else if ((lastVisibleItem.pos + this.preloadAmo) >= lastItemPosInArray) {
      // pre-fetching the elements ahead and backward of the range of visible items
      newRange[1] = lastItemPosInArray;
      newRange[0] =  Math.max(0, lastItemPosInArray - this.loadingRangeAmount);
    } else {
      newRange[1] =  (lastVisibleItem.pos + this.preloadAmo);
    }
    return newRange;
  }

  // Function that calculate the current visible items and the ones that need to be preload
  updateLoadedElements() {
     //  Getting the current visible elements in the container
     const visibleItems = this.itemsIO.filter((item: LzyLoadItemDirective) => {
      return item.isVisible;
    });

    // if are not visible items, then do nothing
     if (visibleItems.length > 0) {
      // Calculating the elements should be preload
      this.loadedRange = this.calLoadedRange(visibleItems);
      this.itemsIO.forEach((item: LzyLoadItemDirective, index) => {
        if (index >= this.loadedRange[0] && index <= this.loadedRange[1]) {
          // element within the loading range
          this.inLoadingRange(item);
        } else {
          // element out the loading range
          this.outOfLoadingRange(item);
        }
      });
    }
  }

  // Listening to the resize event so we can recalculate the amount of visible items in the list and other
  // important properties that are use for the component
  @HostListener('window:resize', []) onResize() {
    this.onResizeEvent.next();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.subscription.unsubscribe();
  }
}
