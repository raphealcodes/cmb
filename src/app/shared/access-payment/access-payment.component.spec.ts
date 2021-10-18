import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPaymentComponent } from './access-payment.component';

describe('AccessPaymentComponent', () => {
  let component: AccessPaymentComponent;
  let fixture: ComponentFixture<AccessPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
