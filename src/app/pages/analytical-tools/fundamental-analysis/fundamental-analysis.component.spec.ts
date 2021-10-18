import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalAnalysisComponent } from './fundamental-analysis.component';

describe('FundamentalAnalysisComponent', () => {
  let component: FundamentalAnalysisComponent;
  let fixture: ComponentFixture<FundamentalAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundamentalAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundamentalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
