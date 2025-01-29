import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AyuntamientoComponent } from './components/ayuntamiento/ayuntamiento.component';
import { DifComponent } from './components/dif/dif.component';
import { ObrasComponent } from './components/obras/obras.component';
import { AvisoPrivacidadComponent } from './components/aviso-privacidad/aviso-privacidad.component';
import { SevacComponent } from './components/sevac/sevac.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'ayuntamiento/:tipo', component: AyuntamientoComponent },
    { path: 'dif', component: DifComponent },
    { path: 'obras/:idObra', component: ObrasComponent },
    { path: 'avisoPrivacidad', component: AvisoPrivacidadComponent },
    { path: 'sevac', component: SevacComponent },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' } 
];
