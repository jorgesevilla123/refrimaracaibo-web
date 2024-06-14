import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLavadoraComponent } from './main-lavadora.component';

describe('MainLavadoraComponent', () => {
  let component: MainLavadoraComponent;
  let fixture: ComponentFixture<MainLavadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLavadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLavadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
