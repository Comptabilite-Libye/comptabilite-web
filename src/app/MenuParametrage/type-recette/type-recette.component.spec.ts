import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRecetteComponent } from './type-recette.component';

describe('TypeRecetteComponent', () => {
  let component: TypeRecetteComponent;
  let fixture: ComponentFixture<TypeRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeRecetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
