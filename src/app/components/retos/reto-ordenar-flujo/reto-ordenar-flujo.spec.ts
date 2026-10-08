import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetoOrdenarFlujo } from './reto-ordenar-flujo';

describe('RetoOrdenarFlujo', () => {
  let component: RetoOrdenarFlujo;
  let fixture: ComponentFixture<RetoOrdenarFlujo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetoOrdenarFlujo],
    }).compileComponents();

    fixture = TestBed.createComponent(RetoOrdenarFlujo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
