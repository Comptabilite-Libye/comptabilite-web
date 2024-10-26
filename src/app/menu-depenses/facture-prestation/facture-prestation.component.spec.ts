import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePrestationComponent } from './facture-prestation.component';

describe('FacturePrestationComponent', () => {
  let component: FacturePrestationComponent;
  let fixture: ComponentFixture<FacturePrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturePrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
