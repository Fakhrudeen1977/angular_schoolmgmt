import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavebloodgroupComponent } from './savebloodgroup.component';

describe('SavebloodgroupComponent', () => {
  let component: SavebloodgroupComponent;
  let fixture: ComponentFixture<SavebloodgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavebloodgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavebloodgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
