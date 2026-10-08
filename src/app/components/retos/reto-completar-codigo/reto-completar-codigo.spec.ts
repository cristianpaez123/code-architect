import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetoCompletarCodigo } from './reto-completar-codigo';

describe('RetoCompletarCodigo', () => {
  let component: RetoCompletarCodigo;
  let fixture: ComponentFixture<RetoCompletarCodigo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetoCompletarCodigo],
    }).compileComponents();

    fixture = TestBed.createComponent(RetoCompletarCodigo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
