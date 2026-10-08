// =========================================================
// Modelos de los retos de Code Architect
// =========================================================

/** Las 4 mecánicas de juego. Cada una es un componente en components/retos/. */
export type TipoJuego =
    | 'mover-codigo'
    | 'ordenar-flujo'
    | 'revisar-codigo'
    | 'completar-codigo';

/** Estado de un reto en la ruta lineal. */
export type EstadoReto = 'completado' | 'actual' | 'bloqueado';

/** Una misión agrupa varios retos de un mismo tema. */
export interface MisionInfo {
    id: number;
    titulo: string;
    evidencia: string;
}

// ---------- Inducción (lo que el jugador lee antes de jugar) ----------

export interface EjemploCodigo {
    titulo: string;            // "Antes: todo mezclado"
    esCorrecto: boolean;       // false = ❌, true = ✅
    archivo?: string;          // "perfil.componente.ts"
    codigo: string;
}

export interface TablaGuia {
    titulo: string;
    columnas: string[];
    filas: string[][];
}

export interface ContenidoInduccion {
    remitente: string;         // Quién envía el ticket: "Tech Lead"
    idea: string;              // La idea en una frase
    vidaReal: string;          // Analogía de la vida real
    ejemplos: EjemploCodigo[]; // Código antes / después
    guia: TablaGuia;           // Tabla para decidir
    notaAngular?: string;      // Conexión con lo que ya usan en Angular
    objetivo: string;
    comoJugar: string[];
}

// ---------- Configuración de cada mecánica ----------

/** Mecánica mover-codigo: un archivo grande dividido en bloques. */
export interface DestinoCodigo {
    id: string;                // "vista"
    nombre: string;            // "Vista"
    archivo: string;           // "productos.componente.html"
    descripcion: string;       // "Lo que se ve"
}

export interface BloqueCodigo {
    id: number;
    codigo: string;
    destinoCorrecto: string;   // id del destino
    explicacion: string;       // Feedback si lo ubica mal
}

export interface ConfigMoverCodigo {
    archivoOriginal: string;
    destinos: DestinoCodigo[];
    bloques: BloqueCodigo[];
}

// ---------- Reto ----------

export interface Reto {
    id: number;
    misionId: number;
    titulo: string;
    descripcion: string;
    tipoJuego: TipoJuego;
    dificultad: 'facil' | 'media' | 'dificil';
    puntos: number;
    concepto: string;
    contexto: string;              // El mensaje del ticket

    // Contenido educativo (se completa reto por reto)
    induccion?: ContenidoInduccion;
    pistas?: string[];
    explicacionFinal?: string;
    evidencia?: string;

    // Datos de la mecánica: cada reto llena solo el de su tipoJuego
    moverCodigo?: ConfigMoverCodigo;
}

/** Texto que se muestra para cada dificultad. */
export const DIFICULTAD_TEXTO: Record<Reto['dificultad'], string> = {
    facil: 'Fácil',
    media: 'Media',
    dificil: 'Difícil'
};

/** Cuántas barras se encienden en el indicador de dificultad (de 3). */
export const DIFICULTAD_NIVEL: Record<Reto['dificultad'], number> = {
    facil: 1,
    media: 2,
    dificil: 3
};

/** Nombre de cada mecánica para mostrar en pantalla. */
export const TIPO_TEXTO: Record<TipoJuego, string> = {
    'mover-codigo': 'Mover código',
    'ordenar-flujo': 'Ordenar flujo',
    'revisar-codigo': 'Revisar código',
    'completar-codigo': 'Completar código'
};