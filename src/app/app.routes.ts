import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Listado } from './pages/listado/listado';
import { Detalle } from './pages/detalle/detalle';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'listado', component: Listado },
  { path: 'detalle/:id', component: Detalle },
  { path: 'contacto', component: Contacto },
  { path: '**', redirectTo: '' }
];
