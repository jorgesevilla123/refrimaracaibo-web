import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavadoraMakeComponent } from './lavadora-make.component';

describe('LavadoraMakeComponent', () => {
  let component: LavadoraMakeComponent;
  let fixture: ComponentFixture<LavadoraMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavadoraMakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LavadoraMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
