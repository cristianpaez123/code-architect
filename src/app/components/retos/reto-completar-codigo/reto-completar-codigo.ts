import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArchivoCodigo, ConfigCompletarCodigo, HuecoCodigo } from '../../../models/reto.model';

/** Un pedazo de una línea: texto normal o un espacio vacío (hueco). */
interface Segmento {
  tipo: 'texto' | 'hueco';
  texto: string;     // Solo para tipo texto
  huecoId: number;   // Solo para tipo hueco
}

interface LineaCompletar {
  numero: number;
  segmentos: Segmento[];
  huecos: number[];  // ids de los huecos que hay en esta línea
}

interface ArchivoCompletar {
  archivo: string;
  nota?: string;
  lineas: LineaCompletar[];
  cantidadHuecos: number;
}

/** Una pieza del banco. Cada una tiene id propio aunque el texto se repita. */
interface Pieza {
  id: number;
  texto: string;
}

type Resultado = 'bien' | 'mal';

/** Busca los huecos escritos como [[1]], [[2]]… */
const PATRON_HUECO = /\[\[(\d+)\]\]/g;

/**
 * Mecánica "completar código":
 * el jugador llena los espacios vacíos de uno o varios archivos con piezas.
 *
 * 1. Toca un espacio vacío (queda seleccionado) y luego una pieza del banco.
 * 2. Para quitar una pieza, toca el espacio otra vez.
 * 3. Verificar → cada espacio se marca bien o mal. Los malos muestran una ayuda.
 * 4. Al final ve el código completo y por qué va cada pieza.
 */
@Component({
  selector: 'app-reto-completar-codigo',
  templateUrl: './reto-completar-codigo.html',
  styleUrl: './reto-completar-codigo.css',
})
export class RetoCompletarCodigo implements OnInit {
  @Input() config!: ConfigCompletarCodigo;

  /** La misión lo pone en true cuando el jugador pide ver la solución. */
  @Input() set mostrarSolucion(valor: boolean) {
    if (valor && this.config) {
      this.aplicarSolucion();
    }
  }

  /** Avisa a la misión que el reto se resolvió. */
  @Output() completado = new EventEmitter<void>();

  archivos: ArchivoCompletar[] = [];
  piezas: Pieza[] = [];

  /** hueco id → pieza id que el jugador puso ahí. */
  colocadas: Record<number, number> = {};

  /** El hueco seleccionado, donde caerá la próxima pieza. */
  huecoActivo: number | null = null;

  /** Resultado de la última verificación: hueco id → bien / mal. */
  resultado: Record<number, Resultado> = {};

  intentos = 0;
  resuelto = false;
  usoSolucion = false;

  ngOnInit(): void {
    this.archivos = this.config.archivos.map(archivo => this.prepararArchivo(archivo));
    this.piezas = this.crearPiezas();
    this.huecoActivo = this.siguienteHuecoVacio();
  }

  // ---------- Consultas para la vista ----------

  get totalHuecos(): number {
    return this.config.huecos.length;
  }

  get cantidadLlenos(): number {
    return Object.keys(this.colocadas).length;
  }

  get todosLlenos(): boolean {
    return this.cantidadLlenos === this.totalHuecos;
  }

  get cantidadErrores(): number {
    return Object.values(this.resultado).filter(r => r === 'mal').length;
  }

  /** Piezas que todavía no están puestas en ningún hueco. */
  get piezasLibres(): Pieza[] {
    const usadas = Object.values(this.colocadas);
    return this.piezas.filter(pieza => !usadas.includes(pieza.id));
  }

  /** Lo que se muestra dentro de un hueco: la pieza puesta o vacío. */
  textoDelHueco(huecoId: number): string {
    const piezaId = this.colocadas[huecoId];
    return this.piezas.find(p => p.id === piezaId)?.texto ?? '';
  }

  hueco(huecoId: number): HuecoCodigo | undefined {
    return this.config.huecos.find(h => h.id === huecoId);
  }

  /** Huecos de la línea que quedaron mal (para mostrar su ayuda debajo). */
  huecosMalos(linea: LineaCompletar): HuecoCodigo[] {
    return linea.huecos
      .filter(id => this.resultado[id] === 'mal')
      .map(id => this.hueco(id)!)
      .filter(Boolean);
  }

  /** Huecos de la línea, para mostrar su explicación al final. */
  huecosDeLinea(linea: LineaCompletar): HuecoCodigo[] {
    return linea.huecos.map(id => this.hueco(id)!).filter(Boolean);
  }

