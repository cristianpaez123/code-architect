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
        { id: 4, titulo: 'Reto final', evidencia: 'GP-ARQ-05' },
        { id: 5, titulo: 'Bonus: microservicios', evidencia: 'GP-ARQ-04' }
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
                definicion: 'MVC (Modelo–Vista–Controlador) es un patrón de arquitectura que divide una aplicación en tres partes: el Modelo (los datos y las reglas del negocio), la Vista (lo que el usuario ve) y el Controlador (el que recibe las acciones del usuario y coordina a los otros dos).',
                idea: 'MVC divide una pantalla en tres partes: el Modelo (los datos), la Vista (lo que se ve) y el Controlador (lo que responde cuando el usuario hace algo).',
                vidaReal: 'En un restaurante, la cocina guarda los ingredientes y prepara la comida: es el modelo. El plato servido en la mesa es lo que ves: la vista. El mesero toma tu pedido, lo lleva a la cocina y te trae el plato: es el controlador. El mesero no cocina y la cocina no atiende mesas.',
                ejemplos: [
                    {
                        titulo: 'Todo mezclado en un solo archivo',
                        esCorrecto: false,
                        archivo: 'perfil.componente.ts',
                        codigo:
                            `@Component({
  selector: 'app-perfil',
  template: '<h1>{{ usuario.nombre }}</h1> <button (click)="cambiarNombre()">Cambiar</button>'
})
export class PerfilComponente {
  usuario = { nombre: 'Ana', edad: 20 };

  cambiarNombre() {
    this.usuario.nombre = 'Luis';
  }

  esMayorDeEdad(): boolean {
    return this.usuario.edad >= 18;
  }
}`,
                        anotaciones: [
                            {
                                linea: 3,
                                marca: 'template:',
                                tipo: 'problema',
                                texto: 'Aquí la VISTA (el HTML de la pantalla) está escrita dentro del .ts. Lo que se ve debería estar en su propio archivo .html.'
                            },
                            {
                                linea: 5,
                                marca: 'class PerfilComponente',
                                tipo: 'clase',
                                texto: 'Esto es una clase: la del componente. Debería ser solo el CONTROLADOR, pero aquí hace de todo.'
                            },
                            {
                                linea: 6,
                                marca: 'usuario',
                                tipo: 'propiedad',
                                texto: 'Esto es una propiedad: guarda los datos del usuario que se muestran en pantalla.'
                            },
                            {
                                linea: 6,
                                marca: "{ nombre: 'Ana', edad: 20 }",
                                tipo: 'problema',
                                texto: 'La forma de los datos (qué tiene un usuario) está improvisada aquí. Debería estar definida en el MODELO: usuario.modelo.ts.'
                            },
                            {
                                linea: 8,
                                marca: 'cambiarNombre()',
                                tipo: 'metodo',
                                texto: 'Esto es un método: responde al clic del botón. Este sí es trabajo del controlador.'
                            },
                            {
                                linea: 12,
                                marca: 'esMayorDeEdad()',
                                tipo: 'problema',
                                texto: 'Una regla del negocio ("mayor de edad = 18 años") dentro del componente. Las reglas van en el MODELO, para usarlas en cualquier pantalla.'
                            }
                        ]
                    },
                    {
                        titulo: 'MODELO: los datos y las reglas',
                        esCorrecto: true,
                        archivo: 'usuario.modelo.ts',
                        codigo:
                            `export interface Usuario {
  nombre: string;
  edad: number;
}

export function esMayorDeEdad(usuario: Usuario): boolean {
  return usuario.edad >= 18;
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'interface Usuario',
                                tipo: 'interface',
                                texto: 'La forma de los datos: todo usuario tiene un nombre y una edad.'
                            },
                            {
                                linea: 2,
                                marca: 'nombre: string',
                                tipo: 'propiedad',
                                texto: 'Una propiedad. ": string" significa que el nombre es texto.'
                            },
                            {
                                linea: 3,
                                marca: 'edad: number',
                                tipo: 'propiedad',
                                texto: 'Otra propiedad. ": number" significa que la edad es un número.'
                            },
                            {
                                linea: 6,
                                marca: 'esMayorDeEdad(usuario: Usuario)',
                                tipo: 'metodo',
                                texto: 'La regla del negocio vive en el modelo. Sirve igual en el perfil, el registro o cualquier pantalla.'
                            }
                        ]
                    },
                    {
                        titulo: 'VISTA: lo que se ve',
                        esCorrecto: true,
                        archivo: 'perfil.componente.html',
                        codigo:
                            `<h1>{{ usuario.nombre }}</h1>
<button (click)="cambiarNombre()">Cambiar nombre</button>`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: '<h1>',
                                tipo: 'html',
                                texto: 'Una etiqueta HTML: un título. Todo lo que se dibuja en pantalla va en el .html.'
                            },
                            {
                                linea: 1,
                                marca: '{{ usuario.nombre }}',
                                tipo: 'dato',
                                texto: 'Las llaves dobles muestran un dato del controlador. Aquí se ve "Ana".'
                            },
                            {
                                linea: 2,
                                marca: '<button',
                                tipo: 'html',
                                texto: 'Otra etiqueta HTML: un botón.'
                            },
                            {
                                linea: 2,
                                marca: '(click)="cambiarNombre()"',
                                tipo: 'evento',
                                texto: 'Un evento: cuando el usuario hace clic, se ejecuta el método cambiarNombre() del controlador.'
                            }
                        ]
                    },
                    {
                        titulo: 'CONTROLADOR: responde al usuario',
                        esCorrecto: true,
                        archivo: 'perfil.componente.ts',
                        codigo:
                            `export class PerfilComponente {
  usuario: Usuario = { nombre: 'Ana', edad: 20 };

  cambiarNombre() {
    this.usuario.nombre = 'Luis';
  }
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'class PerfilComponente',
                                tipo: 'clase',
                                texto: 'La clase del componente: conecta la vista con el modelo.'
                            },
                            {
                                linea: 2,
                                marca: 'usuario: Usuario',
                                tipo: 'propiedad',
                                texto: 'Una propiedad que usa la forma definida en el modelo (Usuario).'
                            },
                            {
                                linea: 4,
                                marca: 'cambiarNombre()',
                                tipo: 'metodo',
                                texto: 'El método que responde al clic. Coordinar lo que pasa es el trabajo del controlador.'
                            }
                        ]
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
            contexto: 'Un cliente dice que al agregar un producto al carrito, el total no cambia. Antes de buscar el error, necesitamos entender por dónde viaja el clic.',
            evidencia: 'GP-ARQ-01',

            induccion: {
                remitente: 'Soporte',
                definicion: 'La arquitectura por capas organiza el software en niveles, cada uno con una responsabilidad: presentación, lógica de negocio y acceso a datos. Cada capa solo se comunica con la capa vecina: las peticiones bajan y las respuestas suben por el mismo camino.',
                idea: 'La arquitectura por capas organiza el código en niveles, y cada capa solo habla con la que tiene justo debajo. Una acción baja por las capas y la respuesta sube por el mismo camino.',
                vidaReal: 'Cuando pides un domicilio: tú tocas "Pedir" en la app (presentación). La app le pasa el pedido al restaurante, que revisa si hay ingredientes (lógica de negocio). El restaurante saca los ingredientes de su bodega (acceso a datos). La comida vuelve por el mismo camino hasta tu puerta. Tú nunca entras a la bodega.',
                ejemplos: [
                    {
                        titulo: 'El camino de ida y vuelta',
                        codigo:
                            `  PRESENTACIÓN  ──►  LÓGICA DE NEGOCIO  ──►  ACCESO A DATOS  ──►  API
  (vista y         (servicio:             (habla con             (servidor)
   componente)      revisa reglas)         la API)                   │
       ▲                                                             │
       └──────────────────  la respuesta sube  ◄─────────────────────┘`
                    },
                    {
                        titulo: '1. Vista: el usuario hace clic',
                        esCorrecto: true,
                        archivo: 'publicacion.componente.html',
                        codigo: `<button (click)="darMeGusta()">❤️</button>`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: '<button',
                                tipo: 'html',
                                texto: 'PRESENTACIÓN: una etiqueta HTML, el botón que el usuario ve.'
                            },
                            {
                                linea: 1,
                                marca: '(click)="darMeGusta()"',
                                tipo: 'evento',
                                texto: 'Un evento: con el clic empieza el viaje. Se llama al método darMeGusta() del componente.'
                            }
                        ]
                    },
                    {
                        titulo: '2. Componente: le pasa el trabajo al servicio',
                        esCorrecto: true,
                        archivo: 'publicacion.componente.ts',
                        codigo:
                            `darMeGusta() {
  this.servicioPublicacion.sumarMeGusta(this.idPublicacion);
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'darMeGusta()',
                                tipo: 'metodo',
                                texto: 'Un método del componente: recibe el clic.'
                            },
                            {
                                linea: 2,
                                marca: 'this.servicioPublicacion.sumarMeGusta(this.idPublicacion)',
                                tipo: 'metodo',
                                texto: 'Baja a la capa de LÓGICA DE NEGOCIO: el componente le pide el trabajo al servicio.'
                            }
                        ]
                    },
                    {
                        titulo: '3. Servicio: revisa la regla y llama a la API',
                        esCorrecto: true,
                        archivo: 'publicacion.servicio.ts',
                        codigo:
                            `sumarMeGusta(id: number) {
  if (this.yaDioMeGusta(id)) { return; }
  return this.apiPublicacion.guardarMeGusta(id);
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'sumarMeGusta(id: number)',
                                tipo: 'metodo',
                                texto: 'LÓGICA DE NEGOCIO: el método del servicio. Recibe el id de la publicación (un número).'
                            },
                            {
                                linea: 2,
                                marca: 'this.yaDioMeGusta(id)',
                                tipo: 'metodo',
                                texto: 'Revisa la regla del negocio: no se puede dar "me gusta" dos veces.'
                            },
                            {
                                linea: 3,
                                marca: 'this.apiPublicacion.guardarMeGusta(id)',
                                tipo: 'metodo',
                                texto: 'Baja a la capa de ACCESO A DATOS, la única que habla con la API.'
                            }
                        ]
                    },
                    {
                        titulo: '4. De vuelta: el componente actualiza la vista',
                        esCorrecto: true,
                        archivo: 'publicacion.componente.ts',
                        codigo:
                            `.subscribe(respuesta => {
  this.totalMeGusta = respuesta.total;
});`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: '.subscribe(',
                                tipo: 'metodo',
                                texto: 'subscribe espera la respuesta que SUBE desde la API.'
                            },
                            {
                                linea: 2,
                                marca: 'this.totalMeGusta',
                                tipo: 'propiedad',
                                texto: 'Se guarda el dato nuevo en una propiedad del componente, y la vista se actualiza sola.'
                            }
                        ]
                    },
                    {
                        titulo: '5. La vista muestra el resultado',
                        esCorrecto: true,
                        archivo: 'publicacion.componente.html',
                        codigo: `<p>{{ totalMeGusta }} me gusta</p>`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: '<p>',
                                tipo: 'html',
                                texto: 'Una etiqueta HTML: un párrafo.'
                            },
                            {
                                linea: 1,
                                marca: '{{ totalMeGusta }}',
                                tipo: 'dato',
                                texto: 'Muestra el total nuevo. El viaje terminó donde empezó: en la vista.'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: 'Las capas en un proyecto frontend',
                    columnas: ['Su trabajo', 'Capa', 'Archivo'],
                    filas: [
                        ['Mostrar cosas y recibir lo que hace el usuario', 'Presentación', '.componente.html · .componente.ts'],
                        ['Aplicar las reglas: validar, calcular, decidir', 'Lógica de negocio', '.servicio.ts'],
                        ['Hablar con la API (http.get, http.post)', 'Acceso a datos', '.api.ts'],
                        ['Guardar la información y responder', 'Datos', 'API / servidor']
                    ]
                },
                notaAngular: 'Cuando en un componente escribes this.servicio.metodo(), bajas de la capa de presentación a la de lógica. Cuando usas .subscribe(), esperas la respuesta que sube.',
                objetivo: 'Ordena los 7 fragmentos en el orden en que se ejecutan cuando el usuario pulsa "Agregar al carrito".',
                comoJugar: [
                    'Los fragmentos aparecen desordenados. Cada uno dice de qué archivo y de qué capa viene.',
                    'Usa las flechas ▲ ▼ para subir o bajar cada fragmento.',
                    'Cuando creas que están en orden, pulsa Verificar.',
                    'Los que estén mal ubicados se marcan en rojo, con una explicación y hacia dónde moverlos.'
                ]
            },

            pistas: [
                'El viaje empieza y termina en el .html: lo primero es el clic y lo último es lo que el usuario ve.',
                'El servicio revisa el stock ANTES de llamar a la API. Y el .subscribe() solo puede pasar después de que la API responde.'
            ],

            explicacionFinal: 'Lo que acabas de recorrer es la arquitectura por capas.\n\nEl clic bajó por Presentación → Lógica de negocio → Acceso a datos hasta la API, y la respuesta subió por el mismo camino. Ninguna capa se saltó a otra.\n\n¿Y el bug del ticket? Si el componente no se suscribe a la respuesta (paso 6), la vista nunca se entera del nuevo total. Conocer las capas te dice dónde buscar un error.',

            ordenarFlujo: {
                pasos: [
                    {
                        id: 1,
                        archivo: 'carrito.componente.html',
                        capa: 'presentacion',
                        codigo: '<button (click)="agregar(producto)">\n  Agregar al carrito\n</button>',
                        explicacion: 'Todo empieza en lo que el usuario toca: el botón de la vista.'
                    },
                    {
                        id: 2,
                        archivo: 'carrito.componente.ts',
                        capa: 'presentacion',
                        codigo: 'agregar(producto: Producto) {\n  this.servicioCarrito.agregarProducto(producto);\n}',
                        explicacion: 'El componente recibe el clic y le pasa el trabajo al servicio. Pasa justo después del clic.'
                    },
                    {
                        id: 3,
                        archivo: 'carrito.servicio.ts',
                        capa: 'logica',
                        codigo: 'agregarProducto(producto: Producto) {\n  if (producto.stock === 0) {\n    return \'Sin existencias\';\n  }\n  return this.apiCarrito.guardarEnCarrito(producto);\n}',
                        explicacion: 'Antes de ir a la API, el servicio revisa la regla del negocio: ¿hay stock?'
                    },
                    {
                        id: 4,
                        archivo: 'carrito.api.ts',
                        capa: 'datos',
                        codigo: 'guardarEnCarrito(producto: Producto) {\n  return this.http.post(\'/api/carrito\', producto);\n}',
                        explicacion: 'Solo después de validar, la capa de acceso a datos habla con la API.'
                    },
                    {
                        id: 5,
                        archivo: 'Servidor',
                        capa: 'servidor',
                        codigo: '// La API guarda el producto y responde:\n{ "totalCompra": 45000 }',
                        explicacion: 'La API solo puede responder después de recibir la petición. Su respuesta sube por el mismo camino.'
                    },
                    {
                        id: 6,
                        archivo: 'carrito.componente.ts',
                        capa: 'presentacion',
                        codigo: '.subscribe(respuesta => {\n  this.totalCompra = respuesta.totalCompra;\n});',
                        explicacion: 'El componente recibe la respuesta y actualiza su variable. Si falta este paso, la pantalla nunca se entera (¡ese es el bug del ticket!).'
                    },
                    {
                        id: 7,
                        archivo: 'carrito.componente.html',
                        capa: 'presentacion',
                        codigo: '<p>Total: {{ totalCompra }}</p>',
                        explicacion: 'El viaje termina donde empezó: en la vista, mostrando el total nuevo.'
                    }
                ]
            }
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
            contexto: 'Un compañero subió la pantalla de perfil y funciona, pero el componente se salta capas. Antes de aprobar el Pull Request, encuentra las líneas que no deberían estar ahí.',
            evidencia: 'GP-ARQ-01',

            induccion: {
                remitente: 'Tech Lead',
                definicion: 'Respetar las capas significa que ninguna capa se salta a otra: el componente (presentación) solo habla con su servicio (lógica de negocio), y solo el servicio habla con la API o con el almacenamiento. Saltarse una capa crea un acoplamiento que hace el código difícil de cambiar.',
                idea: 'En una arquitectura por capas, el componente solo habla con su servicio. Si el componente llama directo a la API o guarda datos por su cuenta, se está "saltando una capa".',
                vidaReal: 'En un restaurante, el mesero toma tu pedido y se lo pasa a la cocina. Si el mesero entra a la bodega a sacar ingredientes él mismo, la cocina pierde el control: nadie sabe qué se gastó, y cuando algo falte nadie sabrá por qué. Cada uno hace su parte y le pide al siguiente.',
                ejemplos: [
                    {
                        titulo: 'Con atajo: el componente va directo a la API',
                        esCorrecto: false,
                        archivo: 'pedidos.componente.ts',
                        codigo:
                            `export class PedidosComponente {
  pedidos: Pedido[] = [];

  constructor(private http: HttpClient) {}

  cargar() {
    this.http.get<Pedido[]>('/api/pedidos')
      .subscribe(datos => this.pedidos = datos);
  }
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'class PedidosComponente',
                                tipo: 'clase',
                                texto: 'La clase del componente: es la capa de PRESENTACIÓN.'
                            },
                            {
                                linea: 2,
                                marca: 'pedidos',
                                tipo: 'propiedad',
                                texto: 'Una propiedad que guarda la lista de pedidos que se ve en pantalla.'
                            },
                            {
                                linea: 4,
                                marca: 'private http: HttpClient',
                                tipo: 'problema',
                                texto: 'El componente pide HttpClient: se está preparando para hablar directo con la API.'
                            },
                            {
                                linea: 7,
                                marca: "this.http.get<Pedido[]>('/api/pedidos')",
                                tipo: 'problema',
                                texto: 'El atajo: la presentación llama a la API saltándose la capa de lógica (el servicio).'
                            }
                        ]
                    },
                    {
                        titulo: 'Sin atajo: el componente le pide al servicio',
                        esCorrecto: true,
                        archivo: 'pedidos.componente.ts',
                        codigo:
                            `export class PedidosComponente {
  pedidos: Pedido[] = [];

  constructor(private pedidoServicio: PedidoServicio) {}

  cargar() {
    this.pedidoServicio.obtenerPedidos()
      .subscribe(datos => this.pedidos = datos);
  }
}`,
                        anotaciones: [
                            {
                                linea: 4,
                                marca: 'constructor',
                                tipo: 'constructor',
                                texto: 'El constructor: aquí el componente pide lo que necesita. Pide su servicio, no HttpClient.'
                            },
                            {
                                linea: 7,
                                marca: 'this.pedidoServicio.obtenerPedidos()',
                                tipo: 'metodo',
                                texto: 'Le pide los datos a la capa de abajo. Cómo los consigue es problema del servicio.'
                            },
                            {
                                linea: 8,
                                marca: '.subscribe(',
                                tipo: 'metodo',
                                texto: 'Espera la respuesta igual que antes: esto no cambia.'
                            }
                        ]
                    },
                    {
                        titulo: 'El servicio es el que habla con la API',
                        esCorrecto: true,
                        archivo: 'pedido.servicio.ts',
                        codigo:
                            `@Injectable({ providedIn: 'root' })
export class PedidoServicio {
  constructor(private http: HttpClient) {}

  obtenerPedidos() {
    return this.http.get<Pedido[]>('/api/pedidos');
  }
}`,
                        anotaciones: [
                            {
                                linea: 2,
                                marca: 'class PedidoServicio',
                                tipo: 'clase',
                                texto: 'La clase del servicio: la capa de LÓGICA y ACCESO A DATOS.'
                            },
                            {
                                linea: 3,
                                marca: 'private http: HttpClient',
                                tipo: 'inyeccion',
                                texto: 'Aquí sí: en un servicio, pedir HttpClient es correcto.'
                            },
                            {
                                linea: 6,
                                marca: "this.http.get<Pedido[]>('/api/pedidos')",
                                tipo: 'metodo',
                                texto: 'La llamada a la API ahora está en su lugar.'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: 'Señales de un atajo dentro de un componente',
                    columnas: ['Si ves esto en un componente…', '¿Es un atajo?', 'Dónde debería estar'],
                    filas: [
                        ['import { HttpClient }', 'Sí ❌', 'En el servicio o en su archivo .api.ts'],
                        ['private http: HttpClient (en el constructor)', 'Sí ❌', 'En el servicio o en su archivo .api.ts'],
                        ['this.http.get(...) · this.http.post(...)', 'Sí ❌', 'En el servicio o en su archivo .api.ts'],
                        ['localStorage.getItem / setItem / removeItem', 'Sí ❌', 'En un servicio'],
                        ['private perfilServicio: PerfilServicio', 'No ✅', 'Está bien: el componente pide su servicio'],
                        ['this.perfilServicio.algo().subscribe(...)', 'No ✅', 'Está bien: así se habla con la capa de abajo'],
                        ['this.mensaje = \'...\'', 'No ✅', 'Está bien: actualizar la pantalla es trabajo del componente']
                    ]
                },
                notaAngular: 'En Angular, HttpClient es la herramienta para hablar con la API. Por eso, ver HttpClient dentro de un componente es casi siempre una alarma: esa herramienta pertenece a la capa de acceso a datos.',
                objetivo: 'Revisa perfil.componente.ts y marca las 4 líneas que se saltan capas.',
                comoJugar: [
                    'Lee el archivo completo, como si fueras quien revisa el Pull Request.',
                    'Haz clic en una línea para marcarla como problema. Haz clic otra vez para desmarcarla.',
                    'Cuando termines, pulsa Enviar revisión.',
                    'Cada línea marcada recibe un comentario: si era un problema o si estaba bien. Si te falta alguno, te decimos cuántos.'
                ]
            },

            pistas: [
                'Busca todo lo que tenga que ver con HttpClient: aparece en 3 lugares distintos del archivo (cuando se importa, cuando se pide y cuando se usa).',
                'El cuarto problema no usa HttpClient: busca dónde el componente borra datos del navegador por su cuenta.'
            ],

            explicacionFinal: 'Así revisa código un Tech Lead: no basta con que funcione, tiene que respetar las capas.\n\nEl componente tenía 4 atajos: 3 para hablar directo con la API (importar, pedir y usar HttpClient) y 1 para borrar datos del navegador sin pasar por el servicio.\n\nCuando el componente solo habla con su servicio, puedes cambiar la API o la forma de guardar datos sin tocar la pantalla. Y si algo falla con los datos, sabes que el error está en el servicio, no repartido en 20 componentes.',

            revisarCodigo: {
                archivo: 'perfil.componente.ts',
                codigo:
                    `import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilServicio } from '../servicios/perfil.servicio';
import { Usuario } from '../modelos/usuario.modelo';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.componente.html'
})
export class PerfilComponente implements OnInit {
  usuario?: Usuario;
  mensaje = '';

