import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStarterComponent } from './getting-starter.component';

describe('GettingStarterComponent', () => {
  let component: GettingStarterComponent;
  let fixture: ComponentFixture<GettingStarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingStarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
