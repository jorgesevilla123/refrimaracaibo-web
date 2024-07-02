import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientasCategoriesComponent } from './herramientas-categories.component';

describe('HerramientasCategoriesComponent', () => {
  let component: HerramientasCategoriesComponent;
  let fixture: ComponentFixture<HerramientasCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientasCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerramientasCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
