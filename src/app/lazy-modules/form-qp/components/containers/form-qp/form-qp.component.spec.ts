import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQpComponent } from './form-qp.component';

describe('FormQpComponent', () => {
  let component: FormQpComponent;
  let fixture: ComponentFixture<FormQpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
