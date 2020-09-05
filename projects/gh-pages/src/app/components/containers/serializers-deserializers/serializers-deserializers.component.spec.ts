import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerializersDeserializersComponent } from './serializers-deserializers.component';

describe('SerializersDeserializersComponent', () => {
  let component: SerializersDeserializersComponent;
  let fixture: ComponentFixture<SerializersDeserializersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerializersDeserializersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerializersDeserializersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
