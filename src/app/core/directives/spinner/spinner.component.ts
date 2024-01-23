import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  constructor(public vcRef: ViewContainerRef) {}
}
