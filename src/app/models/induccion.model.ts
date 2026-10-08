export interface Induccion {
    idea: string;                                    // La idea en una frase
    vidaReal: string;                                // Analogía
    codigoAntes: string;                             // ❌
    codigoDespues: string;                           
    piezas: { pieza: string; paraQue: string; ejemplo: string }[];
    notaAngular?: string;                            
    objetivo: string;
    comoJugar: string[];
}
