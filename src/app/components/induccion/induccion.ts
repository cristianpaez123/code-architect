import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reto } from '../../models/reto.model';

/**
 * Pantalla de inducción: lo que el jugador lee ANTES de jugar.
 * Muestra el ticket, la idea, una analogía, código de ejemplo y cómo se juega.
 */
@Component({
  selector: 'app-induccion',
  templateUrl: './induccion.html',
  styleUrl: './induccion.css',
})
export class Induccion {
  @Input() reto!: Reto;

  /** true cuando el jugador vuelve a leerla desde "Repasar concepto". */
  @Input() modoRepaso = false;

  @Output() empezar = new EventEmitter<void>();
}