import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngListComponent } from './ong-list.component';

describe('OngListComponent', () => {
  let component: OngListComponent;
  let fixture: ComponentFixture<OngListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
