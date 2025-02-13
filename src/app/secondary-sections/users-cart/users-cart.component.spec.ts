import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCartComponent } from './users-cart.component';

describe('UsersCartComponent', () => {
  let component: UsersCartComponent;
  let fixture: ComponentFixture<UsersCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
