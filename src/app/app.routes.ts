import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auths/pages/login/login.component';
import { anonymousUserGuard, loggerUserGuard } from './core/guards/logged-user.guard';
import { FullLayoutComponent } from './shared/full-layout/full-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'cats',
        pathMatch: 'full',
      },
      {
        path: 'cats',
        loadChildren: () =>
          import('../app/modules/cats/cats.routes').then((routes) => routes.routes),
        canActivate: [loggerUserGuard],
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [anonymousUserGuard],
  }
];
