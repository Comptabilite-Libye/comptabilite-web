import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxChangeComponent } from './taux-change.component';

describe('TauxChangeComponent', () => {
  let component: TauxChangeComponent;
  let fixture: ComponentFixture<TauxChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TauxChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TauxChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
