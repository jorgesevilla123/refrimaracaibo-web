import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecadoraSectionsComponent } from './secadora-sections.component';

describe('SecadoraSectionsComponent', () => {
  let component: SecadoraSectionsComponent;
  let fixture: ComponentFixture<SecadoraSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecadoraSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecadoraSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
