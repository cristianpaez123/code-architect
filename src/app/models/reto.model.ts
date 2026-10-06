
export type TipoJuego =
    | 'clasificar'
    | 'seleccionar'
    | 'flujo'
    | 'factory'
    | 'adapter'
    | 'observer'
    | 'code-review'
    | 'microservices';

export interface Reto {
    id: number;
    titulo: string;
    descripcion: string;
    tipoJuego: TipoJuego;
    dificultad: 'facil' | 'media' | 'dificil';
    puntos: number;
    concepto: string;
    contexto: string;
}