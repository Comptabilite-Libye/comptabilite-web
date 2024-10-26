import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementFacturePrestationComponent } from './reglement-facture-prestation.component';

describe('ReglementFacturePrestationComponent', () => {
  let component: ReglementFacturePrestationComponent;
  let fixture: ComponentFixture<ReglementFacturePrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReglementFacturePrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglementFacturePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
