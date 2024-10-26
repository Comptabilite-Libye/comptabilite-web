import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDepensesComponent } from './menu-depenses.component';

describe('MenuDepensesComponent', () => {
  let component: MenuDepensesComponent;
  let fixture: ComponentFixture<MenuDepensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDepensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDepensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
