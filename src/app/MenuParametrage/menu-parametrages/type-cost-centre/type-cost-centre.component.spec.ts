import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCostCentreComponent } from './type-cost-centre.component';

describe('TypeCostCentreComponent', () => {
  let component: TypeCostCentreComponent;
  let fixture: ComponentFixture<TypeCostCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeCostCentreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCostCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
