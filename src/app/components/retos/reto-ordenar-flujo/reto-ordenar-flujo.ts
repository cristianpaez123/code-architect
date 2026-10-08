import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CapaFlujo, ConfigOrdenarFlujo, PasoFlujo } from '../../../models/reto.model';

type Resultado = 'bien' | 'mal';

/** Nombre que se muestra para cada capa. */
const CAPA_TEXTO: Record<CapaFlujo, string> = {
  presentacion: 'Presentación',
  logica: 'Lógica de negocio',
  datos: 'Acceso a datos',
  servidor: 'Servidor / API'
};

/**
 * Mecánica "ordenar flujo":
 * el jugador ordena fragmentos de código en el orden en que se ejecutan.
 *
 * 1. Los fragmentos aparecen desordenados.
 * 2. Con ▲ ▼ los sube o los baja.
 * 3. Verificar → cada fragmento se marca bien o mal, con su explicación.
 */
@Component({
  standalone: true,
  selector: 'app-reto-ordenar-flujo',
  templateUrl: './reto-ordenar-flujo.html',
  styleUrl: './reto-ordenar-flujo.css',
})
export class RetoOrdenarFlujoComponent implements OnInit {
  @Input() config!: ConfigOrdenarFlujo;

  /** La misión lo pone en true cuando el jugador pide ver la solución. */
  @Input() set mostrarSolucion(valor: boolean) {
    if (valor && this.config) {
      this.aplicarSolucion();
    }
  }

  /** Avisa a la misión que el reto se resolvió. */
  @Output() completado = new EventEmitter<void>();

  capaTexto = CAPA_TEXTO;

  /** Orden actual en pantalla (el que el jugador va armando). */
  orden: PasoFlujo[] = [];

  /** Resultado de la última verificación: id del paso → bien / mal. */
  resultado: Record<number, Resultado> = {};

  intentos = 0;
  resuelto = false;
  usoSolucion = false;

  ngOnInit(): void {
    this.orden = this.desordenar(this.config.pasos);
  }

  // ---------- Consultas para la vista ----------

  get cantidadErrores(): number {
    return Object.values(this.resultado).filter(r => r === 'mal').length;
  }

  /** Posición correcta del paso (0, 1, 2…) según la configuración. */
  private posicionCorrecta(paso: PasoFlujo): number {
    return this.config.pasos.findIndex(p => p.id === paso.id);
  }

  /** Si el paso está mal ubicado, hacia dónde debería moverse. */
  direccion(paso: PasoFlujo, posicionActual: number): string {
    return this.posicionCorrecta(paso) < posicionActual ? '▲ Debe ir más arriba' : '▼ Debe ir más abajo';
  }

  // ---------- Acciones del jugador ----------

  subir(posicion: number): void {
    if (posicion > 0) {
      this.intercambiar(posicion, posicion - 1);
    }
  }

  bajar(posicion: number): void {
    if (posicion < this.orden.length - 1) {
      this.intercambiar(posicion, posicion + 1);
    }
  }

  verificar(): void {
    this.intentos++;

    this.orden.forEach((paso, posicion) => {
      const estaBien = this.posicionCorrecta(paso) === posicion;
      this.resultado[paso.id] = estaBien ? 'bien' : 'mal';
    });

    if (this.cantidadErrores === 0) {
      this.resuelto = true;
    }
  }

  terminar(): void {
    this.completado.emit();
  }

  // ---------- Ayudantes ----------

  /** Cambia dos pasos de lugar y borra su marca de la verificación anterior. */
  private intercambiar(a: number, b: number): void {
    if (this.resuelto) {
      return;
    }
    const temporal = this.orden[a];
    this.orden[a] = this.orden[b];
    this.orden[b] = temporal;

    delete this.resultado[this.orden[a].id];
    delete this.resultado[this.orden[b].id];
  }

  /** Mezcla los pasos al azar, asegurando que no queden ya en orden. */
  private desordenar(pasos: PasoFlujo[]): PasoFlujo[] {
    const copia = [...pasos];
    do {
      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
      }
    } while (copia.every((paso, i) => paso.id === pasos[i].id));
    return copia;
  }

  /** Pone los pasos en el orden correcto y los marca bien. */
  private aplicarSolucion(): void {
    this.orden = [...this.config.pasos];
    for (const paso of this.orden) {
      this.resultado[paso.id] = 'bien';
    }
    this.usoSolucion = true;
    this.resuelto = true;
  }
}