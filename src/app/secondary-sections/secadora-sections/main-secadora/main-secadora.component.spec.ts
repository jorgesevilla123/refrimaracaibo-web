import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSecadoraComponent } from './main-secadora.component';

describe('MainSecadoraComponent', () => {
  let component: MainSecadoraComponent;
  let fixture: ComponentFixture<MainSecadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSecadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSecadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
