import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AyuntamientoComponent } from './components/ayuntamiento/ayuntamiento.component';
import { DifComponent } from './components/dif/dif.component';
import { ObrasComponent } from './components/obras/obras.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'ayuntamiento/:tipo', component: AyuntamientoComponent },
    { path: 'dif', component: DifComponent },
    { path: 'obras', component: ObrasComponent },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' } 
];
