import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { MisionComponent } from './pages/mision/mision.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        component: InicioComponent,
    },
    {
        path: 'mapa',
        component: MapaComponent,
    },
    {
        path: 'mision/:id',
        component: MisionComponent,
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