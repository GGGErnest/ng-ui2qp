import { Component, OnInit } from '@angular/core';
import { LoadStrategy, UnloadStrategy } from '../../../../../modules/lzy-load/models/settings';

@Component({
  selector: 'app-lzy-load',
  templateUrl: './lzy-load.component.html',
  styleUrls: ['./lzy-load.component.scss']
})
export class LzyLoadComponent implements OnInit {
  items = [];

  onvisibleAndKeepLoad = {
   loadStrategy: LoadStrategy.OnVisible,
   unloadStrategy: UnloadStrategy.LeavLoadedRange,
 };

  aheadOfVisibleAndLeavLoadedRange = {
   loadStrategy: LoadStrategy.AheadOfVisElem,
   unloadStrategy: UnloadStrategy.LeavLoadedRange,
   number: 10
 };

  pctOfTotElemAndKeepLoaded = {
   loadStrategy: LoadStrategy.PctOfTotElem,
   unloadStrategy: UnloadStrategy.KeepLoaded,
   percent: 1,
 };

 pctOfVisibleElemAndKeepLoaded = {
   loadStrategy: LoadStrategy.PctOfVisibleElem,
   unloadStrategy: UnloadStrategy.KeepLoaded,
   factor: 3,
 };

   constructor() {
       this.initializeItems();
   }

   ngOnInit() {
  }

 initializeItems() {
   for( let i = 0; i<100;i++){
     this.items.push({id:`Item #${i}`,imgSrc:'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'})
   }
  }
}
