import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AireAcondicionadoCategoriesComponent } from './aire-acondicionado-categories.component';

describe('AireAcondicionadoCategoriesComponent', () => {
  let component: AireAcondicionadoCategoriesComponent;
  let fixture: ComponentFixture<AireAcondicionadoCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AireAcondicionadoCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AireAcondicionadoCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
