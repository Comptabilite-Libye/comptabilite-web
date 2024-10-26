import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDepenseComponent } from './categorie-depense.component';

describe('CategorieDepenseComponent', () => {
  let component: CategorieDepenseComponent;
  let fixture: ComponentFixture<CategorieDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorieDepenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
