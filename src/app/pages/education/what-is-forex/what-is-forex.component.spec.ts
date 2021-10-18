import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsForexComponent } from './what-is-forex.component';

describe('WhatIsForexComponent', () => {
  let component: WhatIsForexComponent;
  let fixture: ComponentFixture<WhatIsForexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatIsForexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsForexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
