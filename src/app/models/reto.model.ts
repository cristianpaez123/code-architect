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

/** Qué es la parte del código que se señala en la inducción. */
export type TipoAnotacion =
    | 'interface'
    | 'clase'
    | 'metodo'
    | 'propiedad'
    | 'variable'
    | 'constructor'
    | 'inyeccion'
    | 'problema';

/** Nombre y explicación corta de cada tipo (para la leyenda "Cómo leer el código"). */
export const ANOTACION_INFO: Record<TipoAnotacion, { nombre: string; descripcion: string }> = {
    interface: { nombre: 'Interface', descripcion: 'Un contrato: dice qué debe existir, pero no tiene código adentro.' },
    clase: { nombre: 'Clase', descripcion: 'Un molde que sí hace el trabajo. Se crea con new.' },
    metodo: { nombre: 'Método', descripcion: 'Una acción que hace la clase. Se reconoce por los paréntesis ().' },
    propiedad: { nombre: 'Propiedad', descripcion: 'Una variable que vive dentro de una clase y guarda un dato.' },
    variable: { nombre: 'Variable', descripcion: 'Un nombre que guarda un dato para usarlo después.' },
    constructor: { nombre: 'Constructor', descripcion: 'Lo que la clase pide para poder nacer (se ejecuta con new).' },
    inyeccion: { nombre: 'Inyección', descripcion: 'Entregarle a una clase lo que pidió en su constructor.' },
    problema: { nombre: 'Problema', descripcion: 'Lo que está mal y hay que cambiar.' }
};

/** Una parte del código señalada con un número y una explicación. */
export interface AnotacionCodigo {
    linea: number;             // Línea del ejemplo (empieza en 1)
    marca?: string;            // El texto exacto que se resalta en esa línea. Sin marca, se señala la línea entera
    tipo: TipoAnotacion;
    texto: string;             // La explicación que aparece debajo del código
}

export interface EjemploCodigo {
    titulo: string;            // "Antes: todo mezclado"
    esCorrecto?: boolean;      // false = ❌, true = ✅, sin valor = diagrama neutro
    archivo?: string;          // "perfil.componente.ts"
    codigo: string;
    anotaciones?: AnotacionCodigo[]; // Partes del código señaladas: "esto es un método"
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

/** Mecánica ordenar-flujo: fragmentos de código que se ordenan según se ejecutan. */
export type CapaFlujo = 'presentacion' | 'logica' | 'datos' | 'servidor';

export interface PasoFlujo {
    id: number;
    archivo: string;           // "carrito.componente.ts"
    capa: CapaFlujo;
    codigo: string;
    explicacion: string;       // Feedback si queda en la posición equivocada
}

export interface ConfigOrdenarFlujo {
    pasos: PasoFlujo[];        // En el ORDEN CORRECTO. El componente los desordena.
}

/** Un archivo completo, para mostrar cómo queda el código corregido. */
export interface ArchivoCodigo {
    archivo: string;           // "correo.servicio.ts"
    codigo: string;
    nota?: string;
}


/** Mecánica revisar-codigo: el jugador revisa uno o varios archivos como en un Pull Request. */
export interface ComentarioLinea {
    archivo?: string;          // En qué archivo está (si el reto tiene varios). Sin valor = el primero
    linea: number;             // Número de línea (empieza en 1)
    hasta?: number;            // Si el problema es un bloque (un método completo), última línea del bloque
    comentario: string;        // Lo que se muestra debajo de la línea (o del bloque)
}

export interface ConfigRevisarCodigo {
    archivo?: string;                    // Un solo archivo: "perfil.componente.ts"
    codigo?: string;                     // …y su código. Se parte por líneas.
    archivos?: ArchivoCodigo[];          // O varios archivos (en lugar de archivo + codigo)
    problemas: ComentarioLinea[];        // Las líneas (o bloques) que el jugador DEBE marcar
    falsasAlarmas?: ComentarioLinea[];   // Líneas que parecen sospechosas pero están bien
    comentarioLineaCorrecta?: string;    // Mensaje para otras líneas marcadas que están bien
    codigoCorregido?: string;            // El mismo archivo arreglado (se muestra al final)
    archivosCorregidos?: ArchivoCodigo[]; // Varios archivos arreglados
}

/** Mecánica completar-codigo: archivos con espacios vacíos que se llenan con piezas. */
export interface HuecoCodigo {
    id: number;                // En el código se escribe [[1]], [[2]]…
    respuesta: string;         // La pieza correcta: "implements"
    ayuda: string;             // Se muestra si el jugador se equivoca (no dice la respuesta)
    explicacion: string;       // Se muestra al final: por qué va esa pieza
}

export interface ConfigCompletarCodigo {
    archivos: ArchivoCodigo[];         // Los archivos del reto. Los huecos se marcan con [[id]]
    huecos: HuecoCodigo[];
    distractores: string[];            // Piezas de más que no van en ningún hueco
    archivosExtra?: ArchivoCodigo[];   // Se muestran al final: cómo se usa lo que completó
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
    ordenarFlujo?: ConfigOrdenarFlujo;
    revisarCodigo?: ConfigRevisarCodigo;
    completarCodigo?: ConfigCompletarCodigo;
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