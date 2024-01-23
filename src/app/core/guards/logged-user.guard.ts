import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CurrentUserService } from '../services/current-user/current-user.service';
import { inject } from '@angular/core';

export const loggerUserGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const currentUserService = inject(CurrentUserService);
  if (!currentUserService.isLogged) {
    router.navigate(['/login']);
  }
  return true;
};

export const anonymousUserGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const currentUserService = inject(CurrentUserService);
  if (currentUserService.isLogged) {
    router.navigate(['/']);
  }
  return true;
};
