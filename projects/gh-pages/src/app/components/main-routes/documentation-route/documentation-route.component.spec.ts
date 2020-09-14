import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationRouteComponent } from './documentation-route.component';

describe('DocumentationRouteComponent', () => {
  let component: DocumentationRouteComponent;
  let fixture: ComponentFixture<DocumentationRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
