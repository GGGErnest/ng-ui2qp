import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryParamsComponent } from './query-params.component';

describe('QueryParamsComponent', () => {
  let component: QueryParamsComponent;
  let fixture: ComponentFixture<QueryParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
