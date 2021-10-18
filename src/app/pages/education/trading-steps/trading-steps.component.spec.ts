import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingStepsComponent } from './trading-steps.component';

describe('TradingStepsComponent', () => {
  let component: TradingStepsComponent;
  let fixture: ComponentFixture<TradingStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
