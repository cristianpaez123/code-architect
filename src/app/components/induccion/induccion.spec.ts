import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Induccion } from './induccion';

describe('Induccion', () => {
  let component: Induccion;
  let fixture: ComponentFixture<Induccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Induccion],
    }).compileComponents();

    fixture = TestBed.createComponent(Induccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
