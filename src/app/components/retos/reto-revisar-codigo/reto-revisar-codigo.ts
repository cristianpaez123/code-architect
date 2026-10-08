import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArchivoCodigo, ComentarioLinea, ConfigRevisarCodigo } from '../../../models/reto.model';

/** Una línea de un archivo que se está revisando. */
interface LineaCodigo {
  numero: number;
  texto: string;
  estaVacia: boolean;
  clave: string;      // "archivo|numero": identifica la línea aunque haya varios archivos
}

interface ArchivoRevision {
  nombre: string;
  nota?: string;
  lineas: LineaCodigo[];
}

/** acierto = la marcó y sí era un problema · falsa = la marcó pero estaba bien */
type Resultado = 'acierto' | 'falsa';

const COMENTARIO_POR_DEFECTO = 'Esta línea está bien. Desmárcala.';

/**
 * Mecánica "revisar código":
 * el jugador revisa uno o varios archivos como en un Pull Request.
 *
 * 1. Hace clic en las líneas que tienen un problema (se marcan).
 *    Si el problema es un bloque (un método completo), basta con marcar una de sus líneas.
 * 2. Pulsa "Enviar revisión".
 * 3. Cada problema encontrado se pinta de verde con su comentario.
 *    Cada línea marcada que estaba bien se pinta de rojo con la razón.
 *    Si le faltan problemas, se le dice cuántos, pero no cuáles.
 * 4. Al final ve el código corregido completo.
 */
@Component({
  selector: 'app-reto-revisar-codigo',
  templateUrl: './reto-revisar-codigo.html',
  styleUrl: './reto-revisar-codigo.css',
})
export class RetoRevisarCodigo implements OnInit {
  @Input() config!: ConfigRevisarCodigo;

  /** La misión lo pone en true cuando el jugador pide ver la solución. */
  @Input() set mostrarSolucion(valor: boolean) {
    if (valor && this.config) {
      this.aplicarSolucion();
    }
  }

  /** Avisa a la misión que el reto se resolvió. */
  @Output() completado = new EventEmitter<void>();

  archivos: ArchivoRevision[] = [];

  /** Archivos que se muestran al final como "así queda corregido". */
  archivosFinales: ArchivoCodigo[] = [];

  /** Claves ("archivo|numero") de las líneas que el jugador marcó. */
  marcadas: string[] = [];

  /** Resultado de la última revisión: clave de la línea → acierto / falsa. */
  resultado: Record<string, Resultado> = {};

  verificado = false;
  intentos = 0;
  resuelto = false;
  usoSolucion = false;

  ngOnInit(): void {
    // Se aceptan las dos formas: un solo archivo (archivo + codigo) o varios (archivos)
    const originales: ArchivoCodigo[] = this.config.archivos
      ?? [{ archivo: this.config.archivo ?? '', codigo: this.config.codigo ?? '' }];

    this.archivos = originales.map(original => ({
      nombre: original.archivo,
      nota: original.nota,
      lineas: original.codigo.split('\n').map((texto, posicion) => ({
        numero: posicion + 1,
        texto: texto,
        estaVacia: texto.trim() === '',
        clave: original.archivo + '|' + (posicion + 1)
      }))
    }));

    if (this.config.archivosCorregidos) {
      this.archivosFinales = this.config.archivosCorregidos;
    } else if (this.config.codigoCorregido) {
      this.archivosFinales = [{ archivo: originales[0].archivo, codigo: this.config.codigoCorregido }];
    }
  }

  // ---------- Consultas para la vista ----------

  get totalProblemas(): number {
    return this.config.problemas.length;
  }

  /** Problemas que ya tienen al menos una línea marcada y revisada. */
  get problemasEncontrados(): ComentarioLinea[] {
    return this.config.problemas.filter(problema =>
      this.clavesDe(problema).some(clave => this.resultado[clave] === 'acierto')
    );
  }

  get cantidadFalsas(): number {
    return Object.values(this.resultado).filter(r => r === 'falsa').length;
  }

  get cantidadFaltantes(): number {
    return this.totalProblemas - this.problemasEncontrados.length;
  }

  estaMarcada(clave: string): boolean {
    return this.marcadas.includes(clave);
  }

  /** La línea es parte de un problema que ya se encontró (se pinta de verde). */
  esEncontrada(clave: string): boolean {
    return this.problemasEncontrados.some(problema => this.clavesDe(problema).includes(clave));
  }

  /** Si en esta línea termina un problema encontrado, devuelve su comentario. */
  comentarioProblema(clave: string): string | undefined {
    const problema = this.problemasEncontrados.find(p => this.claveFinal(p) === clave);
    return problema?.comentario;
  }

  /** Si esta línea se marcó pero estaba bien, devuelve la razón. */
  comentarioFalsaAlarma(clave: string): string | undefined {
    if (this.resultado[clave] !== 'falsa') {
      return undefined;
    }
    const alarma = (this.config.falsasAlarmas ?? []).find(a => this.clavesDe(a).includes(clave));
    return alarma?.comentario ?? this.config.comentarioLineaCorrecta ?? COMENTARIO_POR_DEFECTO;
  }

  // ---------- Acciones del jugador ----------

  /** Clic en una línea: la marca o la desmarca. */
  alternar(clave: string): void {
    if (this.resuelto) {
      return;
    }
    if (this.estaMarcada(clave)) {
      this.marcadas = this.marcadas.filter(c => c !== clave);
    } else {
      this.marcadas = [...this.marcadas, clave];
    }
    // Si cambia una línea, su comentario anterior ya no aplica
    delete this.resultado[clave];
  }

  enviarRevision(): void {
    this.intentos++;
    this.verificado = true;
    this.resultado = {};

    for (const clave of this.marcadas) {
      this.resultado[clave] = this.esProblema(clave) ? 'acierto' : 'falsa';
    }

    if (this.cantidadFaltantes === 0 && this.cantidadFalsas === 0) {
      this.resuelto = true;
    }
  }

  terminar(): void {
    this.completado.emit();
  }

  // ---------- Ayudantes ----------

  /** El archivo de un problema. Si no lo dice, es el primero. */
  private archivoDe(item: ComentarioLinea): string {
    return item.archivo ?? this.archivos[0]?.nombre ?? '';
  }

  /** Todas las claves que ocupa un problema: de "linea" hasta "hasta". */
  private clavesDe(item: ComentarioLinea): string[] {
    const fin = item.hasta ?? item.linea;
    const claves: string[] = [];
    for (let n = item.linea; n <= fin; n++) {
      claves.push(this.archivoDe(item) + '|' + n);
    }
    return claves;
  }

  /** La última línea del problema: ahí se muestra su comentario. */
  private claveFinal(item: ComentarioLinea): string {
    return this.archivoDe(item) + '|' + (item.hasta ?? item.linea);
  }

  private esProblema(clave: string): boolean {
    return this.config.problemas.some(problema => this.clavesDe(problema).includes(clave));
  }

  /** Marca la primera línea de cada problema y muestra sus comentarios. */
  private aplicarSolucion(): void {
    this.marcadas = this.config.problemas.map(p => this.clavesDe(p)[0]);
    this.resultado = {};
    for (const clave of this.marcadas) {
      this.resultado[clave] = 'acierto';
    }
    this.verificado = true;
    this.usoSolucion = true;
    this.resuelto = true;
  }
}