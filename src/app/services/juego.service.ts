import { Injectable } from '@angular/core';
import { EstadoReto, MisionInfo, Reto } from '../models/reto.model';
import { Progreso } from '../models/progreso.model';

@Injectable({
    providedIn: 'root'
})
export class JuegoService {

    private misiones: MisionInfo[] = [
        { id: 1, titulo: 'Arquitectura en el frontend', evidencia: 'GP-ARQ-01, GP-ARQ-02' },
        { id: 2, titulo: 'SOLID: interfaces e inyección de dependencias', evidencia: 'GP-ARQ-03' },
        { id: 3, titulo: 'Patrones de diseño en el frontend', evidencia: 'GP-ARQ-05' },
        { id: 4, titulo: 'Reto final', evidencia: 'GP-ARQ-05' }
    ];

    private retos: Reto[] = [

        // ===================== MISIÓN 1 =====================
        {
            id: 1,
            misionId: 1,
            titulo: 'El componente que hace todo',
            descripcion: 'Separa un componente gigante en Modelo, Vista y Controlador.',
            tipoJuego: 'mover-codigo',
            dificultad: 'facil',
            puntos: 100,
            concepto: 'MVC (Modelo–Vista–Controlador)',
            contexto: 'La pantalla del catálogo tiene todo en un solo archivo: el HTML, los datos y las acciones. Nadie del equipo se atreve a tocarlo. Sepáralo antes de que apruebe el Pull Request.',
            evidencia: 'GP-ARQ-02',

            induccion: {
                remitente: 'Tech Lead',
                idea: 'MVC divide una pantalla en tres partes: el Modelo (los datos), la Vista (lo que se ve) y el Controlador (lo que responde cuando el usuario hace algo).',
                vidaReal: 'En un restaurante, la cocina guarda los ingredientes y prepara la comida: es el modelo. El plato servido en la mesa es lo que ves: la vista. El mesero toma tu pedido, lo lleva a la cocina y te trae el plato: es el controlador. El mesero no cocina y la cocina no atiende mesas.',
                ejemplos: [
                    {
                        titulo: 'Antes: todo mezclado en un solo archivo',
                        esCorrecto: false,
                        archivo: 'perfil.ts',
                        codigo:
`const usuario = { nombre: 'Ana', edad: 20 };                       // datos
function cambiarNombre(nuevo: string) { usuario.nombre = nuevo; }  // acción
document.body.innerHTML = '<h1>' + usuario.nombre + '</h1>';       // pantalla`
                    },
                    {
                        titulo: 'Modelo: la forma de los datos',
                        esCorrecto: true,
                        archivo: 'usuario.modelo.ts',
                        codigo:
`export interface Usuario {
  nombre: string;
  edad: number;
}`
                    },
                    {
                        titulo: 'Vista: lo que se ve',
                        esCorrecto: true,
                        archivo: 'perfil.componente.html',
                        codigo:
`<h1>{{ usuario.nombre }}</h1>
<button (click)="cambiarNombre('Luis')">Cambiar nombre</button>`
                    },
                    {
                        titulo: 'Controlador: responde al clic',
                        esCorrecto: true,
                        archivo: 'perfil.componente.ts',
                        codigo:
`cambiarNombre(nuevo: string) {
  this.usuario.nombre = nuevo;
}`
                    }
                ],
                guia: {
                    titulo: '¿Cómo sé a dónde va cada bloque?',
                    columnas: ['Pregúntate…', 'Si es así, va en…', 'Archivo'],
                    filas: [
                        ['¿Se ve en pantalla? ¿Tiene etiquetas HTML?', 'Vista', '.componente.html'],
                        ['¿Responde a un clic o coordina qué pasa?', 'Controlador', '.componente.ts'],
                        ['¿Es un dato, la forma de un dato, una forma de pedir datos o una regla del negocio?', 'Modelo', '.modelo.ts o .servicio.ts']
                    ]
                },
                notaAngular: 'El .html del componente es la vista, el .ts del componente es el controlador, y los modelos y servicios forman el modelo.',
                objetivo: 'Reparte los 8 bloques de productos.componente.ts en el archivo correcto.',
                comoJugar: [
                    'Haz clic en un bloque de código para seleccionarlo.',
                    'Haz clic en el archivo a donde debe ir: Vista, Controlador o Modelo.',
                    'Si te equivocas, haz clic en el bloque ya ubicado para moverlo otra vez.',
                    'Cuando ubiques todos, pulsa Verificar.'
                ]
            },

            pistas: [
                'Hazte la pregunta con cada bloque: ¿se ve, responde o es un dato?',
                'Hay 3 bloques de vista: los que tienen HTML. El cálculo del IVA es una regla del negocio.'
            ],

            explicacionFinal: 'Lo que acabas de hacer se llama MVC (Modelo–Vista–Controlador).\n\nSeparaste los datos (Modelo), lo que se ve (Vista) y lo que responde al usuario (Controlador). Ahora, si cambia el diseño, solo tocas el .html. Si cambia la API, solo tocas el servicio. Y el componente queda corto y fácil de leer.',

            moverCodigo: {
                archivoOriginal: 'productos.componente.ts',
                destinos: [
                    { id: 'vista', nombre: 'Vista', archivo: 'productos.componente.html', descripcion: 'Lo que se ve' },
                    { id: 'controlador', nombre: 'Controlador', archivo: 'productos.componente.ts', descripcion: 'Lo que responde' },
                    { id: 'modelo', nombre: 'Modelo', archivo: 'producto.modelo.ts · productos.servicio.ts', descripcion: 'Datos y reglas' }
                ],
                bloques: [
                    {
                        id: 1,
                        codigo: 'agregarAlCarrito(producto: Producto) {\n  this.carrito.push(producto);\n}',
                        destinoCorrecto: 'controlador',
                        explicacion: 'Responde al clic del botón "Agregar": es trabajo del controlador.'
                    },
                    {
                        id: 2,
                        codigo: '<h2>Catálogo de productos</h2>',
                        destinoCorrecto: 'vista',
                        explicacion: 'Tiene etiquetas HTML y se ve en pantalla: es vista.'
                    },
                    {
                        id: 3,
                        codigo: 'export interface Producto {\n  id: number;\n  nombre: string;\n  precio: number;\n}',
                        destinoCorrecto: 'modelo',
                        explicacion: 'Una interface describe la forma de los datos. No se ve en pantalla ni responde clics: es modelo.'
                    },
                    {
                        id: 4,
                        codigo: 'calcularPrecioConIva(precio: number) {\n  return precio * 1.19;\n}',
                        destinoCorrecto: 'modelo',
                        explicacion: 'Trampa común: el IVA es una regla del negocio. Vale igual en el catálogo, el carrito y la factura, por eso va en el modelo y no en el componente.'
                    },
                    {
                        id: 5,
                        codigo: '@for (producto of listaProductos; track producto.id) {\n  <li>{{ producto.nombre }}</li>\n}',
                        destinoCorrecto: 'vista',
                        explicacion: 'Recorre la lista para mostrarla. Mostrar es trabajo de la vista.'
                    },
                    {
                        id: 6,
                        codigo: 'cargarCatalogo() {\n  this.servicioProductos.obtenerProductos();\n}',
                        destinoCorrecto: 'controlador',
                        explicacion: 'Este método no pide los datos por sí mismo: le pide al servicio que lo haga. Coordinar es trabajo del controlador.'
                    },
                    {
                        id: 7,
                        codigo: 'obtenerProductos() {\n  return fetch(\'/api/productos\');\n}',
                        destinoCorrecto: 'modelo',
                        explicacion: 'Pedir datos a la API es trabajo del modelo (un servicio). El controlador solo lo usa.'
                    },
                    {
                        id: 8,
                        codigo: '<button (click)="agregarAlCarrito(producto)">\n  Agregar\n</button>',
                        destinoCorrecto: 'vista',
                        explicacion: 'El botón se ve, así que va en la vista. Lo que pasa al hacer clic (agregarAlCarrito) sí va en el controlador.'
                    }
                ]
            }
        },

        {
            id: 2,
            misionId: 1,
            titulo: 'El viaje de un clic',
            descripcion: 'Ordena el recorrido de un clic por las capas de la aplicación.',
            tipoJuego: 'ordenar-flujo',
            dificultad: 'facil',
            puntos: 100,
            concepto: 'Arquitectura por capas',
            contexto: 'Un cliente dice que al agregar un producto al carrito, el total no cambia. Antes de buscar el error, necesitamos entender por dónde viaja el clic.'
        },

        {
            id: 3,
            misionId: 1,
            titulo: 'El atajo prohibido',
            descripcion: 'Revisa un Pull Request y marca las líneas que se saltan capas.',
            tipoJuego: 'revisar-codigo',
            dificultad: 'media',
            puntos: 150,
            concepto: 'Respetar las capas',
            contexto: 'El Tech Lead rechazó el Pull Request de la pantalla de perfil: el componente se salta capas. Encuentra las líneas que no deberían estar ahí.'
        },

        // ===================== MISIÓN 2 =====================
        {
            id: 4,
            misionId: 2,
            titulo: 'Una sola responsabilidad',
            descripcion: 'Marca lo que no es trabajo de un componente.',
            tipoJuego: 'revisar-codigo',
            dificultad: 'media',
            puntos: 150,
            concepto: 'Principio de responsabilidad única (S)',
            contexto: 'El componente del carrito valida cupones, calcula impuestos y guarda en el navegador. Cada cambio pequeño lo rompe. Encuentra lo que sobra.'
        },

        {
            id: 5,
            misionId: 2,
            titulo: 'El contrato',
            descripcion: 'Escribe las interfaces que faltan para que el código compile.',
            tipoJuego: 'completar-codigo',
            dificultad: 'media',
            puntos: 150,
            concepto: 'Interfaces',
            contexto: 'La API ya responde con los productos, pero el código no sabe qué forma tienen. Escribe el contrato para que el compilador nos ayude a no equivocarnos.'
        },

        {
            id: 6,
            misionId: 2,
            titulo: 'No lo crees, pídelo',
            descripcion: 'Haz que un componente reciba sus dependencias en lugar de crearlas.',
            tipoJuego: 'completar-codigo',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Inyección de dependencias (D)',
            contexto: 'No podemos probar el componente de pedidos porque crea su propio notificador con new. Necesito que lo reciba desde afuera, así mañana podemos cambiar de correo a SMS sin tocarlo.'
        },

        // ===================== MISIÓN 3 =====================
        {
            id: 7,
            misionId: 3,
            titulo: 'El carrito duplicado',
            descripcion: 'Encuentra por qué dos componentes muestran carritos distintos.',
            tipoJuego: 'revisar-codigo',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Patrón Singleton',
            contexto: 'Bug reportado: el encabezado dice "3 productos" y la página del carrito dice "0". Encuentra la causa y corrígela.'
        },

        {
            id: 8,
            misionId: 3,
            titulo: 'Fábrica de notificaciones',
            descripcion: 'Completa la fábrica que crea cada tipo de notificación.',
            tipoJuego: 'completar-codigo',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Patrón Factory',
            contexto: 'Cada pantalla crea sus propias alertas con un if gigante. Centraliza la creación en una fábrica.'
        },

        // ===================== MISIÓN 4 =====================
        {
            id: 9,
            misionId: 4,
            titulo: 'Pull Request #42',
            descripcion: 'Revisa un módulo completo y encuentra todos los problemas de diseño.',
            tipoJuego: 'revisar-codigo',
            dificultad: 'dificil',
            puntos: 300,
            concepto: 'Integración: MVC, capas, SOLID y patrones',
            contexto: 'Antes de salir a producción, el módulo de pedidos necesita tu revisión. Tiene errores de todo lo que has aprendido. Encuéntralos todos.'
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


    obtenerMision(id: number): MisionInfo | undefined {
        return this.misiones.find(mision => mision.id === id);
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

        // La misión actual es la del siguiente reto por jugar
        const siguiente = this.obtenerRetoActual();
        if (siguiente) {
            this.progreso.misionActual = siguiente.misionId;
        }
    }


    sumarPuntos(puntos: number): void {
        this.progreso.puntos += puntos;
    }


    usarAyuda(): void {
        this.progreso.ayudasUsadas++;
    }


    /**
     * Ruta lineal: los retos se completan en orden.
     * Se calcula con retosCompletados (y no con retoActual) porque al terminar
     * el último reto retoActual se queda en el último, pero ya no queda ninguno por hacer.
     */
    obtenerEstadoReto(id: number): EstadoReto {
        if (id <= this.progreso.retosCompletados) {
            return 'completado';
        }
        if (id === this.progreso.retosCompletados + 1) {
            return 'actual';
        }
        return 'bloqueado';
    }


    /** Reto que el jugador debe resolver ahora. undefined si ya terminó la ruta. */
    obtenerRetoActual(): Reto | undefined {
        return this.obtenerReto(this.progreso.retosCompletados + 1);
    }


    /** Suma de los puntos de todos los retos. */
    obtenerPuntosTotales(): number {
        return this.retos.reduce((total, reto) => total + reto.puntos, 0);
    }

}