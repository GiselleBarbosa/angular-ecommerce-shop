import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdStepComponent } from './third-step.component';

describe('ThirdStepComponent', () => {
  let component: ThirdStepComponent;
  let fixture: ComponentFixture<ThirdStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThirdStepComponent],
    });
    fixture = TestBed.createComponent(ThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
