import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarSectionComponent } from './hogar-section.component';

describe('HogarSectionComponent', () => {
  let component: HogarSectionComponent;
  let fixture: ComponentFixture<HogarSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HogarSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HogarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
