import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCategoriesComponent } from './categories.component';

describe('CheckboxCategoriesComponent', () => {
  let component: CheckboxCategoriesComponent;
  let fixture: ComponentFixture<CheckboxCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxCategoriesComponent],
    });
    fixture = TestBed.createComponent(CheckboxCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
