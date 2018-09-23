import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPatientComponent } from './main-patient.component';

describe('MainPatientComponent', () => {
  let component: MainPatientComponent;
  let fixture: ComponentFixture<MainPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
