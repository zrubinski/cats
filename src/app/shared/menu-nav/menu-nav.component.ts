import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CurrentUserService } from '../../core/services/current-user/current-user.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [MenubarModule, ButtonModule],
  templateUrl: './menu-nav.component.html',
})
export class MenuNavComponent {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}
  items: MenuItem[] = [
    {
      label: 'Cats',
      routerLink: 'cats',
    }
  ];

  onLogout() {
    this.currentUserService.logout();
    this.router.navigate(['login']);
  }
}
