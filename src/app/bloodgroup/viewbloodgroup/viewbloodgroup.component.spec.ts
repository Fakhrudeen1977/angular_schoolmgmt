import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbloodgroupComponent } from './viewbloodgroup.component';

describe('ViewbloodgroupComponent', () => {
  let component: ViewbloodgroupComponent;
  let fixture: ComponentFixture<ViewbloodgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbloodgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbloodgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
