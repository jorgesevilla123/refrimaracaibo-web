import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeveraCategoriesComponent } from './nevera-categories.component';

describe('NeveraCategoriesComponent', () => {
  let component: NeveraCategoriesComponent;
  let fixture: ComponentFixture<NeveraCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeveraCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeveraCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
