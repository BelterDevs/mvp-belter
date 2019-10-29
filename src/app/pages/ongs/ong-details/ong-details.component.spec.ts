import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngDetailsComponent } from './ong-details.component';

describe('OngDetailsComponent', () => {
  let component: OngDetailsComponent;
  let fixture: ComponentFixture<OngDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
