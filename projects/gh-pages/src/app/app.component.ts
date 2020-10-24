import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {TopBarLeftTemplateDirective} from './directives/top-bar-left-template.directive';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  isToTopBtnVisible = false;
  @ViewChild('container', {static: true}) container: ElementRef<HTMLDivElement>;
  subscriptions = new Subscription();

  @ViewChild(TopBarLeftTemplateDirective, {read: TemplateRef, static: false}) rightLogoTemplate: TemplateRef<TopBarLeftTemplateDirective>;

  constructor(private renderer2: Renderer2, private title: Title) {
    this.title.setTitle('ng-ui2qp');
  }

  ngAfterViewInit() {
    this.subscriptions.add(fromEvent(this.container.nativeElement, 'scroll').pipe(debounceTime(200)).subscribe(() => {
      this.isToTopBtnVisible = this.container.nativeElement.scrollTop > 500;
    }));
  }

  goToTop() {
    this.renderer2.setProperty(this.container.nativeElement, 'scrollTop', 0);
  }

  ngOnDestroy() {

  }
}
