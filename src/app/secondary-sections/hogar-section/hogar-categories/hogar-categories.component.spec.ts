import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarCategoriesComponent } from './hogar-categories.component';

describe('HogarCategoriesComponent', () => {
  let component: HogarCategoriesComponent;
  let fixture: ComponentFixture<HogarCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HogarCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HogarCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
