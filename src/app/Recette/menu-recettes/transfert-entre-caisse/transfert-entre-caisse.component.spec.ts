import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertEntreCaisseComponent } from './transfert-entre-caisse.component';

describe('TransfertEntreCaisseComponent', () => {
  let component: TransfertEntreCaisseComponent;
  let fixture: ComponentFixture<TransfertEntreCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransfertEntreCaisseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfertEntreCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
