import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AireAcondicionadoSectionComponent } from './aire-acondicionado-section.component';

describe('AireAcondicionadoSectionComponent', () => {
  let component: AireAcondicionadoSectionComponent;
  let fixture: ComponentFixture<AireAcondicionadoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AireAcondicionadoSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AireAcondicionadoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
