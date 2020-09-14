import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStarterRouteComponent } from './getting-starter-route.component';

describe('GettingStarterRouteComponent', () => {
  let component: GettingStarterRouteComponent;
  let fixture: ComponentFixture<GettingStarterRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingStarterRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStarterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
