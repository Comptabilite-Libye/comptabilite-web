import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecettesComponent } from './menu-recettes.component';

describe('MenuRecettesComponent', () => {
  let component: MenuRecettesComponent;
  let fixture: ComponentFixture<MenuRecettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuRecettesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
