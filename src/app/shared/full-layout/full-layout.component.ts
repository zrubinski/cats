import { Component } from '@angular/core';
import { MenuNavComponent } from '../menu-nav/menu-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [RouterOutlet, MenuNavComponent],
  templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent {}
