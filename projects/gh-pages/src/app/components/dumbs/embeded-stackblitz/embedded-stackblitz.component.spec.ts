import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedStackblitzComponent } from './embedded-stackblitz.component';

describe('EmbededStackblitzComponent', () => {
  let component: EmbeddedStackblitzComponent;
  let fixture: ComponentFixture<EmbeddedStackblitzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbeddedStackblitzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedStackblitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
