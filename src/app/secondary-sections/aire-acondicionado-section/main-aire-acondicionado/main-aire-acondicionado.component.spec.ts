import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAireAcondicionadoComponent } from './main-aire-acondicionado.component';

describe('MainAireAcondicionadoComponent', () => {
  let component: MainAireAcondicionadoComponent;
  let fixture: ComponentFixture<MainAireAcondicionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAireAcondicionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAireAcondicionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
