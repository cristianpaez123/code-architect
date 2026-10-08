import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JuegoService } from '../../services/juego.service';
import { Progreso } from '../../models/progreso.model';
import { DIFICULTAD_NIVEL, DIFICULTAD_TEXTO, EstadoReto, Reto, TIPO_TEXTO } from '../../models/reto.model';


@Component({
  selector: 'app-mapa',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent {
  retos: Reto[];
  progreso: Progreso;
  puntosTotales: number;
  bonus: Reto;

  /** Reto que se muestra en el panel de detalle. */
  retoSeleccionado: Reto | undefined;

  dificultadTexto = DIFICULTAD_TEXTO;
  dificultadNivel = DIFICULTAD_NIVEL;
  tipoTexto = TIPO_TEXTO;

  constructor(private juegoService: JuegoService) {
    this.retos = this.juegoService.obtenerRetos();
    this.progreso = this.juegoService.obtenerProgreso();
    this.puntosTotales = this.juegoService.obtenerPuntosTotales();
    this.bonus = this.juegoService.obtenerRetoBonus();

    // Por defecto se muestra el reto actual; si la ruta terminó, el último.
    this.retoSeleccionado = this.juegoService.obtenerRetoActual() ?? this.retos[this.retos.length - 1];
  }

  /** Número que se muestra en el header (si terminó la ruta, el último). */
  get numeroRetoActual(): number {
    return Math.min(this.progreso.retosCompletados + 1, this.progreso.retosTotales);
  }

  get porcentaje(): number {
    return Math.round((this.progreso.retosCompletados / this.progreso.retosTotales) * 100);
  }

  estado(reto: Reto): EstadoReto {
    return this.juegoService.obtenerEstadoReto(reto.id);
  }

  /** Los retos bloqueados no se pueden seleccionar. */
  seleccionar(reto: Reto): void {
    if (this.estado(reto) !== 'bloqueado') {
      this.retoSeleccionado = reto;
    }
  }

  /** Reto que viene después del indicado (para conectores y desbloqueos). */
  siguiente(reto: Reto): Reto | undefined {
    return this.juegoService.obtenerReto(reto.id + 1);
  }

  /** Reto anterior: el que hay que completar para abrir este. */
  anterior(reto: Reto): Reto | undefined {
    return this.juegoService.obtenerReto(reto.id - 1);
  }

  /**
   * Color del conector que llega al reto indicado:
   * verde si ya se completó, azul si es el actual, punteado si está bloqueado.
   */
  claseConector(retoDestino: Reto): string {
    switch (this.estado(retoDestino)) {
      case 'completado':
        return 'link--done';
      case 'actual':
        return 'link--current';
      default:
        return 'link--locked';
    }
  }

  /** 4 → "04" */
  numero(id: number): string {
    return id.toString().padStart(2, '0');
  }
}