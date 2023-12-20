import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthStepComponent } from './fourth-step.component';

describe('FourthStepComponent', () => {
  let component: FourthStepComponent;
  let fixture: ComponentFixture<FourthStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FourthStepComponent]
    });
    fixture = TestBed.createComponent(FourthStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
