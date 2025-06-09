import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavestudentComponent } from './savestudent.component';

describe('SavestudentComponent', () => {
  let component: SavestudentComponent;
  let fixture: ComponentFixture<SavestudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavestudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
