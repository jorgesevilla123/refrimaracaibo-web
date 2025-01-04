import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterToolbarComponent } from './register-toolbar.component';

describe('RegisterToolbarComponent', () => {
  let component: RegisterToolbarComponent;
  let fixture: ComponentFixture<RegisterToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
