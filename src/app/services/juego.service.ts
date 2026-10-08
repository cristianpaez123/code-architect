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
            contexto: 'Un cliente dice que al agregar un producto al carrito, el total no cambia. Antes de buscar el error, necesitamos entender por dónde viaja el clic.',
            evidencia: 'GP-ARQ-01',

            induccion: {
                remitente: 'Soporte',
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
                        codigo: `<button (click)="darMeGusta()">❤️</button>`
                    },
                    {
                        titulo: '2. Componente: le pasa el trabajo al servicio',
                        esCorrecto: true,
                        archivo: 'publicacion.componente.ts',
                        codigo:
                            `darMeGusta() {
  this.servicioPublicacion.sumarMeGusta(this.idPublicacion);
}`
                    },
                    {
                        titulo: '3. Servicio: revisa la regla y llama a la API',
                        esCorrecto: true,
                        archivo: 'publicacion.servicio.ts',
                        codigo:
                            `sumarMeGusta(id: number) {
  if (this.yaDioMeGusta(id)) { return; }
  return this.apiPublicacion.guardarMeGusta(id);
}`
                    },
                    {
                        titulo: '4. De vuelta: el componente actualiza la vista',
                        esCorrecto: true,
                        archivo: 'publicacion.componente.ts',
                        codigo:
                            `.subscribe(respuesta => {
  this.totalMeGusta = respuesta.total;
});`
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
                idea: 'En una arquitectura por capas, el componente solo habla con su servicio. Si el componente llama directo a la API o guarda datos por su cuenta, se está "saltando una capa".',
                vidaReal: 'En un restaurante, el mesero toma tu pedido y se lo pasa a la cocina. Si el mesero entra a la bodega a sacar ingredientes él mismo, la cocina pierde el control: nadie sabe qué se gastó, y cuando algo falte nadie sabrá por qué. Cada uno hace su parte y le pide al siguiente.',
                ejemplos: [
                    {
                        titulo: 'Con atajo: el componente va directo a la API',
                        esCorrecto: false,
                        archivo: 'pedidos.componente.ts',
                        codigo:
                            `constructor(private http: HttpClient) {}

cargar() {
  this.http.get('/api/pedidos')
    .subscribe(datos => this.pedidos = datos);
}`
                    },
                    {
                        titulo: 'Sin atajo: el componente le pide al servicio',
                        esCorrecto: true,
                        archivo: 'pedidos.componente.ts',
                        codigo:
                            `constructor(private pedidoServicio: PedidoServicio) {}

cargar() {
  this.pedidoServicio.obtenerPedidos()
    .subscribe(datos => this.pedidos = datos);
}`
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

  // Trabajo 1: registrar usuarios ✅
  registrar(nombre: string, correo: string) {
    return this.http.post('/api/usuarios', { nombre, correo });
  }

  // Trabajo 2: enviar correos ❌ no es de aquí
  enviarBienvenida(correo: string) {
    return this.http.post('/api/correos', { para: correo, asunto: 'Bienvenido' });
  }
}`
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
}`
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
}`
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
}`
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
}`
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
}`
                    },
                    {
                        titulo: 'Clase que NO cumple el contrato',
                        esCorrecto: false,
                        archivo: 'exportador-word.ts',
                        codigo:
                            `import { Exportador } from './exportador';

export class ExportadorWord implements Exportador {
  formato = 'Word';

  // ❌ El contrato pide exportar(), no descargar()
  descargar(datos: string[]): string {
    return 'Word con ' + datos.length + ' filas';
  }
}

// TypeScript avisa ANTES de ejecutar:
// "La clase ExportadorWord no implementa 'exportar'"`
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
// this.descargar(new ExportadorPdf());`
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