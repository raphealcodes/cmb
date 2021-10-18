/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mt4Component } from './mt4.component';

describe('Mt4Component', () => {
  let component: Mt4Component;
  let fixture: ComponentFixture<Mt4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mt4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mt4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
