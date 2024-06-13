import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAutomotrizComponent } from './main-automotriz.component';

describe('MainAutomotrizComponent', () => {
  let component: MainAutomotrizComponent;
  let fixture: ComponentFixture<MainAutomotrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAutomotrizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAutomotrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
