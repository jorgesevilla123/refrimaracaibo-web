import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionTemplatesComponent } from './main-section-templates.component';

describe('MainSectionTemplatesComponent', () => {
  let component: MainSectionTemplatesComponent;
  let fixture: ComponentFixture<MainSectionTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSectionTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
