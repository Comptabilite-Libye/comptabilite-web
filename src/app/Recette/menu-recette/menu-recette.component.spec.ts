import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecetteComponent } from './menu-recette.component';

describe('MenuRecetteComponent', () => {
  let component: MenuRecetteComponent;
  let fixture: ComponentFixture<MenuRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuRecetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
