import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecadoraCategoriesComponent } from './secadora-categories.component';

describe('SecadoraCategoriesComponent', () => {
  let component: SecadoraCategoriesComponent;
  let fixture: ComponentFixture<SecadoraCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecadoraCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecadoraCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
