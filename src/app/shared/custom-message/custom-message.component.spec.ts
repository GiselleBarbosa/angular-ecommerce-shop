import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageComponent } from './custom-message.component';

describe('CustomMessageComponent', () => {
  let component: CustomMessageComponent;
  let fixture: ComponentFixture<CustomMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomMessageComponent],
    });
    fixture = TestBed.createComponent(CustomMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
