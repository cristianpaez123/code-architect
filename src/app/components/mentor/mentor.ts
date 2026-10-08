import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Panel de ayudas del Mentor.
 * Las ayudas son progresivas: repasar (gratis) → pista 1 → pista 2 → solución.
 * El Mentor solo avisa qué pidió el jugador; la misión decide qué hacer.
 */
@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.html',
  styleUrl: './mentor.css',
})
export class Mentor {
  @Input() pistas: string[] = [];
  @Input() pistasUsadas = 0;
  @Input() solucionUsada = false;
  @Input() puntosBase = 0;
  @Input() puntosPosibles = 0;

  /** Porcentaje que descuenta cada ayuda (lo define la misión). */
  @Input() descuentoPista = 10;
  @Input() descuentoSolucion = 50;

  @Output() repasar = new EventEmitter<void>();
  @Output() pedirPista = new EventEmitter<void>();
  @Output() verSolucion = new EventEmitter<void>();

  /** Pide confirmación antes de mostrar la solución. */
  confirmandoSolucion = false;

  get pistasVisibles(): string[] {
    return this.pistas.slice(0, this.pistasUsadas);
  }

  get quedanPistas(): boolean {
    return this.pistasUsadas < this.pistas.length;
  }

  confirmarSolucion(): void {
    this.confirmandoSolucion = false;
    this.verSolucion.emit();
  }
}