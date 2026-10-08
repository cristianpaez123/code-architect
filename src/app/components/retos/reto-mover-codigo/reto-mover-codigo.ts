import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BloqueCodigo, ConfigMoverCodigo, DestinoCodigo } from '../../../models/reto.model';

type Resultado = 'bien' | 'mal';

/**
 * Mecánica "mover código":
 * el jugador reparte los bloques de un archivo grande en los archivos correctos.
 *
 * 1. Clic en un bloque → queda seleccionado.
 * 2. Clic en un archivo destino → el bloque se mueve ahí.
 * 3. Verificar → cada bloque se marca bien o mal, con su explicación.
 */
@Component({
  selector: 'app-reto-mover-codigo',
  templateUrl: './reto-mover-codigo.html',
  styleUrl: './reto-mover-codigo.css',
})
export class RetoMoverCodigo implements OnInit {
  @Input() config!: ConfigMoverCodigo;

  /** La misión lo pone en true cuando el jugador pide ver la solución. */
  @Input() set mostrarSolucion(valor: boolean) {
    if (valor && this.config) {
      this.aplicarSolucion();
    }
  }

  /** Avisa a la misión que el reto se resolvió. */
  @Output() completado = new EventEmitter<void>();

  /** Dónde está cada bloque: id del bloque → id del destino (null = sin ubicar). */
  ubicacion: Record<number, string | null> = {};

  /** Resultado de la última verificación de cada bloque. */
  resultado: Record<number, Resultado> = {};

  bloqueSeleccionado: number | null = null;
  intentos = 0;
  resuelto = false;
  usoSolucion = false;

  ngOnInit(): void {
    for (const bloque of this.config.bloques) {
      this.ubicacion[bloque.id] = null;
    }
  }

  // ---------- Consultas para la vista ----------

  get bloquesSinUbicar(): BloqueCodigo[] {
    return this.config.bloques.filter(bloque => this.ubicacion[bloque.id] === null);
  }

  bloquesEn(destino: DestinoCodigo): BloqueCodigo[] {
    return this.config.bloques.filter(bloque => this.ubicacion[bloque.id] === destino.id);
  }

  get cantidadUbicados(): number {
    return this.config.bloques.length - this.bloquesSinUbicar.length;
  }

  get todosUbicados(): boolean {
    return this.bloquesSinUbicar.length === 0;
  }

  get cantidadErrores(): number {
    return Object.values(this.resultado).filter(r => r === 'mal').length;
  }

  /** El bloque seleccionado ya estaba en un destino (se puede devolver). */
  get seleccionadoEstaUbicado(): boolean {
    return this.bloqueSeleccionado !== null && this.ubicacion[this.bloqueSeleccionado] !== null;
  }

  // ---------- Acciones del jugador ----------

  seleccionar(bloque: BloqueCodigo): void {
    if (this.resuelto) {
      return;
    }
    // Clic en el mismo bloque = deseleccionar
    this.bloqueSeleccionado = this.bloqueSeleccionado === bloque.id ? null : bloque.id;
  }

  moverA(destino: DestinoCodigo): void {
    if (this.bloqueSeleccionado === null || this.resuelto) {
      return;
    }
    this.ubicacion[this.bloqueSeleccionado] = destino.id;
    delete this.resultado[this.bloqueSeleccionado];
    this.bloqueSeleccionado = null;
  }

  devolverAlOriginal(): void {
    if (this.bloqueSeleccionado === null || this.resuelto) {
      return;
    }
    this.ubicacion[this.bloqueSeleccionado] = null;
    delete this.resultado[this.bloqueSeleccionado];
    this.bloqueSeleccionado = null;
  }

  verificar(): void {
    if (!this.todosUbicados) {
      return;
    }
    this.intentos++;
    this.bloqueSeleccionado = null;

    for (const bloque of this.config.bloques) {
      const estaBien = this.ubicacion[bloque.id] === bloque.destinoCorrecto;
      this.resultado[bloque.id] = estaBien ? 'bien' : 'mal';
    }

    if (this.cantidadErrores === 0) {
      this.resuelto = true;
    }
  }

  terminar(): void {
    this.completado.emit();
  }

  /** Coloca cada bloque en su lugar y lo marca como correcto. */
  private aplicarSolucion(): void {
    for (const bloque of this.config.bloques) {
      this.ubicacion[bloque.id] = bloque.destinoCorrecto;
      this.resultado[bloque.id] = 'bien';
    }
    this.bloqueSeleccionado = null;
    this.usoSolucion = true;
    this.resuelto = true;
  }
}