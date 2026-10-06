import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        loadComponent: () =>
            import('./pages/inicio/inicio.component')
                .then(m => m.InicioComponent)
    },
    {
        path: 'mapa',
        loadComponent: () =>
            import('./pages/mapa/mapa.component')
                .then(m => m.MapaComponent)
    },
    {
        path: 'mision/:id',
        loadComponent: () =>
            import('./pages/mision/mision.component')
                .then(m => m.MisionComponent)
    },
    {
        path: 'resultado',
        loadComponent: () =>
            import('./pages/resultado/resultado.component')
                .then(m => m.ResultadoComponent)
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }
];