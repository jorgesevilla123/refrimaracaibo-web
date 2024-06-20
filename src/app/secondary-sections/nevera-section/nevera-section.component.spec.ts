import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeveraSectionComponent } from './nevera-section.component';

describe('NeveraSectionComponent', () => {
  let component: NeveraSectionComponent;
  let fixture: ComponentFixture<NeveraSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeveraSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeveraSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
