import { Component, ErrorHandler, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalErrorHandler } from './core/errors/global-error.handler';
import { PrimeNGConfig } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './core/services/spinner/spinner.service';
import { Observable } from 'rxjs';
import { SpinnerComponent } from './core/directives/spinner/spinner.component';
import { SpinnerDirective } from './core/directives/spinner/spinner.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SpinnerComponent, SpinnerDirective],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  displaySpinner$: Observable<boolean>;

  constructor(spinnerService: SpinnerService,private primengConfig: PrimeNGConfig) {
    this.displaySpinner$ = spinnerService.display$;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }
}
