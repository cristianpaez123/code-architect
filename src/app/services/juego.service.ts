import { Injectable } from '@angular/core';
import { Reto } from '../models/reto.model';
import { Progreso } from '../models/progreso.model';

@Injectable({
    providedIn: 'root'
})
export class JuegoService {

    private retos: Reto[] = [

        {
            id: 1,
            titulo: 'El adaptador perdido',
            descripcion: 'Encuentra la solución utilizando el patrón Adapter.',
            tipoJuego: 'adapter',
            dificultad: 'facil',
            puntos: 100,
            concepto: 'Patrón Adapter',
            contexto: 'Dos clases tienen interfaces incompatibles y necesitamos hacerlas trabajar juntas.'
        },

        {
            id: 2,
            titulo: 'Clasifica el patrón',
            descripcion: 'Relaciona cada situación con el patrón de diseño correcto.',
            tipoJuego: 'clasificar',
            dificultad: 'facil',
            puntos: 100,
            concepto: 'Patrones de diseño',
            contexto: 'Debes identificar qué patrón de diseño resuelve mejor cada situación.'
        },

        {
            id: 3,
            titulo: 'Selecciona la solución',
            descripcion: 'Selecciona la mejor solución para el problema presentado.',
            tipoJuego: 'seleccionar',
            dificultad: 'media',
            puntos: 150,
            concepto: 'Selección de patrones',
            contexto: 'Analiza el problema y selecciona la alternativa que tenga mejor diseño.'
        },

        {
            id: 4,
            titulo: 'Construye el flujo',
            descripcion: 'Ordena correctamente los elementos del flujo de ejecución.',
            tipoJuego: 'flujo',
            dificultad: 'media',
            puntos: 150,
            concepto: 'Flujo de ejecución',
            contexto: 'Organiza los componentes en el orden correcto para representar el flujo.'
        },

        {
            id: 5,
            titulo: 'La fábrica',
            descripcion: 'Identifica dónde aplicar el patrón Factory.',
            tipoJuego: 'factory',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Patrón Factory',
            contexto: 'Necesitas crear diferentes tipos de objetos sin acoplar directamente el código a sus clases concretas.'
        },

        {
            id: 6,
            titulo: 'Observando los cambios',
            descripcion: 'Construye una solución utilizando Observer.',
            tipoJuego: 'observer',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Patrón Observer',
            contexto: 'Un objeto cambia de estado y otros objetos necesitan recibir una notificación automáticamente.'
        },

        {
            id: 7,
            titulo: 'Revisión de código',
            descripcion: 'Analiza el código y encuentra los problemas de diseño.',
            tipoJuego: 'code-review',
            dificultad: 'dificil',
            puntos: 250,
            concepto: 'Buenas prácticas y diseño de software',
            contexto: 'Debes analizar código real, detectar problemas y proponer una solución más adecuada.'
        },

        {
            id: 8,
            titulo: 'Arquitectura de microservicios',
            descripcion: 'Diseña una solución utilizando microservicios.',
            tipoJuego: 'microservices',
            dificultad: 'dificil',
            puntos: 300,
            concepto: 'Arquitectura de microservicios',
            contexto: 'Debes dividir una aplicación en servicios independientes que puedan comunicarse entre sí.'
        }

    ];

    private progreso: Progreso = {
        puntos: 0,
        retosCompletados: 0,
        retosTotales: this.retos.length,
        retoActual: 1,
        misionActual: 1,
        ayudasUsadas: 0
    };


    obtenerRetos(): Reto[] {
        return this.retos;
    }


    obtenerReto(id: number): Reto | undefined {
        return this.retos.find(reto => reto.id === id);
    }


    obtenerProgreso(): Progreso {
        return this.progreso;
    }


    completarReto(puntos: number): void {
        this.progreso.puntos += puntos;
        this.progreso.retosCompletados++;

        if (this.progreso.retoActual < this.progreso.retosTotales) {
            this.progreso.retoActual++;
        }
    }


    sumarPuntos(puntos: number): void {
        this.progreso.puntos += puntos;
    }


    usarAyuda(): void {
        this.progreso.ayudasUsadas++;
    }

}