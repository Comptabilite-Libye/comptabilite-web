import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuParametragesComponent } from './menu-parametrages.component';

describe('MenuParametragesComponent', () => {
  let component: MenuParametragesComponent;
  let fixture: ComponentFixture<MenuParametragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuParametragesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuParametragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
