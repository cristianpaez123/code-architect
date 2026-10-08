import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JuegoService } from '../../services/juego.service';
import { Progreso } from '../../models/progreso.model';
import { DIFICULTAD_NIVEL, DIFICULTAD_TEXTO, EstadoReto, Reto } from '../../models/reto.model';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  retos: Reto[];
  progreso: Progreso;
  puntosTotales: number;

  dificultadTexto = DIFICULTAD_TEXTO;
  dificultadNivel = DIFICULTAD_NIVEL;

  constructor(private juegoService: JuegoService) {
    this.retos = this.juegoService.obtenerRetos();
    this.progreso = this.juegoService.obtenerProgreso();
    this.puntosTotales = this.juegoService.obtenerPuntosTotales();
  }

  get retoActual(): Reto | undefined {
    return this.juegoService.obtenerRetoActual();
  }

  /** Reto que se desbloquea al completar el actual. */
  get siguienteReto(): Reto | undefined {
    const actual = this.retoActual;
    return actual ? this.juegoService.obtenerReto(actual.id + 1) : undefined;
  }

  get esJugadorNuevo(): boolean {
    return this.progreso.retosCompletados === 0;
  }

  get rutaCompletada(): boolean {
    return this.progreso.retosCompletados >= this.progreso.retosTotales;
  }

  get retosRestantes(): number {
    return this.progreso.retosTotales - this.progreso.retosCompletados;
  }

  get porcentaje(): number {
    return Math.round((this.progreso.retosCompletados / this.progreso.retosTotales) * 100);
  }

  // La línea de progreso va del centro del primer paso al centro del último.
  get lineaInicio(): number {
    return 50 / this.retos.length;
  }

  get lineaAncho(): number {
    return 100 - 100 / this.retos.length;
  }

  get lineaCompletada(): number {
    const tramos = this.retos.length - 1;
    const recorridos = Math.min(this.progreso.retosCompletados, tramos);
    return (this.lineaAncho * recorridos) / tramos;
  }

  estado(reto: Reto): EstadoReto {
    return this.juegoService.obtenerEstadoReto(reto.id);
  }

  /** 4 → "04" */
  numero(id: number): string {
    return id.toString().padStart(2, '0');
  }
}