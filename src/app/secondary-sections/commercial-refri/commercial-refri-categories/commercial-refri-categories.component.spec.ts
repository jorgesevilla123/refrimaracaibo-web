import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialRefriCategoriesComponent } from './commercial-refri-categories.component';

describe('CommercialRefriCategoriesComponent', () => {
  let component: CommercialRefriCategoriesComponent;
  let fixture: ComponentFixture<CommercialRefriCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialRefriCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialRefriCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