  constructor(
    private perfilServicio: PerfilServicio,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<Usuario>('/api/usuarios/7')
      .subscribe(datos => this.usuario = datos);
  }

  guardar(nombre: string) {
    this.perfilServicio.actualizarNombre(nombre)
      .subscribe(() => this.mensaje = 'Perfil guardado');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.mensaje = 'Hasta pronto';
  }
}`,
                problemas: [
                    {
                        linea: 2,
                        comentario: 'HttpClient es la herramienta para hablar con la API. Si el componente la importa, es porque piensa saltarse el servicio. Esta importación va en el servicio (o en su .api.ts).'
                    },
                    {
                        linea: 16,
                        comentario: 'El componente pide HttpClient en el constructor: se está preparando para ir directo a la API. Solo debería pedir PerfilServicio.'
                    },
                    {
                        linea: 20,
                        comentario: 'Aquí está el atajo: el componente llama a la API sin pasar por el servicio. Debería ser this.perfilServicio.obtenerUsuario(7).'
                    },
                    {
                        linea: 30,
                        comentario: 'localStorage es almacenamiento de datos. Borrar el token es trabajo del servicio (por ejemplo this.perfilServicio.cerrarSesion()), no de la pantalla.'
                    }
                ],
                falsasAlarmas: [
                    {
                        linea: 3,
                        comentario: 'Importar el servicio está bien: es la forma correcta de pedirle trabajo a la capa de abajo.'
                    },
                    {
                        linea: 15,
                        comentario: 'Pedir PerfilServicio en el constructor es correcto. Así el componente habla con la capa de lógica (lo verás a fondo en la Misión 2: inyección de dependencias).'
                    },
                    {
                        linea: 21,
                        comentario: 'El .subscribe() está bien: así el componente espera cualquier respuesta. El problema está una línea arriba, en DE DÓNDE viene esa respuesta.'
                    },
                    {
                        linea: 25,
                        comentario: 'Así debe ser: el componente le pide al servicio que guarde. No sabe ni le importa cómo lo hace.'
                    },
                    {
                        linea: 26,
                        comentario: 'Esperar la respuesta del servicio y mostrar un mensaje es trabajo normal del componente.'
                    },
                    {
                        linea: 31,
                        comentario: 'Cambiar el mensaje que se ve en pantalla es justo el trabajo del componente.'
                    }
                ],
                codigoCorregido:
                    `import { Component, OnInit } from '@angular/core';
import { PerfilServicio } from '../servicios/perfil.servicio';
import { Usuario } from '../modelos/usuario.modelo';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.componente.html'
})
export class PerfilComponente implements OnInit {
  usuario?: Usuario;
  mensaje = '';

  constructor(private perfilServicio: PerfilServicio) {}

  ngOnInit() {
    this.perfilServicio.obtenerUsuario(7)
      .subscribe(datos => this.usuario = datos);
  }

  guardar(nombre: string) {
    this.perfilServicio.actualizarNombre(nombre)
      .subscribe(() => this.mensaje = 'Perfil guardado');
  }

