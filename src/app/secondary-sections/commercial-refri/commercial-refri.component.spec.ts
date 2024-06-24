import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialRefriComponent } from './commercial-refri.component';

describe('CommercialRefriComponent', () => {
  let component: CommercialRefriComponent;
  let fixture: ComponentFixture<CommercialRefriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialRefriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialRefriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
