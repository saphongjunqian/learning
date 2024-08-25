import { Routes } from '@angular/router';

const routeConfig: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/homepage').then(m => m.Homepage)
  },
  {
    path: 'typing',
    loadComponent: () => import('./pages/typing-exercises').then(m => m.TypingExercisesComponent)
  },
  {
    path: 'reciting',
    loadComponent: () => import('./pages/chinese-recites').then(m => m.ChineseRecitesComponent)
  },
  {
    path: 'formatter',
    loadComponent: () => import('./pages/formatter-recites').then(m => m.FormatterRecitesComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found').then(m => m.NotFound)
  },
  { path: '**', redirectTo: '/404' },
];

export default routeConfig;
