import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { TopBarLeftTemplateDirective } from './directives/top-bar-left-template.directive';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'gh-pages';
  isToTopBtnVisible = false;
  @ViewChild('container', {static: true}) container: ElementRef<HTMLDivElement>;
  subscriptions = new Subscription();

  @ViewChild(TopBarLeftTemplateDirective, {read: TemplateRef, static: false}) rightLogoTemplate: TemplateRef<TopBarLeftTemplateDirective>;

  constructor(private renderer2: Renderer2) {
  }

  ngOnInit() {
    const m = 'asdasd';
    if (m.length > 8) {
      console.log('asdas');
    }

    if (m.length < 1) {console.log('less'); }
    }

  ngAfterViewInit() {
    const scrollSubscription = fromEvent(this.container.nativeElement, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.isToTopBtnVisible = this.container.nativeElement.scrollTop > 500;
      });

    this.subscriptions.add(scrollSubscription);
  }

  goToTop() {
    this.renderer2.setProperty(this.container.nativeElement, 'scrollTop', 0);
  }

  ngOnDestroy() {

  }
}
