import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallmodalLoginComponent } from './smallmodal-login.component';

describe('SmallmodalLoginComponent', () => {
  let component: SmallmodalLoginComponent;
  let fixture: ComponentFixture<SmallmodalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallmodalLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallmodalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
