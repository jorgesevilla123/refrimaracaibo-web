import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCommercialRefriComponent } from './main-commercial-refri.component';

describe('MainCommercialRefriComponent', () => {
  let component: MainCommercialRefriComponent;
  let fixture: ComponentFixture<MainCommercialRefriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCommercialRefriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCommercialRefriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
