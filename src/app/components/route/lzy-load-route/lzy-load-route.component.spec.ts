import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LzyLoadRouteComponent } from './lzy-load-route.component';

describe('LzLoadRouteComponent', () => {
  let component: LzyLoadRouteComponent;
  let fixture: ComponentFixture<LzyLoadRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LzyLoadRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LzyLoadRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
