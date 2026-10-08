import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetoRevisarCodigo } from './reto-revisar-codigo';

describe('RetoRevisarCodigo', () => {
  let component: RetoRevisarCodigo;
  let fixture: ComponentFixture<RetoRevisarCodigo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetoRevisarCodigo],
    }).compileComponents();

    fixture = TestBed.createComponent(RetoRevisarCodigo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
