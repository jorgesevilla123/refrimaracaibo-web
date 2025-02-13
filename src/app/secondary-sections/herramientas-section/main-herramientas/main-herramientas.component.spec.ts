import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHerramientasComponent } from './main-herramientas.component';

describe('MainHerramientasComponent', () => {
  let component: MainHerramientasComponent;
  let fixture: ComponentFixture<MainHerramientasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainHerramientasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainHerramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
