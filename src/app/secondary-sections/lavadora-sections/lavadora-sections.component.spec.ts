import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavadoraSectionsComponent } from './lavadora-sections.component';

describe('LavadoraSectionsComponent', () => {
  let component: LavadoraSectionsComponent;
  let fixture: ComponentFixture<LavadoraSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavadoraSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LavadoraSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
