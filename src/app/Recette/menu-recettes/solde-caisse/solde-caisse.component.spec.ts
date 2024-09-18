import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldeCaisseComponent } from './solde-caisse.component';

describe('SoldeCaisseComponent', () => {
  let component: SoldeCaisseComponent;
  let fixture: ComponentFixture<SoldeCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoldeCaisseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldeCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
