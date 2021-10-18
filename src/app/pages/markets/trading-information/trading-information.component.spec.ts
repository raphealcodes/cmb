import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingInformationComponent } from './trading-information.component';

describe('TradingInformationComponent', () => {
  let component: TradingInformationComponent;
  let fixture: ComponentFixture<TradingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
