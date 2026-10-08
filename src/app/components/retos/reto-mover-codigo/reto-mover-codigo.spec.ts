import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetoMoverCodigo } from './reto-mover-codigo';

describe('RetoMoverCodigo', () => {
  let component: RetoMoverCodigo;
  let fixture: ComponentFixture<RetoMoverCodigo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetoMoverCodigo],
    }).compileComponents();

    fixture = TestBed.createComponent(RetoMoverCodigo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
