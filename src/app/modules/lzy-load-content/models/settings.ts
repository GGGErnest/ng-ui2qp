export enum LoadStrategy {
  // Loading the elements when they get visible
  OnVisible,
  /* Using an number of loaded elements. The number is gonna be calculated
  as a percent of the number of visible elements in the view */
  PctOfVisibleElem,
  /* Loading a fixed lenght of element in advance plus the visible items in the viewport */
  AheadOfVisElem,
  /* Using an number of loaded elements. Is calculated using as reference
   the total number of elements to display. Can't be greater thant the lenght of list*/
  PctOfTotElem,
}

export enum UnloadStrategy {
  /* Don't temove the elements once they have been loaded */
  KeepLoaded,
  /* Unload the elements when they got out of the loaded elements' range in the view. This mode is gonna depend of the
  selected LoadingMode */
  LeavLoadedRange,
}

export interface Settings {
  loadStrategy: LoadStrategy;
  unloadStrategy: UnloadStrategy;
  /* setting used for the "PctOfTotElem" mode to calcula the percent of the elements want to be loaded
  the max value should be 1 that means the 100% of all elements*/
  percent?: number;
  /* Param used by them mode "PctOfVisibleElem" for define the number of items to be preload
  in addition of the element visibles*/
  factor?: number;
  /* this param is gonna be used by the Loading Modes "AmAhOfVisElem" and "TotalOfVisElem"
  so must be used with careful to fill the requirements of those modes */
  number?: number;
}
