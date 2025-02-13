import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavadoraCategoriesComponent } from './lavadora-categories.component';

describe('LavadoraCategoriesComponent', () => {
  let component: LavadoraCategoriesComponent;
  let fixture: ComponentFixture<LavadoraCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavadoraCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LavadoraCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
