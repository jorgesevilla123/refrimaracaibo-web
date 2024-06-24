import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHogarComponent } from './main-hogar.component';

describe('MainHogarComponent', () => {
  let component: MainHogarComponent;
  let fixture: ComponentFixture<MainHogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHogarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
