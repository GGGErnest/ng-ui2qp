import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgQueryParamsRouteComponent } from './ng-query-params-route.component';

describe('NgQueryParamsRouteComponent', () => {
  let component: NgQueryParamsRouteComponent;
  let fixture: ComponentFixture<NgQueryParamsRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgQueryParamsRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgQueryParamsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
