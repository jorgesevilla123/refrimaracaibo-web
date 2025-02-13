import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomotrizCategoriesComponent } from './automotriz-categories.component';

describe('AutomotrizCategoriesComponent', () => {
  let component: AutomotrizCategoriesComponent;
  let fixture: ComponentFixture<AutomotrizCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomotrizCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomotrizCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
