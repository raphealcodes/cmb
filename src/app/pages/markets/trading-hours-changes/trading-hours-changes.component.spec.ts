import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingHoursChangesComponent } from './trading-hours-changes.component';

describe('TradingHoursChangesComponent', () => {
  let component: TradingHoursChangesComponent;
  let fixture: ComponentFixture<TradingHoursChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingHoursChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingHoursChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
