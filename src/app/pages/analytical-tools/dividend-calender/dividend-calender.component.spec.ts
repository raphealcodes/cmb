import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendCalenderComponent } from './dividend-calender.component';

describe('DividendCalenderComponent', () => {
  let component: DividendCalenderComponent;
  let fixture: ComponentFixture<DividendCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
