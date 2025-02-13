import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientasSectionComponent } from './herramientas-section.component';

describe('HerramientasSectionComponent', () => {
  let component: HerramientasSectionComponent;
  let fixture: ComponentFixture<HerramientasSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientasSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerramientasSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
