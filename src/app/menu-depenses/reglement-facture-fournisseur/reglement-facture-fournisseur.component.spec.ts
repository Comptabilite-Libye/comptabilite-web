import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementFactureFournisseurComponent } from './reglement-facture-fournisseur.component';

describe('ReglementFactureFournisseurComponent', () => {
  let component: ReglementFactureFournisseurComponent;
  let fixture: ComponentFixture<ReglementFactureFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReglementFactureFournisseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglementFactureFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
