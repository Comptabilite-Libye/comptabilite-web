import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionDepenseComponent } from './edition-depense.component';

describe('EditionDepenseComponent', () => {
  let component: EditionDepenseComponent;
  let fixture: ComponentFixture<EditionDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditionDepenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
