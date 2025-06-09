import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbloodgroupComponent } from './editbloodgroup.component';

describe('EditbloodgroupComponent', () => {
  let component: EditbloodgroupComponent;
  let fixture: ComponentFixture<EditbloodgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbloodgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbloodgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
