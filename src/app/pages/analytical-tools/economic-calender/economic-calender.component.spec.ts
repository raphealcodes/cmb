import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicCalenderComponent } from './economic-calender.component';

describe('EconomicCalenderComponent', () => {
  let component: EconomicCalenderComponent;
  let fixture: ComponentFixture<EconomicCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
