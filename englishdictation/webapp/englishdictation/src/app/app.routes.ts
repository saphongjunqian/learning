import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TypingExercisesComponent } from './pages/typing-exercises';

const routeConfig: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Welcome page',
  },
  {
    path: 'typing',
    component: TypingExercisesComponent,
    title: 'Typing Exercises',
  },
];

export default routeConfig;

