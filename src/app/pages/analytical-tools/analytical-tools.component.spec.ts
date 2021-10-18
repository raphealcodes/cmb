import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalToolsComponent } from './analytical-tools.component';

describe('AnalyticalToolsComponent', () => {
  let component: AnalyticalToolsComponent;
  let fixture: ComponentFixture<AnalyticalToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticalToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticalToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
