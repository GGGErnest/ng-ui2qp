import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LzyLoadComponent } from './lzy-load.component';

describe('LzyLoadComponent', () => {
  let component: LzyLoadComponent;
  let fixture: ComponentFixture<LzyLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LzyLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LzyLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
