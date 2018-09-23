import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Control6Component } from './control6.component';

describe('Control6Component', () => {
  let component: Control6Component;
  let fixture: ComponentFixture<Control6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Control6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Control6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
