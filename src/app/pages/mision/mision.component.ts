import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JuegoService } from '../../services/juego.service';
import { Progreso } from '../../models/progreso.model';
import { DIFICULTAD_NIVEL, DIFICULTAD_TEXTO, MisionInfo, Reto, TIPO_TEXTO } from '../../models/reto.model';
import { Induccion } from '../../components/induccion/induccion';
import { Mentor } from '../../components/mentor/mentor';
import { RetoMoverCodigo } from '../../components/retos/reto-mover-codigo/reto-mover-codigo';
import { RetoOrdenarFlujoComponent } from '../../components/retos/reto-ordenar-flujo/reto-ordenar-flujo';
import { RetoRevisarCodigo } from '../../components/retos/reto-revisar-codigo/reto-revisar-codigo';
import { RetoCompletarCodigo } from '../../components/retos/reto-completar-codigo/reto-completar-codigo';

type Fase = 'induccion' | 'jugando' | 'completado';

/**
 * Página contenedora de un reto.
 * Controla las fases: inducción → jugando → completado,
 * las ayudas del Mentor y el cálculo de puntos.
 * Cada mecánica (componente en components/retos) solo se encarga de su interacción.
 */
@Component({
  selector: 'app-mision',
  imports: [RouterLink, Induccion, Mentor, RetoMoverCodigo, 
    RetoOrdenarFlujoComponent, RetoRevisarCodigo, RetoCompletarCodigo],
  templateUrl: './mision.component.html',
  styleUrl: './mision.component.css',
})
export class MisionComponent {
  // Reglas de puntaje (en porcentaje)
  readonly DESCUENTO_PISTA = 10;
  readonly DESCUENTO_SOLUCION = 50;
  readonly PORCENTAJE_MINIMO = 30;

  reto: Reto | undefined;
  mision: MisionInfo | undefined;
  progreso: Progreso;

  fase: Fase = 'induccion';
  repasando = false;

  pistasUsadas = 0;
  solucionUsada = false;
  puntosObtenidos = 0;

  /** Si el reto ya estaba completado, se puede repetir pero no suma puntos otra vez. */
  esRepeticion = false;

  dificultadTexto = DIFICULTAD_TEXTO;
  dificultadNivel = DIFICULTAD_NIVEL;
  tipoTexto = TIPO_TEXTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private juegoService: JuegoService
  ) {
    this.progreso = this.juegoService.obtenerProgreso();

    // Se escucha el parámetro :id para que "Siguiente reto" recargue la página
    this.route.paramMap.subscribe(parametros => {
      this.cargarReto(Number(parametros.get('id')));
    });
  }

  private cargarReto(id: number): void {
    const reto = this.juegoService.obtenerReto(id);
    const estado = this.juegoService.obtenerEstadoReto(id);

    // No se puede entrar por URL a un reto que no existe o que está bloqueado
    if (!reto || estado === 'bloqueado') {
      this.router.navigate(['/mapa']);
      return;
    }

    this.reto = reto;
    this.mision = this.juegoService.obtenerMision(reto.misionId);
    this.esRepeticion = estado === 'completado';

    // Se reinicia el estado de la página
    this.fase = 'induccion';
    this.repasando = false;
    this.pistasUsadas = 0;
    this.solucionUsada = false;
    this.puntosObtenidos = 0;
  }

  // ---------- Puntaje ----------

  get porcentajeDescontado(): number {
    let descuento = this.pistasUsadas * this.DESCUENTO_PISTA;
    if (this.solucionUsada) {
      descuento += this.DESCUENTO_SOLUCION;
    }
    return Math.min(descuento, 100 - this.PORCENTAJE_MINIMO);
  }

  get puntosPosibles(): number {
    if (!this.reto) {
      return 0;
    }
    return Math.round((this.reto.puntos * (100 - this.porcentajeDescontado)) / 100);
  }

  get siguienteReto(): Reto | undefined {
    return this.reto ? this.juegoService.obtenerReto(this.reto.id + 1) : undefined;
  }

  // ---------- Acciones ----------

  empezar(): void {
    this.fase = 'jugando';
    this.repasando = false;
    window.scrollTo({ top: 0 });
  }

  repasar(): void {
    this.repasando = true;
    window.scrollTo({ top: 0 });
  }

  volverAlReto(): void {
    this.repasando = false;
    window.scrollTo({ top: 0 });
  }

  pedirPista(): void {
    const totalPistas = this.reto?.pistas?.length ?? 0;
    if (this.pistasUsadas < totalPistas) {
      this.pistasUsadas++;
      this.juegoService.usarAyuda();
    }
  }

  verSolucion(): void {
    if (!this.solucionUsada) {
      this.solucionUsada = true;
      this.juegoService.usarAyuda();
    }
  }

  /** El componente del reto avisa que el jugador lo resolvió. */
  alCompletar(): void {
    if (!this.reto) {
      return;
    }
    this.puntosObtenidos = this.puntosPosibles;

    if (!this.esRepeticion) {
      this.juegoService.completarReto(this.puntosObtenidos);
    }

    this.fase = 'completado';
    window.scrollTo({ top: 0 });
  }

  /** 4 → "04" */
  numero(id: number): string {
    return id.toString().padStart(2, '0');
  }
}