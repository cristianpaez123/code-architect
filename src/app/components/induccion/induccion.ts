import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ANOTACION_INFO, EjemploCodigo, Reto, TipoAnotacion } from '../../models/reto.model';

/** Un pedazo de una línea: texto normal o texto resaltado con su número. */
interface PedazoLinea {
  texto: string;
  tipo?: TipoAnotacion;   // Si tiene tipo, va resaltado
  numero?: number;        // El número que lo conecta con su explicación
}

interface LineaAnotada {
  numero: number;
  pedazos: PedazoLinea[];
  notasAlFinal: { numero: number; tipo: TipoAnotacion }[]; // Anotaciones sin marca: el número va al final de la línea
}

interface NotaAnotada {
  numero: number;
  tipo: TipoAnotacion;
  texto: string;
}

/** El ejemplo ya preparado para dibujarlo con números y colores. */
interface EjemploAnotado {
  lineas: LineaAnotada[];
  notas: NotaAnotada[];
}

/** Orden en que aparecen los tipos en la leyenda. */
const ORDEN_TIPOS: TipoAnotacion[] = [
  'html', 'evento', 'dato', 'interface', 'clase', 'constructor', 'metodo', 'propiedad', 'variable', 'inyeccion', 'problema'
];

/**
 * Pantalla de inducción: lo que el jugador lee ANTES de jugar.
 * Muestra el ticket, la idea, una analogía, código de ejemplo y cómo se juega.
 *
 * Si los ejemplos traen anotaciones, el código se muestra con números y colores
 * que dicen "esto es un método", "esto es una interface", etc.
 * Si hay ejemplos malos y buenos, se muestran lado a lado: "Así NO" y "Así SÍ".
 */
@Component({
  selector: 'app-induccion',
  imports: [NgTemplateOutlet],
  templateUrl: './induccion.html',
  styleUrl: './induccion.css',
})
export class Induccion {
  @Input() reto!: Reto;

  /** true cuando el jugador vuelve a leerla desde "Repasar concepto". */
  @Input() modoRepaso = false;

  @Output() empezar = new EventEmitter<void>();

  anotacionInfo = ANOTACION_INFO;

  /** Guarda los ejemplos ya preparados para no recalcularlos en cada render. */
  private preparados = new Map<EjemploCodigo, EjemploAnotado>();

  // ---------- Grupos de ejemplos ----------

  private get ejemplos(): EjemploCodigo[] {
    return this.reto.induccion?.ejemplos ?? [];
  }

  get ejemplosNeutros(): EjemploCodigo[] {
    return this.ejemplos.filter(e => e.esCorrecto === undefined);
  }

  get ejemplosMal(): EjemploCodigo[] {
    return this.ejemplos.filter(e => e.esCorrecto === false);
  }

  get ejemplosBien(): EjemploCodigo[] {
    return this.ejemplos.filter(e => e.esCorrecto === true);
  }

  /** Hay comparación si existe al menos un ejemplo malo y uno bueno. */
  get hayComparacion(): boolean {
    return this.ejemplosMal.length > 0 && this.ejemplosBien.length > 0;
  }

  /** Los tipos que se usan en este reto, para la leyenda. */
  get tiposUsados(): TipoAnotacion[] {
    const usados = new Set(this.ejemplos.flatMap(e => (e.anotaciones ?? []).map(a => a.tipo)));
    return ORDEN_TIPOS.filter(tipo => usados.has(tipo));
  }

  // ---------- Código con anotaciones ----------

  tieneAnotaciones(ejemplo: EjemploCodigo): boolean {
    return (ejemplo.anotaciones?.length ?? 0) > 0;
  }

  anotado(ejemplo: EjemploCodigo): EjemploAnotado {
    let resultado = this.preparados.get(ejemplo);
    if (!resultado) {
      resultado = this.prepararEjemplo(ejemplo);
      this.preparados.set(ejemplo, resultado);
    }
    return resultado;
  }

  /** Parte el código en líneas y resalta las marcas con su número. */
  private prepararEjemplo(ejemplo: EjemploCodigo): EjemploAnotado {
    const anotaciones = ejemplo.anotaciones ?? [];
    const notas: NotaAnotada[] = anotaciones.map((a, i) => ({ numero: i + 1, tipo: a.tipo, texto: a.texto }));

    const lineas = ejemplo.codigo.split('\n').map((texto, posicion) => {
      const numeroLinea = posicion + 1;
      const deEstaLinea = anotaciones
        .map((anotacion, i) => ({ ...anotacion, numero: i + 1 }))
        .filter(a => a.linea === numeroLinea);

      // Se ubica cada marca dentro de la línea
      const conMarca = deEstaLinea
        .filter(a => a.marca && texto.includes(a.marca))
        .map(a => ({ ...a, inicio: texto.indexOf(a.marca!) }))
        .sort((a, b) => a.inicio - b.inicio);

      const pedazos: PedazoLinea[] = [];
      let desde = 0;
      for (const a of conMarca) {
        if (a.inicio < desde) {
          continue; // Se cruza con una marca anterior: se ignora
        }
        if (a.inicio > desde) {
          pedazos.push({ texto: texto.slice(desde, a.inicio) });
        }
        pedazos.push({ texto: a.marca!, tipo: a.tipo, numero: a.numero });
        desde = a.inicio + a.marca!.length;
      }
      if (desde < texto.length || pedazos.length === 0) {
        pedazos.push({ texto: texto.slice(desde) });
      }

      const notasAlFinal = deEstaLinea
        .filter(a => !a.marca || !texto.includes(a.marca))
        .map(a => ({ numero: a.numero, tipo: a.tipo }));

      return { numero: numeroLinea, pedazos, notasAlFinal };
    });

    return { lineas, notas };
  }
}