import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRouteComponent } from './home-route.component';

describe('HomeRouteComponent', () => {
  let component: HomeRouteComponent;
  let fixture: ComponentFixture<HomeRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
