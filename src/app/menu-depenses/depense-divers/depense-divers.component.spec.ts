import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseDiversComponent } from './depense-divers.component';

describe('DepenseDiversComponent', () => {
  let component: DepenseDiversComponent;
  let fixture: ComponentFixture<DepenseDiversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepenseDiversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepenseDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
