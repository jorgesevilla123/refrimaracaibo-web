import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomotrizSectionsComponent } from './automotriz-sections.component';

describe('AutomotrizSectionsComponent', () => {
  let component: AutomotrizSectionsComponent;
  let fixture: ComponentFixture<AutomotrizSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomotrizSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomotrizSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