  /** El archivo con las respuestas puestas (para "así queda el código"). */
  get archivosCompletos(): ArchivoCodigo[] {
    const completos = this.config.archivos.map(archivo => ({
      archivo: archivo.archivo,
      codigo: archivo.codigo.replace(PATRON_HUECO, (_, id) => this.hueco(Number(id))?.respuesta ?? '')
    }));
    return [...completos, ...(this.config.archivosExtra ?? [])];
  }

  // ---------- Acciones del jugador ----------

  /** Clic en un hueco: si tiene pieza la devuelve al banco; si no, lo selecciona. */
  tocarHueco(huecoId: number): void {
    if (this.resuelto) {
      return;
    }
    if (this.colocadas[huecoId] !== undefined) {
      delete this.colocadas[huecoId];
      delete this.resultado[huecoId];
    }
    this.huecoActivo = huecoId;
  }

  /** Clic en una pieza del banco: la pone en el hueco seleccionado. */
  tocarPieza(pieza: Pieza): void {
    if (this.resuelto) {
      return;
    }
    const destino = this.huecoActivo ?? this.siguienteHuecoVacio();
    if (destino === null) {
      return;
    }
    this.colocadas[destino] = pieza.id;
    delete this.resultado[destino];
    this.huecoActivo = this.siguienteHuecoVacio(destino);
  }

  verificar(): void {
    this.intentos++;
    this.resultado = {};

    for (const hueco of this.config.huecos) {
      const estaBien = this.textoDelHueco(hueco.id) === hueco.respuesta;
      this.resultado[hueco.id] = estaBien ? 'bien' : 'mal';
    }

    if (this.cantidadErrores === 0) {
      this.resuelto = true;
      this.huecoActivo = null;
    }
  }

  terminar(): void {
    this.completado.emit();
  }

  // ---------- Ayudantes ----------

  /** Parte el archivo en líneas, y cada línea en texto y huecos. */
  private prepararArchivo(archivo: ArchivoCodigo): ArchivoCompletar {
    let cantidadHuecos = 0;

    const lineas = archivo.codigo.split('\n').map((textoLinea, posicion) => {
      const segmentos: Segmento[] = [];
      const huecos: number[] = [];
      let desde = 0;

      for (const encontrado of textoLinea.matchAll(PATRON_HUECO)) {
        const inicio = encontrado.index ?? 0;
        if (inicio > desde) {
          segmentos.push({ tipo: 'texto', texto: textoLinea.slice(desde, inicio), huecoId: 0 });
        }
        const id = Number(encontrado[1]);
        segmentos.push({ tipo: 'hueco', texto: '', huecoId: id });
        huecos.push(id);
        desde = inicio + encontrado[0].length;
      }
      if (desde < textoLinea.length || segmentos.length === 0) {
        segmentos.push({ tipo: 'texto', texto: textoLinea.slice(desde), huecoId: 0 });
      }

      cantidadHuecos += huecos.length;
      return { numero: posicion + 1, segmentos, huecos };
    });

    return { archivo: archivo.archivo, nota: archivo.nota, lineas, cantidadHuecos };
  }

  /** Una pieza por cada respuesta + una por cada distractor, mezcladas. */
  private crearPiezas(): Pieza[] {
    const textos = [
      ...this.config.huecos.map(h => h.respuesta),
      ...this.config.distractores
    ];
    const piezas = textos.map((texto, i) => ({ id: i + 1, texto }));

    for (let i = piezas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [piezas[i], piezas[j]] = [piezas[j], piezas[i]];
    }
    return piezas;
  }

  /** El primer hueco vacío (en el orden en que aparecen), empezando después de "desde". */
  private siguienteHuecoVacio(desde?: number): number | null {
    const orden = this.archivos.flatMap(a => a.lineas.flatMap(l => l.huecos));
    const inicio = desde === undefined ? 0 : orden.indexOf(desde) + 1;
    const recorrido = [...orden.slice(inicio), ...orden.slice(0, inicio)];
    return recorrido.find(id => this.colocadas[id] === undefined) ?? null;
  }

  /** Pone la pieza correcta en cada hueco. */
  private aplicarSolucion(): void {
    this.colocadas = {};
    const usadas: number[] = [];

    for (const hueco of this.config.huecos) {
      const pieza = this.piezas.find(p => p.texto === hueco.respuesta && !usadas.includes(p.id));
      if (pieza) {
        this.colocadas[hueco.id] = pieza.id;
        usadas.push(pieza.id);
      }
    }
    this.resultado = {};
    for (const hueco of this.config.huecos) {
      this.resultado[hueco.id] = 'bien';
    }
    this.huecoActivo = null;
    this.usoSolucion = true;
    this.resuelto = true;
  }
}