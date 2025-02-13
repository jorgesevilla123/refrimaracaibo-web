import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNeveraComponent } from './main-nevera.component';

describe('MainNeveraComponent', () => {
  let component: MainNeveraComponent;
  let fixture: ComponentFixture<MainNeveraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNeveraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNeveraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