  cerrarSesion() {
    this.perfilServicio.cerrarSesion();
    this.mensaje = 'Hasta pronto';
  }
}`
            }
        },

        // ===================== MISIÓN 2 =====================
        {
            id: 4,
            misionId: 2,
            titulo: 'Una sola responsabilidad',
            descripcion: 'Revisa un servicio que hace de todo y marca lo que no es su trabajo.',
            tipoJuego: 'revisar-codigo',
            dificultad: 'media',
            puntos: 150,
            concepto: 'Principio de Responsabilidad Única (la S de SOLID)',
            contexto: 'Cada vez que cambian el proveedor de correos o el formato de la factura, se daña el carrito. Revisa carrito.servicio.ts: está haciendo trabajos que no son suyos.',
            evidencia: 'GP-ARQ-03',

            induccion: {
                remitente: 'Tech Lead',
                definicion: 'El Principio de Responsabilidad Única (SRP, la S de SOLID) dice que una clase debe tener una sola responsabilidad, es decir, una sola razón para cambiar. Si una clase hace varios trabajos, un cambio en uno de ellos puede romper los demás.',
                idea: 'Cada clase debe tener un solo trabajo. Si para explicar lo que hace una clase tienes que decir "y… y… y…", tiene demasiadas responsabilidades y hay que repartirlas.',
                vidaReal: 'En una panadería, el panadero hornea, el cajero cobra y el domiciliario entrega. Si el panadero también cobra y sale a hacer domicilios, se le quema el pan. Y si cambia la forma de pago, hay que volver a entrenar al panadero. Cuando cada uno tiene un solo trabajo, un cambio solo afecta a una persona.',
                ejemplos: [
                    {
                        titulo: 'Antes: un servicio con dos trabajos',
                        esCorrecto: false,
                        archivo: 'usuario.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioServicio {
  constructor(private http: HttpClient) {}

  registrar(nombre: string, correo: string) {
    return this.http.post('/api/usuarios', { nombre, correo });
  }

  enviarBienvenida(correo: string) {
    return this.http.post('/api/correos', { para: correo, asunto: 'Bienvenido' });
  }
}`,
                        anotaciones: [
                            {
                                linea: 5,
                                marca: 'class UsuarioServicio',
                                tipo: 'clase',
                                texto: 'Una clase que debería tener UN solo trabajo: manejar usuarios.'
                            },
                            {
                                linea: 6,
                                marca: 'constructor',
                                tipo: 'constructor',
                                texto: 'Pide HttpClient para hablar con la API. Esto está bien.'
                            },
                            {
                                linea: 8,
                                marca: 'registrar(nombre: string, correo: string)',
                                tipo: 'metodo',
                                texto: 'Trabajo 1: registrar usuarios. Este sí es su trabajo.'
                            },
                            {
                                linea: 12,
                                marca: 'enviarBienvenida(correo: string)',
                                tipo: 'problema',
                                texto: 'Trabajo 2: enviar correos. Es otra responsabilidad: si cambia el proveedor de correos, habría que tocar el servicio de usuarios.'
                            }
                        ]
                    },
                    {
                        titulo: 'Después (1 de 2): solo registra usuarios',
                        esCorrecto: true,
                        archivo: 'usuario.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioServicio {
  constructor(private http: HttpClient) {}

  registrar(nombre: string, correo: string) {
    return this.http.post('/api/usuarios', { nombre, correo });
  }
}`,
                        anotaciones: [
                            {
                                linea: 5,
                                marca: 'class UsuarioServicio',
                                tipo: 'clase',
                                texto: 'Ahora la clase solo maneja usuarios.'
                            },
                            {
                                linea: 8,
                                marca: 'registrar(nombre: string, correo: string)',
                                tipo: 'metodo',
                                texto: 'Su único trabajo. Si cambian los correos, esta clase ni se entera.'
                            }
                        ]
                    },
                    {
                        titulo: 'Después (2 de 2): solo envía correos',
                        esCorrecto: true,
                        archivo: 'correo.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CorreoServicio {
  constructor(private http: HttpClient) {}

  enviar(para: string, asunto: string) {
    return this.http.post('/api/correos', { para, asunto });
  }
}`,
                        anotaciones: [
                            {
                                linea: 5,
                                marca: 'class CorreoServicio',
                                tipo: 'clase',
                                texto: 'Una clase nueva con un solo trabajo: enviar correos.'
                            },
                            {
                                linea: 8,
                                marca: 'enviar(para: string, asunto: string)',
                                tipo: 'metodo',
                                texto: 'Sirve para cualquier correo, no solo el de bienvenida.'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: 'Pregunta clave: ¿esto es trabajo del carrito?',
                    columnas: ['Si el código…', 'Su trabajo es…', '¿Dónde debería estar?'],
                    filas: [
                        ['Agrega, quita o suma productos', 'Manejar el carrito', 'CarritoServicio ✅'],
                        ['Usa alert() o muestra mensajes', 'Mostrar en pantalla', 'El componente'],
                        ['Da formato para mostrar ($, puntos de mil, fechas)', 'Presentar datos', 'La vista, con un pipe: {{ total | currency }}'],
                        ['Envía correos o notificaciones', 'Notificar', 'CorreoServicio'],
                        ['Genera facturas, PDF o reportes', 'Facturar', 'FacturaServicio']
                    ]
                },
                notaAngular: 'En Angular, cada clase con @Injectable debería tener un solo trabajo. Crear un servicio nuevo cuesta un comando (ng g s correo), así que no hay excusa para meterlo todo en uno solo.',
                objetivo: 'Revisa carrito.servicio.ts y marca las 4 cosas que NO son trabajo del carrito.',
                comoJugar: [
                    'Lee el archivo completo. Para cada parte pregúntate: "¿esto es agregar, quitar o sumar productos?".',
                    'Haz clic en una línea para marcarla. Si todo un método sobra, basta con marcar una de sus líneas.',
                    'Cuando termines, pulsa Enviar revisión.',
                    'Al final verás el código corregido completo: cómo se reparte el trabajo en varios archivos.'
                ]
            },

            pistas: [
                'Dentro de agregar() hay 2 problemas: una línea muestra algo en pantalla y otra envía un correo.',
                'Los otros 2 problemas son métodos completos: uno prepara un texto para mostrar y el otro genera un documento.'
            ],

            explicacionFinal: 'Acabas de aplicar la S de SOLID: el Principio de Responsabilidad Única.\n\nCarritoServicio tenía 5 trabajos: manejar el carrito, mostrar alertas, enviar correos, dar formato al precio y generar facturas. Ahora cada trabajo tiene su lugar: el componente muestra los mensajes, la vista da formato con el pipe currency, CorreoServicio envía correos y FacturaServicio genera facturas.\n\n¿La ventaja? Si mañana cambia el proveedor de correos, solo tocas CorreoServicio. El carrito ni se entera.\n\nFíjate en el componente corregido: ahora pide varios servicios en su constructor. Eso se llama inyección de dependencias, y es lo que verás en los próximos retos.',

            revisarCodigo: {
                archivo: 'carrito.servicio.ts',
                codigo:
                    `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../modelos/producto.modelo';

@Injectable({ providedIn: 'root' })
export class CarritoServicio {
  private productos: Producto[] = [];

  constructor(private http: HttpClient) {}

  agregar(producto: Producto) {
    this.productos.push(producto);
    alert('¡' + producto.nombre + ' agregado!');
    this.http.post('/api/correos', { asunto: 'Agregaste ' + producto.nombre }).subscribe();
  }

  quitar(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  calcularTotal(): number {
    return this.productos.reduce((suma, p) => suma + p.precio, 0);
  }

  textoDelTotal(): string {
    return '$ ' + this.calcularTotal().toLocaleString('es-CO');
  }

  generarFactura() {
    const lineas = this.productos.map(p => p.nombre + ': ' + p.precio);
    this.http.post('/api/facturas/pdf', { lineas }).subscribe();
  }
}`,
                problemas: [
                    {
                        linea: 13,
                        comentario: 'alert() muestra algo en pantalla, y eso es trabajo del componente. Un servicio no debería saber cómo se ve la app: hoy es un alert, mañana un mensaje bonito, y el carrito no tendría por qué cambiar.'
                    },
                    {
                        linea: 14,
                        comentario: 'Enviar correos es otro trabajo: notificar. Por eso cambiar el proveedor de correos rompía el carrito. Va en CorreoServicio.'
                    },
                    {
                        linea: 25,
                        hasta: 27,
                        comentario: 'Poner "$" y puntos de mil es preparar el dato para mostrarlo: eso es de la vista. En Angular se hace con un pipe: {{ total | currency:\'COP\' }}. El carrito solo entrega el número.'
                    },
                    {
                        linea: 29,
                        hasta: 32,
                        comentario: 'Generar facturas es un trabajo completo y distinto (facturar). Si cambia el formato de la factura, no debería tocarse el carrito. Va en FacturaServicio.'
                    }
                ],
                falsasAlarmas: [
                    {
                        linea: 2,
                        comentario: 'Importar HttpClient en un servicio no es un error: los servicios sí pueden hablar con la API. Al final, cuando el correo y la factura salgan de aquí, el carrito ya no lo necesitará, pero el problema son los trabajos de más, no esta línea.'
                    },
                    {
                        linea: 9,
                        comentario: 'Un servicio puede pedir HttpClient. El problema no es la herramienta, sino para qué la usa (correos y facturas).'
                    },
                    {
                        linea: 7,
                        comentario: 'Guardar la lista de productos es justo el trabajo del carrito.'
                    },
                    {
                        linea: 11,
                        hasta: 12,
                        comentario: 'Agregar el producto a la lista es trabajo del carrito. Lo que sobra son otras líneas dentro de este método.'
                    },
                    {
                        linea: 17,
                        hasta: 19,
                        comentario: 'Quitar productos es trabajo del carrito.'
                    },
                    {
                        linea: 21,
                        hasta: 23,
                        comentario: 'Trampa común: calcular el total SÍ es trabajo del carrito (es sumar sus productos). Lo que no es suyo es darle formato para mostrarlo.'
                    }
                ],
                archivosCorregidos: [
                    {
                        archivo: 'carrito.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto.modelo';

@Injectable({ providedIn: 'root' })
export class CarritoServicio {
  private productos: Producto[] = [];

  agregar(producto: Producto) {
    this.productos.push(producto);
  }

  quitar(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  calcularTotal(): number {
    return this.productos.reduce((suma, p) => suma + p.precio, 0);
  }

  obtenerProductos(): Producto[] {
    return this.productos;
  }
}`
                    },
                    {
                        archivo: 'correo.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CorreoServicio {
  constructor(private http: HttpClient) {}

  enviar(asunto: string) {
    return this.http.post('/api/correos', { asunto });
  }
}`
                    },
                    {
                        archivo: 'factura.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../modelos/producto.modelo';

@Injectable({ providedIn: 'root' })
export class FacturaServicio {
  constructor(private http: HttpClient) {}

  generar(productos: Producto[]) {
    const lineas = productos.map(p => p.nombre + ': ' + p.precio);
    return this.http.post('/api/facturas/pdf', { lineas });
  }
}`
                    },
                    {
                        archivo: 'carrito.componente.ts',
                        codigo:
                            `import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CarritoServicio } from '../servicios/carrito.servicio';
import { CorreoServicio } from '../servicios/correo.servicio';
import { FacturaServicio } from '../servicios/factura.servicio';
import { Producto } from '../modelos/producto.modelo';

@Component({
  selector: 'app-carrito',
  imports: [CurrencyPipe],
  templateUrl: './carrito.componente.html'
})
export class CarritoComponente {
  mensaje = '';

  constructor(
    private carritoServicio: CarritoServicio,
    private correoServicio: CorreoServicio,
    private facturaServicio: FacturaServicio
  ) {}

  get total(): number {
    return this.carritoServicio.calcularTotal();
  }

  agregar(producto: Producto) {
    this.carritoServicio.agregar(producto);
    this.mensaje = '¡' + producto.nombre + ' agregado!';
    this.correoServicio.enviar('Agregaste ' + producto.nombre).subscribe();
  }

  pedirFactura() {
    const productos = this.carritoServicio.obtenerProductos();
    this.facturaServicio.generar(productos).subscribe();
  }
}`
                    },
                    {
                        archivo: 'carrito.componente.html',
                        codigo:
                            `<p>{{ mensaje }}</p>

<p>Total: {{ total | currency:'COP' }}</p>

<button (click)="pedirFactura()">Descargar factura</button>`
                    }
                ]
            }
        },

        {
            id: 5,
            misionId: 2,
            titulo: 'El contrato',
            descripcion: 'Completa una interface y la clase que la cumple para agregar pagos con Nequi.',
            tipoJuego: 'completar-codigo',
            dificultad: 'media',
            puntos: 150,
            concepto: 'Interfaces (contratos)',
            contexto: 'Los clientes quieren pagar con Nequi. La caja ya acepta tarjeta, y el equipo dejó listo el contrato MetodoPago a medias. Complétalo y crea PagoNequi sin tocar la lógica de la caja.',
            evidencia: 'GP-ARQ-03',

            induccion: {
                remitente: 'Tech Lead',
                definicion: 'Una interface es un contrato que define qué propiedades y métodos debe tener una clase, sin decir cómo se implementan. Las clases la cumplen con implements, y así se pueden usar en el mismo lugar sin importar cuál sea.',
                idea: 'Una interface es un contrato: dice QUÉ debe tener una clase (sus propiedades y métodos), pero no CÓMO lo hace. Cualquier clase que firme el contrato con implements se puede usar en el mismo lugar.',
                vidaReal: 'Los enchufes de tu casa son un contrato: dos patas con cierta forma. Al enchufe no le importa si conectas una licuadora, un cargador o un televisor: si cumple la forma, funciona. Y cuando compras un aparato nuevo, no tienes que cambiar el enchufe de la pared.',
                ejemplos: [
                    {
                        titulo: 'El contrato: qué debe tener un exportador',
                        archivo: 'exportador.ts',
                        codigo:
                            `export interface Exportador {
  formato: string;
  exportar(datos: string[]): string;
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'interface Exportador',
                                tipo: 'interface',
                                texto: 'Esto es una interface llamada Exportador: un contrato. Dice qué debe tener todo exportador, pero no tiene código adentro.'
                            },
                            {
                                linea: 2,
                                marca: 'formato: string',
                                tipo: 'propiedad',
                                texto: 'Una propiedad que todo exportador debe tener: el nombre del formato (texto).'
                            },
                            {
                                linea: 3,
                                marca: 'exportar(datos: string[])',
                                tipo: 'metodo',
                                texto: 'Un método que todo exportador debe tener. Recibe una lista de textos y devuelve un texto.'
                            }
                        ]
                    },
                    {
                        titulo: 'Clase que cumple el contrato',
                        esCorrecto: true,
                        archivo: 'exportador-excel.ts',
                        codigo:
                            `import { Exportador } from './exportador';

export class ExportadorExcel implements Exportador {
  formato = 'Excel';

  exportar(datos: string[]): string {
    return datos.join(';');
  }
}`,
                        anotaciones: [
                            {
                                linea: 3,
                                marca: 'class ExportadorExcel',
                                tipo: 'clase',
                                texto: 'Una clase: esta sí hace el trabajo de exportar.'
                            },
                            {
                                linea: 3,
                                marca: 'implements Exportador',
                                tipo: 'interface',
                                texto: 'implements = "firmo el contrato". Ahora la clase está obligada a tener formato y exportar().'
                            },
                            {
                                linea: 4,
                                marca: "formato = 'Excel'",
                                tipo: 'propiedad',
                                texto: 'Cumple la propiedad que pide el contrato.'
                            },
                            {
                                linea: 6,
                                marca: 'exportar(datos: string[])',
                                tipo: 'metodo',
                                texto: 'Cumple el método que pide el contrato, a su manera: separa los datos con punto y coma.'
                            }
                        ]
                    },
                    {
                        titulo: 'Otra clase que cumple el mismo contrato',
                        esCorrecto: true,
                        archivo: 'exportador-pdf.ts',
                        codigo:
                            `import { Exportador } from './exportador';

export class ExportadorPdf implements Exportador {
  formato = 'PDF';

  exportar(datos: string[]): string {
    return 'PDF con ' + datos.length + ' filas';
  }
}`,
                        anotaciones: [
                            {
                                linea: 3,
                                marca: 'implements Exportador',
                                tipo: 'interface',
                                texto: 'Firma el mismo contrato que ExportadorExcel.'
                            },
                            {
                                linea: 6,
                                marca: 'exportar(datos: string[])',
                                tipo: 'metodo',
                                texto: 'El mismo método, pero por dentro hace otra cosa. El contrato dice QUÉ; cada clase decide CÓMO.'
                            }
                        ]
                    },
                    {
                        titulo: 'Clase que NO cumple el contrato',
                        esCorrecto: false,
                        archivo: 'exportador-word.ts',
                        codigo:
                            `import { Exportador } from './exportador';

export class ExportadorWord implements Exportador {
  formato = 'Word';

  descargar(datos: string[]): string {
    return 'Word con ' + datos.length + ' filas';
  }
}

// TypeScript avisa ANTES de ejecutar:
// "La clase ExportadorWord no implementa 'exportar'"`,
                        anotaciones: [
                            {
                                linea: 3,
                                marca: 'implements Exportador',
                                tipo: 'interface',
                                texto: 'Dice que firma el contrato…'
                            },
                            {
                                linea: 6,
                                marca: 'descargar(datos: string[])',
                                tipo: 'problema',
                                texto: '…pero el método se llama descargar, y el contrato pide exportar. No cumple el contrato.'
                            },
                            {
                                linea: 12,
                                marca: 'La clase ExportadorWord no implementa',
                                tipo: 'problema',
                                texto: 'TypeScript muestra el error ANTES de ejecutar la app. Esa es la gran ventaja de los contratos.'
                            }
                        ]
                    },
                    {
                        titulo: 'Quien usa el contrato no sabe ni le importa cuál clase es',
                        esCorrecto: true,
                        archivo: 'reportes.componente.ts',
                        codigo:
                            `descargar(exportador: Exportador) {
  const archivo = exportador.exportar(this.filas);
  this.mensaje = 'Reporte en ' + exportador.formato + ' listo';
}

// Sirve igual con:
// this.descargar(new ExportadorExcel());
// this.descargar(new ExportadorPdf());`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'exportador: Exportador',
                                tipo: 'interface',
                                texto: 'El dato que recibe es del tipo del contrato: acepta Excel, PDF o cualquiera que lo cumpla.'
                            },
                            {
                                linea: 2,
                                marca: 'const archivo',
                                tipo: 'variable',
                                texto: 'Una variable que guarda lo que devolvió exportar().'
                            },
                            {
                                linea: 2,
                                marca: 'exportador.exportar(this.filas)',
                                tipo: 'metodo',
                                texto: 'Llama al método del contrato sin saber cuál exportador le llegó.'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: 'Palabras clave de un contrato',
                    columnas: ['Palabra', 'Qué significa', 'Ejemplo'],
                    filas: [
                        ['interface', 'Crea un contrato: solo dice qué debe existir', 'export interface Exportador { … }'],
                        ['implements', 'Esta clase cumple (firma) el contrato', 'class ExportadorPdf implements Exportador'],
                        ['extends', 'Heredar de otra clase. No es para contratos', 'class Gerente extends Empleado'],
                        ['La interface como tipo', 'Acepta cualquier clase que cumpla el contrato', 'exportador: Exportador'],
                        ['boolean · string · void', 'Lo que devuelve un método (sí/no, texto, nada)', 'exportar(...): string']
                    ]
                },
                notaAngular: 'Ya usas contratos en Angular sin notarlo: cuando escribes implements OnInit, tu componente firma el contrato OnInit, y Angular sabe que puede llamar a tu ngOnInit().',
                objetivo: 'Completa los 7 espacios para que la caja acepte pagos con Nequi.',
                comoJugar: [
                    'Verás 4 archivos. pago-tarjeta.ts ya está completo: úsalo como guía.',
                    'Toca un espacio vacío y luego la pieza que va ahí. Las piezas están en la barra de abajo.',
                    'Para quitar una pieza, toca el espacio otra vez. Ojo: hay piezas de más que no van en ningún lado.',
                    'Cuando llenes todos los espacios, pulsa Verificar. Si alguno está mal, verás una ayuda en rojo.'
                ]
            },

            pistas: [
                'pago-tarjeta.ts ya cumple el contrato. Compáralo línea por línea con pago-nequi.ts.',
                'extends y class son trampas: para crear un contrato se usa interface, y para cumplirlo se usa implements.'
            ],

            explicacionFinal: 'Acabas de crear y usar un contrato (interface).\n\nMetodoPago dice qué debe tener cualquier método de pago: un nombre y un método pagar(). PagoTarjeta y PagoNequi lo cumplen con implements, cada uno a su manera.\n\nLo más importante está en la caja: trabaja con MetodoPago y no con una clase concreta. Por eso, si mañana llega PSE, solo creas pago-pse.ts y la caja sigue igual, sin tocar una sola línea.\n\nA esto se le llama depender de una abstracción (la D de SOLID), y es la base de la inyección de dependencias, que verás en el siguiente reto.',

            completarCodigo: {
                archivos: [
                    {
                        archivo: 'metodo-pago.ts',
                        codigo:
                            `export [[1]] MetodoPago {
  nombre: string;
  pagar(valor: number): [[2]];
}`
                    },
                    {
                        archivo: 'pago-tarjeta.ts',
                        nota: 'Ya existe · úsalo de guía',
                        codigo:
                            `import { MetodoPago } from './metodo-pago';

export class PagoTarjeta implements MetodoPago {
  nombre = 'Tarjeta';

  pagar(valor: number): boolean {
    console.log('Cobrando $' + valor + ' a la tarjeta');
    return true;
  }
}`
                    },
                    {
                        archivo: 'pago-nequi.ts',
                        codigo:
                            `import { MetodoPago } from './metodo-pago';

export class PagoNequi [[3]] [[4]] {
  nombre = 'Nequi';

  [[5]](valor: number): boolean {
    console.log('Enviando cobro de $' + valor + ' a Nequi');
    return true;
  }
}`
                    },
                    {
                        archivo: 'caja.componente.ts',
                        codigo:
                            `import { Component } from '@angular/core';
import { MetodoPago } from '../pagos/metodo-pago';
import { PagoTarjeta } from '../pagos/pago-tarjeta';
import { PagoNequi } from '../pagos/pago-nequi';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.componente.html'
})
export class CajaComponente {
  total = 45000;
  mensaje = '';

  metodos: [[6]][] = [new PagoTarjeta(), new PagoNequi()];

  cobrar(metodo: MetodoPago) {
    const salioBien = metodo.[[7]](this.total);
    this.mensaje = salioBien ? 'Pago con ' + metodo.nombre + ' aprobado' : 'El pago falló';
  }
}`
                    }
                ],
                huecos: [
                    {
                        id: 1,
                        respuesta: 'interface',
                        ayuda: 'Un contrato no hace el trabajo: solo dice qué debe existir. La palabra class es para las clases que sí hacen el trabajo.',
                        explicacion: 'interface crea el contrato: dice qué propiedades y métodos debe tener cualquier método de pago, pero no cómo se hacen.'
                    },
                    {
                        id: 2,
                        respuesta: 'boolean',
                        ayuda: 'Mira qué devuelve pagar() en pago-tarjeta.ts: return true. ¿De qué tipo es true?',
                        explicacion: 'pagar() devuelve boolean: true si el pago salió bien y false si falló. Todas las clases que firmen el contrato deben devolver lo mismo.'
                    },
                    {
                        id: 3,
                        respuesta: 'implements',
                        ayuda: 'extends es para heredar de una clase. Para cumplir un contrato se usa otra palabra. Mira cómo lo hizo PagoTarjeta.',
                        explicacion: 'implements significa "esta clase cumple el contrato". Si a PagoNequi le faltara pagar(), TypeScript mostraría un error antes de ejecutar.'
                    },
                    {
                        id: 4,
                        respuesta: 'MetodoPago',
                        ayuda: 'Después de implements va el nombre del contrato que se cumple, no el de otra clase.',
                        explicacion: 'PagoNequi implements MetodoPago: Nequi firma el mismo contrato que la tarjeta.'
                    },
                    {
                        id: 5,
                        respuesta: 'pagar',
                        ayuda: 'El nombre del método tiene que ser exactamente el que pide el contrato en metodo-pago.ts.',
                        explicacion: 'El método se llama pagar porque así lo exige el contrato. Si lo llamas cobrar, la clase no cumple la interface y TypeScript lo marca como error.'
                    },
                    {
                        id: 6,
                        respuesta: 'MetodoPago',
                        ayuda: 'La lista tiene una tarjeta Y un Nequi. ¿Qué tipo describe a los dos al mismo tiempo?',
                        explicacion: 'La lista es de tipo MetodoPago[]: acepta cualquier clase que cumpla el contrato. Tarjeta, Nequi y las que lleguen después.'
                    },
                    {
                        id: 7,
                        respuesta: 'pagar',
                        ayuda: '¿Qué método garantiza el contrato que tienen todos los métodos de pago?',
                        explicacion: 'La caja llama a metodo.pagar() sin saber si es tarjeta o Nequi. No le importa: el contrato le garantiza que pagar() existe.'
                    }
                ],
                distractores: ['class', 'extends', 'void', 'PagoTarjeta', 'cobrar'],
                archivosExtra: [
                    {
                        archivo: 'caja.componente.html',
                        nota: 'Así se usa',
                        codigo:
                            `<p>Total: {{ total }}</p>

@for (metodo of metodos; track metodo.nombre) {
  <button (click)="cobrar(metodo)">Pagar con {{ metodo.nombre }}</button>
}

<p>{{ mensaje }}</p>`
                    },
                    {
                        archivo: 'pago-pse.ts',
                        nota: '¿Y si mañana llega PSE?',
                        codigo:
                            `import { MetodoPago } from './metodo-pago';

// Solo se crea este archivo nuevo.
// La caja no cambia: ya sabe trabajar con cualquier MetodoPago.
export class PagoPse implements MetodoPago {
  nombre = 'PSE';

  pagar(valor: number): boolean {
    console.log('Redirigiendo al banco para pagar $' + valor);
    return true;
  }
}`
                    }
                ]
            }
        },

        {
            id: 6,
            misionId: 2,
            titulo: 'No lo crees, pídelo',
            descripcion: 'Haz que la caja reciba su método de pago en lugar de crearlo.',
            tipoJuego: 'completar-codigo',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Inyección de dependencias (la D de SOLID)',
            contexto: 'Cada vez que probamos la caja se cobra dinero de verdad, porque la caja crea su propio PagoTarjeta con new. Necesito que reciba el método de pago desde afuera: en la tienda le damos Nequi, y en las pruebas, uno de mentiras.',
            evidencia: 'GP-ARQ-03',

            induccion: {
                remitente: 'Tech Lead',
                definicion: 'La inyección de dependencias es una técnica en la que una clase recibe desde afuera, normalmente por su constructor, los objetos que necesita, en lugar de crearlos ella misma con new. Se relaciona con la D de SOLID (inversión de dependencias): depender de abstracciones y no de clases concretas.',
                idea: 'Inyección de dependencias: una clase NO crea con new las cosas que necesita, sino que las PIDE en su constructor. Así, quien la usa decide qué entregarle, y la clase no queda amarrada a una sola opción.',
                vidaReal: 'Un taxista no fabrica su propio carro: la empresa se lo entrega. Hoy le dan uno a gasolina y mañana uno eléctrico, y el taxista maneja igual porque sabe usar "un carro". Si él mismo soldara su carro, cambiarlo significaría volver a construirlo.',
                ejemplos: [
                    {
                        titulo: 'El contrato (lo viste en el reto 5)',
                        archivo: 'exportador.ts',
                        codigo:
                            `export interface Exportador {
  formato: string;
  exportar(datos: string[]): string;
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'interface Exportador',
                                tipo: 'interface',
                                texto: 'Esto es una interface llamada Exportador. Es un contrato: dice que todo exportador debe tener un formato y un método exportar(). No dice cómo se hace.'
                            },
                            {
                                linea: 2,
                                marca: 'formato: string',
                                tipo: 'propiedad',
                                texto: 'Esto es una propiedad: un dato que debe tener todo exportador. ": string" significa que es texto, por ejemplo "Excel".'
                            },
                            {
                                linea: 3,
                                marca: 'exportar(datos: string[])',
                                tipo: 'metodo',
                                texto: 'Esto es un método: una acción. Recibe una lista de textos (string[]) y devuelve un texto (el ": string" del final).'
                            }
                        ]
                    },
                    {
                        titulo: 'La clase CREA lo que necesita',
                        esCorrecto: false,
                        archivo: 'reportes.ts',
                        codigo:
                            `import { ExportadorExcel } from './exportador-excel';

export class Reportes {
  private exportador = new ExportadorExcel();

  descargar(filas: string[]): string {
    return this.exportador.exportar(filas);
  }
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'ExportadorExcel',
                                tipo: 'problema',
                                texto: 'Primera señal: importa una clase concreta (Excel) en vez del contrato.'
                            },
                            {
                                linea: 3,
                                marca: 'class Reportes',
                                tipo: 'clase',
                                texto: 'Esto es una clase: el molde que hace el trabajo de los reportes.'
                            },
                            {
                                linea: 4,
                                marca: 'private exportador',
                                tipo: 'propiedad',
                                texto: 'Esto es una propiedad: aquí la clase guarda su exportador para usarlo después.'
                            },
                            {
                                linea: 4,
                                marca: 'new ExportadorExcel()',
                                tipo: 'problema',
                                texto: 'Aquí está el problema: la clase CREA su exportador con new. Queda amarrada a Excel para siempre. ¿Quieres PDF? Hay que abrir y editar esta clase.'
                            },
                            {
                                linea: 6,
                                marca: 'descargar(filas: string[])',
                                tipo: 'metodo',
                                texto: 'Esto es un método: la acción de descargar el reporte.'
                            }
                        ]
                    },
                    {
                        titulo: 'La clase PIDE lo que necesita',
                        esCorrecto: true,
                        archivo: 'reportes.ts',
                        codigo:
                            `import { Exportador } from './exportador';

export class Reportes {
  constructor(private exportador: Exportador) {}

  descargar(filas: string[]): string {
    return this.exportador.exportar(filas);
  }
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'Exportador',
                                tipo: 'interface',
                                texto: 'Importa el contrato (la interface), no una clase concreta.'
                            },
                            {
                                linea: 4,
                                marca: 'constructor',
                                tipo: 'constructor',
                                texto: 'Esto es el constructor: lo que la clase pide para poder nacer. Aquí PIDE un exportador en lugar de crearlo.'
                            },
                            {
                                linea: 4,
                                marca: 'exportador: Exportador',
                                tipo: 'inyeccion',
                                texto: 'Pide "cualquier cosa que cumpla el contrato Exportador". Puede ser Excel, PDF o uno de prueba: la clase no lo sabe ni le importa.'
                            },
                            {
                                linea: 7,
                                marca: 'this.exportador.exportar(filas)',
                                tipo: 'metodo',
                                texto: 'Usa el método que garantiza el contrato. Funciona igual con cualquier exportador que le entreguen.'
                            }
                        ]
                    },
                    {
                        titulo: 'Quien la usa decide qué entregarle',
                        esCorrecto: true,
                        archivo: 'uso.ts',
                        codigo:
                            `import { Reportes } from './reportes';
import { ExportadorExcel } from './exportador-excel';
import { ExportadorPdf } from './exportador-pdf';

const reporteExcel = new Reportes(new ExportadorExcel());
const reportePdf = new Reportes(new ExportadorPdf());`,
                        anotaciones: [
                            {
                                linea: 5,
                                marca: 'reporteExcel',
                                tipo: 'variable',
                                texto: 'Esto es una variable: un nombre que guarda algo. Aquí guarda un Reportes que exporta en Excel.'
                            },
                            {
                                linea: 5,
                                marca: 'new ExportadorExcel()',
                                tipo: 'inyeccion',
                                texto: 'Aquí se inyecta la dependencia: el exportador se crea AFUERA y se le entrega a Reportes por el constructor.'
                            },
                            {
                                linea: 6,
                                marca: 'new ExportadorPdf()',
                                tipo: 'inyeccion',
                                texto: 'La misma clase Reportes, ahora con PDF. Reportes no cambió ni una línea.'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: 'Crear vs. pedir',
                    columnas: ['Si ves…', '¿Qué significa?', '¿Está bien?'],
                    filas: [
                        ['private x = new Algo();', 'La clase crea su dependencia', '❌ Queda amarrada a esa clase'],
                        ['constructor(private x: Algo) {}', 'La clase pide su dependencia', '✅ Inyección de dependencias'],
                        ['constructor(private x: UnContrato) {}', 'Pide cualquier cosa que cumpla el contrato', '✅ Lo mejor: se cambia sin tocarla'],
                        ['new Clase(new Dependencia())', 'Alguien de afuera le entrega lo que pidió', '✅ Así se inyecta a mano'],
                        ['new UnContrato()', 'Intentar crear una interface', '❌ Error: un contrato no se puede crear']
                    ]
                },
                notaAngular: 'En Angular casi nunca escribes new para tus servicios. Cuando pones constructor(private carritoServicio: CarritoServicio) {}, Angular crea el servicio y te lo entrega solito. Eso es inyección de dependencias automática: la misma idea de este reto.',
                objetivo: 'Completa los 6 espacios para que la caja PIDA su método de pago en lugar de crearlo, y así poder probarla sin cobrar dinero real.',
                comoJugar: [
                    'Primero mira caja.ts (antes): así estaba, creando su PagoTarjeta con new.',
                    'Toca un espacio vacío y luego la pieza que va ahí. Las piezas están en la barra de abajo.',
                    'Para quitar una pieza, toca el espacio otra vez. Ojo: hay piezas de más que no van en ningún lado.',
                    'Cuando llenes todos los espacios, pulsa Verificar. Si alguno está mal, verás una ayuda en rojo.'
                ]
            },

            pistas: [
                'El espacio 1 es la palabra con la que una clase pide lo que necesita. En la inducción aparece con el color de "Constructor".',
                'Los espacios 5 y 6 necesitan objetos reales creados con new. new MetodoPago() es una trampa: una interface no se puede crear.'
            ],

            explicacionFinal: 'Acabas de aplicar la inyección de dependencias.\n\nAntes, la caja creaba su propio PagoTarjeta con new: estaba amarrada a la tarjeta y cada prueba cobraba dinero real. Ahora la caja PIDE un MetodoPago en su constructor, y quien la usa decide qué entregarle: Nequi en la tienda y un pago de mentiras en las pruebas.\n\nFíjate cómo se unen los dos retos: la interface (reto 5) dice QUÉ se necesita, y la inyección (este reto) decide QUIÉN lo entrega. Juntas forman la D de SOLID: depender de contratos, no de clases concretas.\n\nEn Angular esto pasa todo el tiempo: cuando escribes constructor(private servicio: Servicio), Angular crea el servicio y te lo inyecta.',

            completarCodigo: {
                archivos: [
                    {
                        archivo: 'metodo-pago.ts',
                        nota: 'Del reto anterior',
                        codigo:
                            `export interface MetodoPago {
  nombre: string;
  pagar(valor: number): boolean;
}`
                    },
                    {
                        archivo: 'caja.ts (antes)',
                        nota: 'Así estaba: crea su pago con new',
                        codigo:
                            `import { PagoTarjeta } from './pago-tarjeta';

export class Caja {
  private metodo = new PagoTarjeta();

  cobrar(total: number): string {
    const salioBien = this.metodo.pagar(total);
    return salioBien ? 'Pago aprobado con ' + this.metodo.nombre : 'El pago falló';
  }
}`
                    },
                    {
                        archivo: 'caja.ts (ahora)',
                        codigo:
                            `import { MetodoPago } from './metodo-pago';

export class Caja {
  [[1]](private metodo: [[2]]) {}

  cobrar(total: number): string {
    const salioBien = this.metodo.[[3]](total);
    return salioBien ? 'Pago aprobado con ' + this.metodo.nombre : 'El pago falló';
  }
}`
                    },
                    {
                        archivo: 'pago-de-prueba.ts',
                        codigo:
                            `import { MetodoPago } from './metodo-pago';

// Un pago "de mentiras": sirve para probar sin cobrar dinero real
export class PagoDePrueba [[4]] MetodoPago {
  nombre = 'Prueba';

  pagar(valor: number): boolean {
    console.log('(Prueba) No se cobró nada. Valor: $' + valor);
    return true;
  }
}`
                    },
                    {
                        archivo: 'tienda.ts',
                        codigo:
                            `import { Caja } from './caja';
import { PagoNequi } from './pago-nequi';
import { PagoDePrueba } from './pago-de-prueba';

// En la tienda real: la caja recibe Nequi
const cajaReal = new Caja([[5]]);
console.log(cajaReal.cobrar(45000));

// En las pruebas: la MISMA caja recibe el pago de mentiras
const cajaDePrueba = new Caja([[6]]);
console.log(cajaDePrueba.cobrar(45000));`
                    }
                ],
                huecos: [
                    {
                        id: 1,
                        respuesta: 'constructor',
                        ayuda: 'Buscamos la palabra con la que la clase PIDE lo que necesita para nacer. No lleva "new".',
                        explicacion: 'constructor(...) es donde la clase pide lo que necesita. Ya no crea su método de pago: lo recibe.'
                    },
                    {
                        id: 2,
                        respuesta: 'MetodoPago',
                        ayuda: 'Si pones una clase concreta, la caja vuelve a quedar amarrada a ella. ¿Qué tipo acepta tarjeta, Nequi y el pago de prueba al mismo tiempo?',
                        explicacion: 'Pide un MetodoPago (el contrato), no una clase concreta. Así acepta tarjeta, Nequi, PSE o el pago de prueba.'
                    },
                    {
                        id: 3,
                        respuesta: 'pagar',
                        ayuda: '¿Qué método garantiza el contrato MetodoPago? Míralo en metodo-pago.ts.',
                        explicacion: 'La caja usa pagar() porque el contrato garantiza que existe, sin importar qué método de pago le entregaron.'
                    },
                    {
                        id: 4,
                        respuesta: 'implements',
                        ayuda: 'Para cumplir un contrato no se hereda. Repasa lo que aprendiste en el reto 5.',
                        explicacion: 'PagoDePrueba implements MetodoPago: firma el contrato, así que la caja lo acepta igual que a Nequi.'
                    },
                    {
                        id: 5,
                        respuesta: 'new PagoNequi()',
                        ayuda: 'En la tienda real queremos cobrar con Nequi. Hay que entregarle a la caja un objeto real, creado con new. Ojo: una interface no se puede crear con new.',
                        explicacion: 'new PagoNequi() crea el método de pago AFUERA y se lo entrega a la caja. Eso es inyectar la dependencia.'
                    },
                    {
                        id: 6,
                        respuesta: 'new PagoDePrueba()',
                        ayuda: 'En las pruebas no queremos cobrar dinero real. ¿Cuál de los pagos es "de mentiras"?',
                        explicacion: 'La misma caja, sin cambiar una línea, ahora recibe un pago de mentiras. Por eso la inyección de dependencias facilita tanto las pruebas.'
                    }
                ],
                distractores: ['new', 'PagoTarjeta', 'extends', 'new MetodoPago()', 'cobrar'],
                archivosExtra: [
                    {
                        archivo: 'caja.servicio.ts',
                        nota: 'Lo mismo en Angular',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { CarritoServicio } from './carrito.servicio';

@Injectable({ providedIn: 'root' })
export class CajaServicio {
  // Angular ve que pides CarritoServicio y te lo entrega solito.
  constructor(private carritoServicio: CarritoServicio) {}

  totalAPagar(): number {
    return this.carritoServicio.calcularTotal();
  }
}`
                    },
                    {
                        archivo: 'caja.componente.ts',
                        nota: 'Lo mismo en Angular',
                        codigo:
                            `import { Component } from '@angular/core';
import { CajaServicio } from '../servicios/caja.servicio';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.componente.html'
})
export class CajaComponente {
  // Nunca escribes new CajaServicio(): Angular lo crea y lo inyecta.
  constructor(private cajaServicio: CajaServicio) {}

  get total(): number {
    return this.cajaServicio.totalAPagar();
  }
}`
                    }
                ]
            }
        },

        // ===================== MISIÓN 3 =====================
        {
            id: 7,
            misionId: 3,
            titulo: 'El carrito duplicado',
            descripcion: 'Encuentra por qué dos partes de la app muestran carritos distintos.',
            tipoJuego: 'revisar-codigo',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Patrón Singleton (una sola instancia)',
            contexto: 'Bug reportado: la página del carrito dice "3 productos", pero el encabezado dice "0". Los dos usan CarritoServicio… ¿o no es el mismo? Revisa el Pull Request y encuentra la causa.',
            evidencia: 'GP-ARQ-05',

            induccion: {
                remitente: 'Tech Lead',
                definicion: 'Singleton es un patrón de diseño creacional que garantiza que una clase tenga una sola instancia en toda la aplicación y ofrece un punto de acceso global a ella. En Angular se logra con @Injectable({ providedIn: \'root\' }).',
                idea: 'Patrón Singleton: de una clase existe UNA SOLA instancia (un solo objeto) para toda la aplicación, y todos los que la necesitan comparten esa misma. Sirve para lo que debe ser único: el carrito, la sesión del usuario o la configuración.',
                vidaReal: 'En una casa hay una sola nevera. Si cada persona tuviera su propia nevera, tu mamá guardaría la leche en la suya y tú abrirías la tuya y dirías "no hay leche". La leche existe, pero está en otra nevera. Ese es justo el bug del ticket: dos carritos distintos.',
                ejemplos: [
                    {
                        titulo: 'El Singleton clásico en TypeScript',
                        archivo: 'configuracion.ts',
                        codigo:
                            `export class Configuracion {
  private static instancia: Configuracion;
  idioma = 'es';

  private constructor() {}

  static obtener(): Configuracion {
    if (!Configuracion.instancia) {
      Configuracion.instancia = new Configuracion();
    }
    return Configuracion.instancia;
  }
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'class Configuracion',
                                tipo: 'clase',
                                texto: 'Esto es una clase llamada Configuracion. De ella solo debe existir un objeto en toda la app.'
                            },
                            {
                                linea: 2,
                                marca: 'private static instancia',
                                tipo: 'propiedad',
                                texto: 'Esto es una propiedad "static": pertenece a la clase y no a cada objeto. Aquí se guarda la ÚNICA instancia.'
                            },
                            {
                                linea: 3,
                                marca: 'idioma',
                                tipo: 'propiedad',
                                texto: 'Una propiedad normal: el dato que todos van a compartir.'
                            },
                            {
                                linea: 5,
                                marca: 'private constructor()',
                                tipo: 'constructor',
                                texto: 'El constructor es private: nadie de afuera puede escribir new Configuracion(). Así se evita que alguien cree una copia.'
                            },
                            {
                                linea: 7,
                                marca: 'static obtener()',
                                tipo: 'metodo',
                                texto: 'Este método es el único camino para conseguir la configuración: si no existe la crea UNA vez, y si ya existe devuelve la misma.'
                            }
                        ]
                    },
                    {
                        titulo: 'El componente se fabrica su propia copia',
                        esCorrecto: false,
                        archivo: 'menu.componente.ts',
                        codigo:
                            `@Component({
  selector: 'app-menu',
  templateUrl: './menu.componente.html',
  providers: [SesionServicio]
})
export class MenuComponente {
  private otraSesion = new SesionServicio();

  constructor(private sesionServicio: SesionServicio) {}
}`,
                        anotaciones: [
                            {
                                linea: 4,
                                marca: 'providers: [SesionServicio]',
                                tipo: 'problema',
                                texto: 'providers dentro de un componente le dice a Angular: "créame una sesión NUEVA solo para mí". Ya no es la misma que tienen los demás.'
                            },
                            {
                                linea: 6,
                                marca: 'class MenuComponente',
                                tipo: 'clase',
                                texto: 'Esto es la clase del componente del menú.'
                            },
                            {
                                linea: 7,
                                marca: 'new SesionServicio()',
                                tipo: 'problema',
                                texto: 'new crea otra copia más del servicio. Además se salta la inyección de dependencias que viste en el reto 6.'
                            },
                            {
                                linea: 9,
                                marca: 'constructor',
                                tipo: 'constructor',
                                texto: 'Pedir el servicio en el constructor está bien… pero por la línea 4, lo que llega es una copia propia del menú.'
                            }
                        ]
                    },
                    {
                        titulo: 'Una sola instancia para toda la app',
                        esCorrecto: true,
                        archivo: 'sesion.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SesionServicio {
  usuario = '';

  iniciar(nombre: string) {
    this.usuario = nombre;
  }
}`,
                        anotaciones: [
                            {
                                linea: 3,
                                marca: "providedIn: 'root'",
                                tipo: 'inyeccion',
                                texto: 'Esto es el Singleton en Angular: le dice "crea UNA sola SesionServicio para toda la app y entrégasela a todos los que la pidan".'
                            },
                            {
                                linea: 4,
                                marca: 'class SesionServicio',
                                tipo: 'clase',
                                texto: 'La clase del servicio. Angular creará un solo objeto de ella.'
                            },
                            {
                                linea: 5,
                                marca: 'usuario',
                                tipo: 'propiedad',
                                texto: 'El dato que todos los componentes comparten.'
                            },
                            {
                                linea: 7,
                                marca: 'iniciar(nombre: string)',
                                tipo: 'metodo',
                                texto: 'Un método: cuando cualquier componente lo usa, todos ven el cambio, porque es la misma instancia.'
                            }
                        ]
                    },
                    {
                        titulo: 'Todos la piden y reciben la misma',
                        esCorrecto: true,
                        archivo: 'menu.componente.ts',
                        codigo:
                            `@Component({
  selector: 'app-menu',
  templateUrl: './menu.componente.html'
})
export class MenuComponente {
  constructor(private sesionServicio: SesionServicio) {}
}`,
                        anotaciones: [
                            {
                                linea: 6,
                                marca: 'constructor',
                                tipo: 'constructor',
                                texto: 'Solo la pide. Sin providers y sin new: Angular le entrega la única instancia que existe.'
                            },
                            {
                                linea: 6,
                                marca: 'sesionServicio: SesionServicio',
                                tipo: 'inyeccion',
                                texto: 'Llega la misma sesión que tiene el encabezado, el perfil y cualquier otro componente.'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: '¿Una instancia o muchas?',
                    columnas: ['Si ves…', '¿Cuántas se crean?', '¿Está bien?'],
                    filas: [
                        ['@Injectable({ providedIn: \'root\' })', 'Una para toda la app', '✅ Es el Singleton en Angular'],
                        ['@Injectable() sin providedIn', 'Depende de quién lo provea', '⚠️ Cada uno podría crear la suya'],
                        ['providers: [Servicio] en un componente', 'Una nueva para ese componente', '❌ Si el dato se debe compartir'],
                        ['new Servicio() en un componente', 'Una nueva cada vez', '❌ Copia propia y sin inyección'],
                        ['constructor(private s: Servicio) {}', 'Recibe la que tenga Angular', '✅ Pedirla siempre está bien']
                    ]
                },
                notaAngular: 'En Angular casi nunca escribes el Singleton a mano (con static y private constructor). Basta con @Injectable({ providedIn: \'root\' }): Angular crea una sola instancia y se la entrega a todos.',
                objetivo: 'Revisa los 3 archivos del Pull Request y marca las 3 líneas que hacen que existan carritos distintos.',
                comoJugar: [
                    'Este Pull Request tiene 3 archivos: el servicio y los dos componentes que lo usan.',
                    'Haz clic en una línea para marcarla. Haz clic otra vez para desmarcarla.',
                    'Busca todo lo que haga que se cree más de un carrito.',
                    'Pulsa Enviar revisión. Al final verás los 3 archivos corregidos.'
                ]
            },

            pistas: [
                'Hay exactamente un problema en cada archivo.',
                'Busca la palabra providers, la palabra new y un @Injectable al que le falta algo entre los paréntesis.'
            ],

            explicacionFinal: 'Acabas de arreglar un Singleton roto.\n\nHabía tres carritos distintos: el servicio no decía providedIn: \'root\', el encabezado se fabricaba el suyo con providers, y la página del carrito creaba otro con new. Los productos se guardaban en uno y el encabezado miraba otro.\n\nAhora existe UNA sola instancia de CarritoServicio para toda la app, y todos los componentes la reciben por el constructor. Si la página agrega un producto, el encabezado lo ve al instante.\n\nEl Singleton es útil para lo que debe ser único (carrito, sesión, configuración). Pero ojo: no todo debe ser Singleton. Si cada pantalla necesita sus propios datos, ahí sí tiene sentido una instancia por componente.',

            revisarCodigo: {
                archivos: [
                    {
                        archivo: 'carrito.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto.modelo';

@Injectable()
export class CarritoServicio {
  private productos: Producto[] = [];

  agregar(producto: Producto) {
    this.productos.push(producto);
  }

  cantidad(): number {
    return this.productos.length;
  }
}`
                    },
                    {
                        archivo: 'encabezado.componente.ts',
                        codigo:
                            `import { Component } from '@angular/core';
import { CarritoServicio } from '../servicios/carrito.servicio';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.componente.html',
  providers: [CarritoServicio]
})
export class EncabezadoComponente {
  constructor(private carritoServicio: CarritoServicio) {}

  get cantidad(): number {
    return this.carritoServicio.cantidad();
  }
}`
                    },
                    {
                        archivo: 'pagina-carrito.componente.ts',
                        codigo:
                            `import { Component } from '@angular/core';
import { CarritoServicio } from '../servicios/carrito.servicio';
import { Producto } from '../modelos/producto.modelo';

@Component({
  selector: 'app-pagina-carrito',
  templateUrl: './pagina-carrito.componente.html'
})
export class PaginaCarritoComponente {
  private carritoServicio = new CarritoServicio();

  agregar(producto: Producto) {
    this.carritoServicio.agregar(producto);
  }

  get cantidad(): number {
    return this.carritoServicio.cantidad();
  }
}`
                    }
                ],
                problemas: [
                    {
                        archivo: 'carrito.servicio.ts',
                        linea: 4,
                        comentario: '@Injectable() sin providedIn: \'root\'. Angular no crea una instancia única para toda la app, así que cada componente tiene que fabricar la suya. Debe ser @Injectable({ providedIn: \'root\' }).'
                    },
                    {
                        archivo: 'encabezado.componente.ts',
                        linea: 7,
                        comentario: 'providers: [CarritoServicio] le pide a Angular un carrito NUEVO solo para el encabezado. Por eso el encabezado tiene su propio carrito vacío y muestra 0.'
                    },
                    {
                        archivo: 'pagina-carrito.componente.ts',
                        linea: 10,
                        comentario: 'new CarritoServicio() crea otra copia más, y además se salta la inyección de dependencias (reto 6). Los productos se guardan en esta copia, que nadie más ve.'
                    }
                ],
                falsasAlarmas: [
                    {
                        archivo: 'carrito.servicio.ts',
                        linea: 6,
                        comentario: 'Guardar la lista de productos en el servicio está bien. El problema es cuántos servicios existen, no lo que guardan.'
                    },
                    {
                        archivo: 'carrito.servicio.ts',
                        linea: 12,
                        hasta: 14,
                        comentario: 'cantidad() está bien: cuenta los productos de ESA instancia. El problema es que hay varias instancias.'
                    },
                    {
                        archivo: 'encabezado.componente.ts',
                        linea: 10,
                        comentario: 'Pedir el servicio en el constructor es correcto (inyección de dependencias). El problema está en la línea 7, que hace que llegue una copia propia.'
                    },
                    {
                        archivo: 'encabezado.componente.ts',
                        linea: 12,
                        hasta: 14,
                        comentario: 'Preguntarle la cantidad al servicio está bien. Muestra 0 porque le está preguntando a su propia copia.'
                    },
                    {
                        archivo: 'pagina-carrito.componente.ts',
                        linea: 12,
                        hasta: 14,
                        comentario: 'Llamar al servicio para agregar está bien. El problema es de dónde salió ese servicio (línea 10).'
                    }
                ],
                archivosCorregidos: [
                    {
                        archivo: 'carrito.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto.modelo';

@Injectable({ providedIn: 'root' })
export class CarritoServicio {
  private productos: Producto[] = [];

  agregar(producto: Producto) {
    this.productos.push(producto);
  }

  cantidad(): number {
    return this.productos.length;
  }
}`
                    },
                    {
                        archivo: 'encabezado.componente.ts',
                        codigo:
                            `import { Component } from '@angular/core';
import { CarritoServicio } from '../servicios/carrito.servicio';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.componente.html'
})
export class EncabezadoComponente {
  constructor(private carritoServicio: CarritoServicio) {}

  get cantidad(): number {
    return this.carritoServicio.cantidad();
  }
}`
                    },
                    {
                        archivo: 'pagina-carrito.componente.ts',
                        codigo:
                            `import { Component } from '@angular/core';
import { CarritoServicio } from '../servicios/carrito.servicio';
import { Producto } from '../modelos/producto.modelo';

@Component({
  selector: 'app-pagina-carrito',
  templateUrl: './pagina-carrito.componente.html'
})
export class PaginaCarritoComponente {
  constructor(private carritoServicio: CarritoServicio) {}

  agregar(producto: Producto) {
    this.carritoServicio.agregar(producto);
  }

  get cantidad(): number {
    return this.carritoServicio.cantidad();
  }
}`
                    }
                ]
            }
        },

        {
            id: 8,
            misionId: 3,
            titulo: 'Fábrica de notificaciones',
            descripcion: 'Centraliza en una fábrica la creación de notificaciones por correo, SMS y WhatsApp.',
            tipoJuego: 'completar-codigo',
            dificultad: 'media',
            puntos: 200,
            concepto: 'Patrón Factory (fábrica)',
            contexto: 'Cada pantalla decide con un if gigante si avisa por correo, SMS o WhatsApp, y ese if está copiado en 5 pantallas. Ahora llega Telegram y nadie quiere tocar las 5. Centraliza la creación en una fábrica.',
            evidencia: 'GP-ARQ-05',

            induccion: {
                remitente: 'Tech Lead',
                definicion: 'Factory (fábrica) es un patrón de diseño creacional que centraliza la creación de objetos en una clase o método: quien necesita un objeto lo pide indicando el tipo, y la fábrica decide qué clase concreta crear y la devuelve como su interface.',
                idea: 'Patrón Factory (fábrica): en lugar de que cada parte del código decida con if y new qué objeto crear, se le pide a una sola clase, la fábrica: "dame uno de este tipo". La fábrica decide qué clase crear y lo devuelve.',
                vidaReal: 'En un restaurante tú no entras a la cocina a preparar tu plato: le pides al mesero "una bandeja paisa" y la cocina decide cómo hacerla. Si cambia la receta, cambia la cocina, no los clientes. La fábrica es la cocina: todos piden ahí y nadie más cocina.',
                ejemplos: [
                    {
                        titulo: 'El contrato de todos los transportes',
                        archivo: 'transporte.ts',
                        codigo:
                            `export interface Transporte {
  nombre: string;
  entregar(direccion: string): string;
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'interface Transporte',
                                tipo: 'interface',
                                texto: 'El contrato: todo transporte de domicilios (moto, bici, carro) debe tener un nombre y un método entregar().'
                            },
                            {
                                linea: 3,
                                marca: 'entregar(direccion: string)',
                                tipo: 'metodo',
                                texto: 'El método que todos los transportes deben tener. Recibe la dirección y devuelve un texto.'
                            }
                        ]
                    },
                    {
                        titulo: 'Cada pantalla decide y crea con if y new',
                        esCorrecto: false,
                        archivo: 'pedido.componente.ts',
                        codigo:
                            `enviarPedido(tipo: string, direccion: string) {
  let transporte: Transporte;
  if (tipo === 'moto') {
    transporte = new EnvioMoto();
  } else if (tipo === 'bici') {
    transporte = new EnvioBici();
  } else {
    transporte = new EnvioCarro();
  }
  this.mensaje = transporte.entregar(direccion);
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'enviarPedido(tipo: string, direccion: string)',
                                tipo: 'metodo',
                                texto: 'Esto es un método del componente: se ejecuta cuando el usuario pide un domicilio.'
                            },
                            {
                                linea: 2,
                                marca: 'let transporte',
                                tipo: 'variable',
                                texto: 'Una variable que va a guardar el transporte elegido.'
                            },
                            {
                                linea: 3,
                                marca: "if (tipo === 'moto')",
                                tipo: 'problema',
                                texto: 'Este if decide QUÉ clase crear. Si está copiado en 5 pantallas y llega "drone", hay que cambiar las 5.'
                            },
                            {
                                linea: 4,
                                marca: 'new EnvioMoto()',
                                tipo: 'problema',
                                texto: 'El componente conoce y crea con new todas las clases concretas. Queda amarrado a ellas.'
                            },
                            {
                                linea: 10,
                                marca: 'transporte.entregar(direccion)',
                                tipo: 'metodo',
                                texto: 'Esta parte sí está bien: usa el método del contrato. Lo malo es todo lo de arriba.'
                            }
                        ]
                    },
                    {
                        titulo: 'Una fábrica que sabe crear transportes',
                        esCorrecto: true,
                        archivo: 'fabrica-transporte.ts',
                        codigo:
                            `export class FabricaTransporte {
  static crear(tipo: string): Transporte {
    if (tipo === 'moto') {
      return new EnvioMoto();
    }
    if (tipo === 'bici') {
      return new EnvioBici();
    }
    return new EnvioCarro();
  }
}`,
                        anotaciones: [
                            {
                                linea: 1,
                                marca: 'class FabricaTransporte',
                                tipo: 'clase',
                                texto: 'Esto es la fábrica: una clase cuyo ÚNICO trabajo es crear transportes.'
                            },
                            {
                                linea: 2,
                                marca: 'static crear(tipo: string)',
                                tipo: 'metodo',
                                texto: 'El método que fabrica. Con static se usa sin crear la fábrica: FabricaTransporte.crear(\'moto\').'
                            },
                            {
                                linea: 2,
                                marca: ': Transporte',
                                tipo: 'interface',
                                texto: 'Devuelve el contrato Transporte, no una clase concreta. Quien pide no sabe cuál le tocó, y no le importa.'
                            },
                            {
                                linea: 4,
                                marca: 'new EnvioMoto()',
                                tipo: 'clase',
                                texto: 'Los new viven SOLO aquí. Si llega "drone", se agrega un if en este único archivo.'
                            }
                        ]
                    },
                    {
                        titulo: 'La pantalla solo pide',
                        esCorrecto: true,
                        archivo: 'pedido.componente.ts',
                        codigo:
                            `enviarPedido(tipo: string, direccion: string) {
  const transporte = FabricaTransporte.crear(tipo);
  this.mensaje = transporte.entregar(direccion);
}`,
                        anotaciones: [
                            {
                                linea: 2,
                                marca: 'const transporte',
                                tipo: 'variable',
                                texto: 'La variable guarda lo que entregó la fábrica.'
                            },
                            {
                                linea: 2,
                                marca: 'FabricaTransporte.crear(tipo)',
                                tipo: 'metodo',
                                texto: 'Le pide a la fábrica: "dame un transporte de este tipo". El componente ya no tiene if ni new.'
                            },
                            {
                                linea: 3,
                                marca: 'transporte.entregar(direccion)',
                                tipo: 'metodo',
                                texto: 'Usa el contrato. Funciona con moto, bici, carro o el que llegue mañana.'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: 'Señales de que necesitas una fábrica',
                    columnas: ['Si ves…', '¿Qué pasa?', '¿Qué hacer?'],
                    filas: [
                        ['El mismo if/else para crear objetos en varias pantallas', 'Código repetido', 'Moverlo a una fábrica'],
                        ['new ClaseConcreta() dentro de un componente', 'El componente conoce todas las clases', 'Pedírselo a la fábrica'],
                        ['fabrica.crear(tipo)', 'Otro decide qué clase crear', '✅ Patrón Factory'],
                        ['crear(...): UnContrato', 'La fábrica devuelve el contrato', '✅ Quien pide no sabe cuál le tocó'],
                        ['Llega un tipo nuevo', 'Se cambia solo la fábrica', '✅ Un solo lugar para cambiar']
                    ]
                },
                notaAngular: 'En Angular, la fábrica suele ser un servicio: @Injectable({ providedIn: \'root\' }) con un método crear(). Así la pides en el constructor como cualquier servicio (reto 6) y existe una sola para toda la app (reto 7).',
                objetivo: 'Completa los 7 espacios para que la fábrica cree las notificaciones y la pantalla de pedidos se las pida, sin if ni new.',
                comoJugar: [
                    'notificacion.ts y canales.ts ya existen: úsalos de guía. pedidos.componente.ts (antes) muestra el if gigante que vas a eliminar.',
                    'Toca un espacio vacío y luego la pieza que va ahí. Las piezas están en la barra de abajo.',
                    'Para quitar una pieza, toca el espacio otra vez. Ojo: hay piezas de más.',
                    'Cuando llenes todos los espacios, pulsa Verificar. Si alguno está mal, verás una ayuda en rojo.'
                ]
            },

            pistas: [
                'Los espacios 3 y 4 necesitan crear objetos reales con new: mira los nombres de las clases en canales.ts.',
                'El componente pide la fábrica en el constructor y luego usa dos métodos: uno de la fábrica (para crear) y uno del contrato (para enviar).'
            ],

            explicacionFinal: 'Acabas de aplicar el patrón Factory.\n\nAntes, cada pantalla tenía su propio if con new para decidir el canal. Ahora existe UNA fábrica que sabe crear notificaciones, y las pantallas solo le dicen qué canal quieren: this.fabrica.crear(canal).\n\n¿Llega Telegram? Se crea NotificacionTelegram y se agrega un if en la fábrica. Las pantallas de pedidos y facturas no cambian ni una línea.\n\nFíjate que este reto usó todo lo anterior: el contrato Notificacion (reto 5), la fábrica pedida en el constructor (reto 6) y una sola fábrica para toda la app con providedIn: \'root\' (reto 7).',

            completarCodigo: {
                archivos: [
                    {
                        archivo: 'notificacion.ts',
                        nota: 'El contrato · ya existe',
                        codigo:
                            `export interface Notificacion {
  canal: string;
  enviar(mensaje: string): string;
}`
                    },
                    {
                        archivo: 'canales.ts',
                        nota: 'Ya existen · úsalos de guía',
                        codigo:
                            `import { Notificacion } from './notificacion';

export class NotificacionCorreo implements Notificacion {
  canal = 'Correo';
  enviar(mensaje: string): string {
    return '📧 Correo enviado: ' + mensaje;
  }
}

export class NotificacionSms implements Notificacion {
  canal = 'SMS';
  enviar(mensaje: string): string {
    return '📱 SMS enviado: ' + mensaje;
  }
}

export class NotificacionWhatsapp implements Notificacion {
  canal = 'WhatsApp';
  enviar(mensaje: string): string {
    return '💬 WhatsApp enviado: ' + mensaje;
  }
}`
                    },
                    {
                        archivo: 'pedidos.componente.ts (antes)',
                        nota: 'Así estaba: un if en cada pantalla',
                        codigo:
                            `avisarCliente(canal: string, mensaje: string) {
  let notificacion: Notificacion;
  if (canal === 'correo') {
    notificacion = new NotificacionCorreo();
  } else if (canal === 'sms') {
    notificacion = new NotificacionSms();
  } else {
    notificacion = new NotificacionWhatsapp();
  }
  this.estado = notificacion.enviar(mensaje);
}`
                    },
                    {
                        archivo: 'notificacion.fabrica.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { Notificacion } from './notificacion';
import { NotificacionCorreo, NotificacionSms, NotificacionWhatsapp } from './canales';

@Injectable({ providedIn: [[1]] })
export class NotificacionFabrica {

  crear(canal: string): [[2]] {
    if (canal === 'correo') {
      return [[3]];
    }
    if (canal === 'sms') {
      return [[4]];
    }
    return new NotificacionWhatsapp();
  }
}`
                    },
                    {
                        archivo: 'pedidos.componente.ts (ahora)',
                        codigo:
                            `import { Component } from '@angular/core';
import { NotificacionFabrica } from '../notificaciones/notificacion.fabrica';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.componente.html'
})
export class PedidosComponente {
  estado = '';

  constructor(private fabrica: [[5]]) {}

  avisarCliente(canal: string, mensaje: string) {
    const notificacion = this.fabrica.[[6]](canal);
    this.estado = notificacion.[[7]](mensaje);
  }
}`
                    }
                ],
                huecos: [
                    {
                        id: 1,
                        respuesta: "'root'",
                        ayuda: 'Recuerda el reto 7: queremos UNA sola fábrica para toda la app. ¿Qué va después de providedIn?',
                        explicacion: "providedIn: 'root' hace que exista una sola fábrica (Singleton) y que cualquier componente pueda pedirla."
                    },
                    {
                        id: 2,
                        respuesta: 'Notificacion',
                        ayuda: 'La fábrica puede devolver correo, SMS o WhatsApp. ¿Qué tipo describe a los tres? No es una clase concreta.',
                        explicacion: 'crear() devuelve el contrato Notificacion. Quien pide no sabe qué canal le tocó, y no le importa.'
                    },
                    {
                        id: 3,
                        respuesta: 'new NotificacionCorreo()',
                        ayuda: 'Si el canal es "correo", la fábrica debe CREAR un objeto real. Mira las clases de canales.ts. Ojo: un contrato no se puede crear con new.',
                        explicacion: 'Aquí sí se usa new: la fábrica es el ÚNICO lugar donde se crean los canales.'
                    },
                    {
                        id: 4,
                        respuesta: 'new NotificacionSms()',
                        ayuda: '¿Qué clase de canales.ts corresponde a "sms"?',
                        explicacion: 'Cada if de la fábrica crea un canal distinto. Si mañana cambia cómo se crea el SMS, solo se toca esta línea.'
                    },
                    {
                        id: 5,
                        respuesta: 'NotificacionFabrica',
                        ayuda: 'El componente no crea la fábrica: la pide en el constructor (reto 6). ¿Qué tipo pide?',
                        explicacion: 'El componente pide la fábrica por inyección de dependencias. Sin new: Angular se la entrega.'
                    },
                    {
                        id: 6,
                        respuesta: 'crear',
                        ayuda: '¿Cómo se llama el método de la fábrica que fabrica notificaciones? Míralo en notificacion.fabrica.ts.',
                        explicacion: 'this.fabrica.crear(canal) reemplaza todo el if gigante: el componente solo dice qué canal quiere.'
                    },
                    {
                        id: 7,
                        respuesta: 'enviar',
                        ayuda: '¿Qué método garantiza el contrato Notificacion?',
                        explicacion: 'Lo que devuelve la fábrica cumple el contrato, así que siempre tiene enviar().'
                    }
                ],
                distractores: ['NotificacionCorreo', 'new Notificacion()', 'void', 'new NotificacionFabrica()', 'avisar'],
                archivosExtra: [
                    {
                        archivo: 'facturas.componente.ts',
                        nota: 'Otra pantalla, la misma fábrica',
                        codigo:
                            `export class FacturasComponente {
  constructor(private fabrica: NotificacionFabrica) {}

  avisarFactura(canal: string) {
    const notificacion = this.fabrica.crear(canal);
    return notificacion.enviar('Tu factura está lista');
  }
}`
                    },
                    {
                        archivo: 'notificacion.fabrica.ts (con Telegram)',
                        nota: '¿Y si llega Telegram?',
                        codigo:
                            `crear(canal: string): Notificacion {
  if (canal === 'correo') {
    return new NotificacionCorreo();
  }
  if (canal === 'sms') {
    return new NotificacionSms();
  }
  if (canal === 'telegram') {          // ← Solo se agrega esto
    return new NotificacionTelegram();
  }
  return new NotificacionWhatsapp();
}

// Las pantallas de pedidos y facturas NO cambian.`
                    }
                ]
            }
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
            concepto: 'Revisión de código (MVC, capas, SOLID y patrones)',
            contexto: 'Antes de salir a producción, el módulo de pedidos necesita tu aprobación. El código funciona, pero tiene errores de diseño de todo lo que has aprendido. Encuéntralos todos: si se te escapa uno, llega a producción.',
            evidencia: 'GP-ARQ-05',

            induccion: {
                remitente: 'Tech Lead',
                definicion: 'La revisión de código (code review) es la práctica de examinar el código de un compañero antes de unirlo al proyecto, para detectar errores de diseño, de arquitectura y de buenas prácticas. Un buen revisor no solo verifica que el código funcione: verifica que respete la arquitectura (MVC y capas), los principios SOLID y los patrones de diseño.',
                idea: 'Revisar código es leer el trabajo de otro con una lista de chequeo en la mano. No basta con que funcione: tiene que estar bien organizado para que mañana se pueda cambiar sin romper nada.',
                vidaReal: 'Antes de entregar una casa, un interventor la revisa con una lista: ¿las tuberías van por donde deben?, ¿los cables están bien conectados?, ¿la estructura aguanta? La casa puede "funcionar" y aun así tener fallas que saldrán caras después. En este reto, tú eres el interventor del código.',
                ejemplos: [
                    {
                        titulo: 'Un componente con varios errores a la vez',
                        esCorrecto: false,
                        archivo: 'perfil.componente.ts',
                        codigo:
                            `@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.componente.html',
  providers: [UsuarioServicio]
})
export class PerfilComponente {
  private correo = new CorreoServicio();

  constructor(private http: HttpClient) {}

  cargar() {
    return this.http.get('/api/usuarios/7');
  }
}`,
                        anotaciones: [
                            {
                                linea: 4,
                                marca: 'providers: [UsuarioServicio]',
                                tipo: 'problema',
                                texto: 'Singleton (reto 7): con providers el componente se fabrica su propia copia del servicio.'
                            },
                            {
                                linea: 6,
                                marca: 'class PerfilComponente',
                                tipo: 'clase',
                                texto: 'La clase del componente que vamos a revisar.'
                            },
                            {
                                linea: 7,
                                marca: 'new CorreoServicio()',
                                tipo: 'problema',
                                texto: 'Inyección de dependencias (reto 6): crea su dependencia con new en vez de pedirla.'
                            },
                            {
                                linea: 9,
                                marca: 'private http: HttpClient',
                                tipo: 'problema',
                                texto: 'Capas (reto 3): un componente que pide HttpClient se está preparando para saltarse el servicio.'
                            },
                            {
                                linea: 12,
                                marca: "this.http.get('/api/usuarios/7')",
                                tipo: 'problema',
                                texto: 'Capas (reto 3): aquí está el atajo. El componente llama a la API directamente.'
                            }
                        ]
                    },
                    {
                        titulo: 'El mismo componente, revisado',
                        esCorrecto: true,
                        archivo: 'perfil.componente.ts',
                        codigo:
                            `@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.componente.html'
})
export class PerfilComponente {
  constructor(private usuarioServicio: UsuarioServicio) {}

  cargar() {
    return this.usuarioServicio.obtenerUsuario(7);
  }
}`,
                        anotaciones: [
                            {
                                linea: 6,
                                marca: 'constructor',
                                tipo: 'constructor',
                                texto: 'Pide lo que necesita (reto 6). Sin providers, recibe la única instancia del servicio (reto 7).'
                            },
                            {
                                linea: 6,
                                marca: 'usuarioServicio: UsuarioServicio',
                                tipo: 'inyeccion',
                                texto: 'La dependencia llega desde afuera: Angular se la entrega.'
                            },
                            {
                                linea: 9,
                                marca: 'this.usuarioServicio.obtenerUsuario(7)',
                                tipo: 'metodo',
                                texto: 'Habla solo con su servicio (reto 3), y cada clase hace un solo trabajo (reto 4).'
                            }
                        ]
                    }
                ],
                guia: {
                    titulo: 'Lista de chequeo del revisor',
                    columnas: ['Pregúntate en cada archivo…', 'Tema', 'Si la respuesta es NO…'],
                    filas: [
                        ['¿El componente solo muestra y coordina, sin reglas de negocio?', 'MVC · reto 1', 'Mueve la regla al servicio o al modelo'],
                        ['¿El componente habla solo con su servicio (sin HttpClient ni localStorage)?', 'Capas · retos 2 y 3', 'Mueve el acceso a datos al servicio'],
                        ['¿Cada clase tiene un solo trabajo?', 'SRP · reto 4', 'Sepáralo en otro servicio'],
                        ['¿Las clases piden sus dependencias en vez de crearlas con new?', 'Inyección · retos 5 y 6', 'Pídelas en el constructor'],
                        ['¿Los servicios compartidos existen una sola vez?', 'Singleton · reto 7', 'Usa providedIn: \'root\' y quita providers'],
                        ['¿La creación de objetos por tipo está en un solo lugar?', 'Factory · reto 8', 'Usa la fábrica en vez del if']
                    ]
                },
                notaAngular: 'En los equipos reales nadie sube código a la rama principal sin que otro lo revise en un Pull Request. GitHub y GitLab muestran los cambios línea por línea y el revisor deja comentarios, igual que en este reto.',
                objetivo: 'Revisa los 3 archivos del Pull Request #42 y marca los 6 problemas de diseño antes de que lleguen a producción.',
                comoJugar: [
                    'Este Pull Request tiene 3 archivos y 6 problemas. Cada problema es de un tema distinto que ya viste.',
                    'Usa la lista de chequeo: pasa cada pregunta por cada archivo.',
                    'Haz clic en una línea para marcarla. Si todo un método o un bloque sobra, basta con marcar una de sus líneas.',
                    'Pulsa Enviar revisión. Te diremos cuántos problemas te faltan, pero no cuáles.'
                ]
            },

            pistas: [
                'pedidos.componente.ts tiene 3 problemas, pedido.servicio.ts tiene 2 y avisos.componente.ts tiene 1.',
                'Busca: providers, localStorage, un cálculo de descuento, un new, un método que genera un PDF y un if que decide qué notificación crear.'
            ],

            explicacionFinal: 'Acabas de hacer una revisión de código completa, como un desarrollador senior.\n\nEncontraste 6 problemas, cada uno de un tema de la ruta: la regla del descuento estaba en la vista (MVC), el componente guardaba datos con localStorage (capas), el servicio también generaba reportes (SRP), creaba su notificador con new (inyección de dependencias), el componente se fabricaba su propio servicio con providers (Singleton) y otra pantalla repetía el if en vez de usar la fábrica (Factory).\n\nNinguno de estos errores hacía que la app fallara hoy. Pero todos la hacían difícil de cambiar mañana. Ver eso a tiempo es lo que hace un arquitecto de software.\n\n¡Terminaste la ruta de Code Architect!',

            revisarCodigo: {
                archivos: [
                    {
                        archivo: 'pedidos.componente.ts',
                        codigo:
                            `import { Component, OnInit } from '@angular/core';
import { PedidoServicio } from '../servicios/pedido.servicio';
import { Pedido } from '../modelos/pedido.modelo';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.componente.html',
  providers: [PedidoServicio]
})
export class PedidosComponente implements OnInit {
  pedidos: Pedido[] = [];
  mensaje = '';

  constructor(private pedidoServicio: PedidoServicio) {}

  ngOnInit() {
    this.pedidoServicio.obtenerPedidos()
      .subscribe(datos => this.pedidos = datos);
    localStorage.setItem('ultimaVisita', new Date().toString());
  }

  totalConDescuento(pedido: Pedido): number {
    if (pedido.total > 100000) {
      return pedido.total * 0.9;
    }
    return pedido.total;
  }

  cancelar(pedido: Pedido) {
    this.pedidoServicio.cancelar(pedido.id)
      .subscribe(() => this.mensaje = 'Pedido cancelado');
  }
}`
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../modelos/pedido.modelo';

@Injectable({ providedIn: 'root' })
export class PedidoServicio {
  private notificador = new NotificacionCorreo();

  constructor(private http: HttpClient) {}

  obtenerPedidos() {
    return this.http.get<Pedido[]>('/api/pedidos');
  }

  cancelar(id: number) {
    this.notificador.enviar('Tu pedido ' + id + ' fue cancelado');
    return this.http.delete('/api/pedidos/' + id);
  }

  generarReportePdf(pedidos: Pedido[]) {
    const filas = pedidos.map(p => p.id + ': ' + p.total);
    return this.http.post('/api/reportes/pdf', { filas });
  }
}`
                    },
                    {
                        archivo: 'avisos.componente.ts',
                        codigo:
                            `export class AvisosComponente {
  constructor(private fabrica: NotificacionFabrica) {}

  avisar(canal: string, mensaje: string) {
    let notificacion: Notificacion;
    if (canal === 'sms') {
      notificacion = new NotificacionSms();
    } else {
      notificacion = new NotificacionCorreo();
    }
    return notificacion.enviar(mensaje);
  }
}`
                    }
                ],
                problemas: [
                    {
                        archivo: 'pedidos.componente.ts',
                        linea: 8,
                        comentario: 'Singleton (reto 7): providers: [PedidoServicio] crea una copia del servicio solo para esta pantalla. Si otra parte de la app cancela un pedido, esta pantalla no se entera. Hay que quitar esta línea.'
                    },
                    {
                        archivo: 'pedidos.componente.ts',
                        linea: 19,
                        comentario: 'Capas (reto 3): localStorage es acceso a datos. El componente no debe guardar nada por su cuenta: se lo pide al servicio (por ejemplo, this.pedidoServicio.registrarVisita()).'
                    },
                    {
                        archivo: 'pedidos.componente.ts',
                        linea: 22,
                        hasta: 27,
                        comentario: 'MVC (reto 1): "10% de descuento si pasa de $100.000" es una regla del negocio. Si queda en la vista, habrá que copiarla en el carrito, la factura y el correo. Va en el servicio (o el modelo), y el componente solo la usa.'
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        linea: 7,
                        comentario: 'Inyección de dependencias (reto 6): el servicio crea su notificador con new y queda amarrado al correo para siempre. Debe pedir la fábrica de notificaciones en el constructor.'
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        linea: 20,
                        hasta: 23,
                        comentario: 'Responsabilidad única (reto 4): generar reportes PDF es otro trabajo. Si cambia el formato del reporte, no debería tocarse el servicio de pedidos. Va en ReporteServicio.'
                    },
                    {
                        archivo: 'avisos.componente.ts',
                        linea: 5,
                        hasta: 10,
                        comentario: 'Factory (reto 8): ¡ya pidió la fábrica en el constructor y no la usa! Este if con new repite lo que la fábrica ya sabe hacer. Debe ser this.fabrica.crear(canal).'
                    }
                ],
                falsasAlarmas: [
                    {
                        archivo: 'pedidos.componente.ts',
                        linea: 14,
                        comentario: 'Pedir el servicio en el constructor es correcto (inyección de dependencias).'
                    },
                    {
                        archivo: 'pedidos.componente.ts',
                        linea: 17,
                        hasta: 18,
                        comentario: 'Pedirle los pedidos al servicio y esperar la respuesta con subscribe es justo lo que debe hacer el componente.'
                    },
                    {
                        archivo: 'pedidos.componente.ts',
                        linea: 29,
                        hasta: 32,
                        comentario: 'Cancelar a través del servicio y mostrar un mensaje está bien: el componente coordina y muestra.'
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        linea: 2,
                        comentario: 'Un servicio SÍ puede usar HttpClient: es la capa que habla con la API.'
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        linea: 5,
                        comentario: 'providedIn: \'root\' está bien: hace que exista un solo PedidoServicio (Singleton).'
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        linea: 9,
                        comentario: 'Pedir HttpClient en el constructor de un servicio es correcto.'
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        linea: 11,
                        hasta: 13,
                        comentario: 'Obtener los pedidos de la API es justo el trabajo de este servicio.'
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        linea: 16,
                        comentario: 'Usar el notificador para avisar está bien. El problema es CÓMO se consiguió ese notificador (línea 7).'
                    },
                    {
                        archivo: 'avisos.componente.ts',
                        linea: 2,
                        comentario: 'Pedir la fábrica en el constructor es correcto. El problema es que después no la usa.'
                    },
                    {
                        archivo: 'avisos.componente.ts',
                        linea: 11,
                        comentario: 'Usar enviar() del contrato está bien: funciona con cualquier canal.'
                    }
                ],
                archivosCorregidos: [
                    {
                        archivo: 'pedidos.componente.ts',
                        codigo:
                            `import { Component, OnInit } from '@angular/core';
import { PedidoServicio } from '../servicios/pedido.servicio';
import { Pedido } from '../modelos/pedido.modelo';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.componente.html'
})
export class PedidosComponente implements OnInit {
  pedidos: Pedido[] = [];
  mensaje = '';

  constructor(private pedidoServicio: PedidoServicio) {}

  ngOnInit() {
    this.pedidoServicio.obtenerPedidos()
      .subscribe(datos => this.pedidos = datos);
    this.pedidoServicio.registrarVisita();
  }

  totalConDescuento(pedido: Pedido): number {
    return this.pedidoServicio.calcularTotal(pedido);
  }

  cancelar(pedido: Pedido) {
    this.pedidoServicio.cancelar(pedido.id)
      .subscribe(() => this.mensaje = 'Pedido cancelado');
  }
}`
                    },
                    {
                        archivo: 'pedido.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../modelos/pedido.modelo';
import { NotificacionFabrica } from '../notificaciones/notificacion.fabrica';

@Injectable({ providedIn: 'root' })
export class PedidoServicio {
  constructor(
    private http: HttpClient,
    private fabrica: NotificacionFabrica
  ) {}

  obtenerPedidos() {
    return this.http.get<Pedido[]>('/api/pedidos');
  }

  calcularTotal(pedido: Pedido): number {
    return pedido.total > 100000 ? pedido.total * 0.9 : pedido.total;
  }

  registrarVisita() {
    localStorage.setItem('ultimaVisita', new Date().toString());
  }

  cancelar(id: number) {
    this.fabrica.crear('correo').enviar('Tu pedido ' + id + ' fue cancelado');
    return this.http.delete('/api/pedidos/' + id);
  }
}`
                    },
                    {
                        archivo: 'reporte.servicio.ts',
                        codigo:
                            `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../modelos/pedido.modelo';

@Injectable({ providedIn: 'root' })
export class ReporteServicio {
  constructor(private http: HttpClient) {}

  generarPdf(pedidos: Pedido[]) {
    const filas = pedidos.map(p => p.id + ': ' + p.total);
    return this.http.post('/api/reportes/pdf', { filas });
  }
}`
                    },
                    {
                        archivo: 'avisos.componente.ts',
                        codigo:
                            `export class AvisosComponente {
  constructor(private fabrica: NotificacionFabrica) {}

  avisar(canal: string, mensaje: string) {
    const notificacion = this.fabrica.crear(canal);
    return notificacion.enviar(mensaje);
  }
}`
                    }
                ]
            }
        }

    ];

    /** Reto bonus: no está en la ruta, se abre al terminar los 9 retos y no cuenta para el 100%. */
    private retoBonus: Reto = {
        id: 10,
        misionId: 5,
        esBonus: true,
        titulo: 'La puerta de entrada',
        descripcion: 'Conecta el frontend a varios microservicios a través de un API Gateway.',
        tipoJuego: 'completar-codigo',
        dificultad: 'media',
        puntos: 250,
        concepto: 'Microservicios y API Gateway',
        contexto: 'La tienda creció y el servidor se dividió en 3 microservicios: productos, pedidos y usuarios. El frontend tiene sus direcciones regadas por todo el código, y cada vez que mueven uno de servidor se rompe la app. Conecta todo a través de un API Gateway.',
        evidencia: 'GP-ARQ-04',

        induccion: {
            remitente: 'Arquitecto de software',
            definicion: 'Los microservicios son una arquitectura en la que una aplicación grande se divide en servicios pequeños e independientes (por ejemplo: productos, pedidos y usuarios), cada uno con su propio código, su propia base de datos y su propio despliegue. El API Gateway es la puerta de entrada única: el frontend le habla solo a él, y él reenvía cada petición al microservicio correcto.',
            idea: 'En vez de una sola aplicación gigante en el servidor, hay varias pequeñas que trabajan juntas. Para que el frontend no tenga que conocerlas todas, existe una sola puerta de entrada: el API Gateway.',
            vidaReal: 'En un centro comercial hay muchas tiendas, cada una con su dueño, su bodega y sus horarios (los microservicios). Tú no necesitas saber dónde queda la bodega de cada una: entras por la puerta principal y el directorio te lleva a la tienda correcta (el API Gateway). Si una tienda se cambia de local, actualizan el directorio, y tú sigues entrando por la misma puerta.',
            ejemplos: [
                {
                    titulo: 'Sin gateway vs. con gateway',
                    codigo:
                        `  SIN GATEWAY                              CON GATEWAY

  Frontend ──► productos  :3001            Frontend ──► API Gateway ──► productos  :3001
           ──► pedidos    :3002                                     ├──► pedidos    :3002
           ──► usuarios   :3003                                     └──► usuarios   :3003

  El frontend conoce 3 direcciones.        El frontend conoce 1 sola dirección.`
                },
                {
                    titulo: 'El frontend conoce la dirección de cada microservicio',
                    esCorrecto: false,
                    archivo: 'tienda.servicio.ts',
                    codigo:
                        `export class TiendaServicio {
  constructor(private http: HttpClient) {}

  obtenerProductos() {
    return this.http.get('http://10.0.0.5:3001/productos');
  }

  obtenerPedidos() {
    return this.http.get('http://10.0.0.6:3002/pedidos');
  }
}`,
                    anotaciones: [
                        {
                            linea: 1,
                            marca: 'class TiendaServicio',
                            tipo: 'clase',
                            texto: 'Un servicio del frontend que pide datos al servidor.'
                        },
                        {
                            linea: 4,
                            marca: 'obtenerProductos()',
                            tipo: 'metodo',
                            texto: 'Un método que pide la lista de productos.'
                        },
                        {
                            linea: 5,
                            marca: "'http://10.0.0.5:3001/productos'",
                            tipo: 'problema',
                            texto: 'El frontend conoce la dirección exacta del microservicio de productos. Si lo mueven de servidor, hay que cambiar el frontend y volver a publicarlo.'
                        },
                        {
                            linea: 9,
                            marca: "'http://10.0.0.6:3002/pedidos'",
                            tipo: 'problema',
                            texto: 'Otra dirección distinta. Con 10 microservicios, serían 10 direcciones regadas por el código.'
                        }
                    ]
                },
                {
                    titulo: 'Una sola dirección: la del gateway',
                    esCorrecto: true,
                    archivo: 'api.config.ts',
                    codigo:
                        `export const API_GATEWAY = 'https://api.mitienda.com';`,
                    anotaciones: [
                        {
                            linea: 1,
                            marca: 'API_GATEWAY',
                            tipo: 'variable',
                            texto: 'Una constante (una variable que nunca cambia) con la ÚNICA dirección que conoce el frontend: la del gateway.'
                        }
                    ]
                },
                {
                    titulo: 'Todos los servicios entran por la misma puerta',
                    esCorrecto: true,
                    archivo: 'tienda.servicio.ts',
                    codigo:
                        `export class TiendaServicio {
  constructor(private http: HttpClient) {}

  obtenerProductos() {
    return this.http.get(API_GATEWAY + '/productos');
  }

  obtenerPedidos() {
    return this.http.get(API_GATEWAY + '/pedidos');
  }
}`,
                    anotaciones: [
                        {
                            linea: 5,
                            marca: 'API_GATEWAY',
                            tipo: 'variable',
                            texto: 'Siempre la misma puerta de entrada.'
                        },
                        {
                            linea: 5,
                            marca: "'/productos'",
                            tipo: 'variable',
                            texto: 'Solo cambia la ruta. El gateway sabe que /productos va al microservicio de productos.'
                        },
                        {
                            linea: 9,
                            marca: "'/pedidos'",
                            tipo: 'variable',
                            texto: 'Lo mismo con pedidos: el frontend no necesita saber en qué servidor vive.'
                        }
                    ]
                }
            ],
            guia: {
                titulo: 'Monolito vs. microservicios',
                columnas: ['Pregunta', 'Monolito', 'Microservicios'],
                filas: [
                    ['¿Cómo está hecho el servidor?', 'Una sola aplicación grande', 'Varios servicios pequeños'],
                    ['Si falla una parte…', 'Puede caerse todo', 'Solo falla ese servicio'],
                    ['Para actualizar una parte…', 'Se publica todo de nuevo', 'Se publica solo ese servicio'],
                    ['¿Cuántas direcciones conoce el frontend?', 'Una', 'Una, gracias al API Gateway'],
                    ['¿Cuándo conviene?', 'Proyectos pequeños', 'Sistemas grandes con varios equipos']
                ]
            },
            notaAngular: 'Para tu frontend en Angular casi nada cambia: los servicios siguen usando HttpClient. La diferencia es que todos apuntan a una sola dirección base, la del gateway. Por eso se guarda en una constante o en el archivo environment.ts.',
            objetivo: 'Completa los 5 espacios para que el frontend hable solo con el API Gateway, y el gateway reenvíe cada petición a su microservicio.',
            comoJugar: [
                'tienda.servicio.ts (antes) muestra las direcciones regadas por el código: úsalo para encontrar la dirección de cada microservicio.',
                'gateway.rutas.ts vive en el servidor: es el único que debe conocer las direcciones con números.',
                'Toca un espacio vacío y luego la pieza que va ahí. Ojo: hay piezas de más.',
                'Cuando llenes todos los espacios, pulsa Verificar.'
            ]
        },

        pistas: [
            'Las direcciones con números (10.0.0.x:300x) solo deben aparecer en el gateway, nunca en los servicios del frontend.',
            'En los servicios del frontend, la dirección siempre empieza con API_GATEWAY y después va la ruta: /productos o /pedidos.'
        ],

        explicacionFinal: 'Acabas de conectar un frontend a una arquitectura de microservicios.\n\nAntes, el frontend conocía la dirección de cada microservicio: si uno se mudaba de servidor, había que cambiar el frontend y volver a publicarlo. Ahora el frontend solo conoce una dirección, la del API Gateway, y el gateway sabe a qué microservicio mandar cada petición.\n\nEs la misma idea de toda la ruta, pero en grande: cada microservicio tiene una sola responsabilidad (SRP), y el gateway esconde los detalles de atrás, como un contrato (interfaces).\n\nOjo: los microservicios no siempre son mejores. Para un proyecto pequeño, un monolito bien organizado (con MVC y capas) suele ser más fácil de mantener.',

        completarCodigo: {
            archivos: [
                {
                    archivo: 'tienda.servicio.ts (antes)',
                    nota: 'Así estaba: 3 direcciones regadas',
                    codigo:
                        `export class TiendaServicio {
  constructor(private http: HttpClient) {}

  obtenerProductos() {
    return this.http.get<Producto[]>('http://10.0.0.5:3001/productos');
  }

  crearPedido(pedido: Pedido) {
    return this.http.post('http://10.0.0.6:3002/pedidos', pedido);
  }

  obtenerUsuario(id: number) {
    return this.http.get<Usuario>('http://10.0.0.7:3003/usuarios/' + id);
  }
}`
                },
                {
                    archivo: 'gateway.rutas.ts',
                    nota: 'Vive en el servidor',
                    codigo:
                        `// El API Gateway: la única puerta de entrada al servidor.
// Recibe cada petición y la reenvía al microservicio correcto.
export const rutas: Record<string, string> = {
  '/productos': 'http://10.0.0.5:3001',
  '/pedidos':   'http://10.0.0.6:3002',
  '/usuarios':  [[1]]
};`
                },
                {
                    archivo: 'api.config.ts',
                    codigo:
                        `// La ÚNICA dirección que conoce el frontend
export const API_GATEWAY = [[2]];`
                },
                {
                    archivo: 'productos.servicio.ts',
                    codigo:
                        `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_GATEWAY } from '../api.config';
import { Producto } from '../modelos/producto.modelo';

@Injectable({ providedIn: 'root' })
export class ProductosServicio {
  constructor(private http: HttpClient) {}

  obtenerProductos() {
    return this.http.get<Producto[]>([[3]] + '/productos');
  }
}`
                },
                {
                    archivo: 'pedidos.servicio.ts',
                    codigo:
                        `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_GATEWAY } from '../api.config';
import { Pedido } from '../modelos/pedido.modelo';

@Injectable({ providedIn: 'root' })
export class PedidosServicio {
  constructor(private http: HttpClient) {}

  crearPedido(pedido: Pedido) {
    return this.http.[[4]](API_GATEWAY + [[5]], pedido);
  }
}`
                }
            ],
            huecos: [
                {
                    id: 1,
                    respuesta: "'http://10.0.0.7:3003'",
                    ayuda: 'El gateway es el que SÍ conoce dónde vive cada microservicio. Busca en tienda.servicio.ts (antes) la dirección del microservicio de usuarios.',
                    explicacion: 'El gateway guarda la dirección de cada microservicio. Si usuarios se muda de servidor, solo se cambia esta línea, y el frontend ni se entera.'
                },
                {
                    id: 2,
                    respuesta: "'https://api.mitienda.com'",
                    ayuda: 'El frontend debe conocer UNA sola dirección: la de la puerta de entrada, no la de un microservicio.',
                    explicacion: 'API_GATEWAY guarda la única dirección que necesita el frontend: la del gateway.'
                },
                {
                    id: 3,
                    respuesta: 'API_GATEWAY',
                    ayuda: 'No escribas la dirección del microservicio: usa la constante que guarda la dirección del gateway.',
                    explicacion: 'API_GATEWAY + \'/productos\': siempre la misma puerta, y el gateway decide a dónde va.'
                },
                {
                    id: 4,
                    respuesta: 'post',
                    ayuda: 'Crear un pedido es ENVIAR datos nuevos al servidor. ¿Qué método de HttpClient se usa para eso?',
                    explicacion: 'post se usa para enviar datos nuevos (crear). get es solo para pedir datos.'
                },
                {
                    id: 5,
                    respuesta: "'/pedidos'",
                    ayuda: '¿Qué ruta usa el gateway para el microservicio de pedidos? Mírala en gateway.rutas.ts.',
                    explicacion: '\'/pedidos\' es la ruta que el gateway reenvía al microservicio de pedidos.'
                }
            ],
            distractores: ["'http://10.0.0.5:3001'", 'get', "'/productos'", "'http://10.0.0.6:3002/pedidos'", 'HttpClient'],
            archivosExtra: [
                {
                    archivo: 'gateway.rutas.ts (después de una mudanza)',
                    nota: '¿Y si pedidos se muda de servidor?',
                    codigo:
                        `export const rutas: Record<string, string> = {
  '/productos': 'http://10.0.0.5:3001',
  '/pedidos':   'http://10.0.0.20:3002',   // ← Se mudó: solo cambia aquí
  '/usuarios':  'http://10.0.0.7:3003'
};

// El frontend (api.config.ts y los servicios) NO cambia.`
                }
            ]
        }
    };

    /** El bonus se completa aparte: no suma a retosCompletados. */
    private bonusCompletado = false;

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


    /** Busca en la ruta y también el bonus. */
    obtenerReto(id: number): Reto | undefined {
        if (id === this.retoBonus.id) {
            return this.retoBonus;
        }
        return this.retos.find(reto => reto.id === id);
    }


    obtenerRetoBonus(): Reto {
        return this.retoBonus;
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
        // El bonus se abre cuando se terminan TODOS los retos de la ruta
        if (id === this.retoBonus.id) {
            if (this.bonusCompletado) {
                return 'completado';
            }
            return this.progreso.retosCompletados >= this.retos.length ? 'actual' : 'bloqueado';
        }

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
        return this.retos.find(reto => reto.id === this.progreso.retosCompletados + 1);
    }


    /** Suma los puntos del bonus (son puntos extra: no cambian el progreso de la ruta). */
    completarBonus(puntos: number): void {
        if (!this.bonusCompletado) {
            this.progreso.puntos += puntos;
            this.bonusCompletado = true;
        }
    }


    /** Suma de los puntos de todos los retos. */
    obtenerPuntosTotales(): number {
        return this.retos.reduce((total, reto) => total + reto.puntos, 0);
    }

}