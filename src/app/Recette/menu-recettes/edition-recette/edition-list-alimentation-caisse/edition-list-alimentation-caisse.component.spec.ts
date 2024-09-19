import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionListAlimentationCaisseComponent } from './edition-list-alimentation-caisse.component';

describe('EditionListAlimentationCaisseComponent', () => {
  let component: EditionListAlimentationCaisseComponent;
  let fixture: ComponentFixture<EditionListAlimentationCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditionListAlimentationCaisseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionListAlimentationCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
