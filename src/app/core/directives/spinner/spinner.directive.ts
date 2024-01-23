import {
  ComponentRef,
  Directive,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { SpinnerComponent } from './spinner.component';

@Directive({
  selector: '[appSpinner]',
  standalone: true,
})
export class SpinnerDirective implements OnChanges, OnDestroy {
  @Input('appSpinner') show: boolean | null = false;

  @HostBinding('class.position-relative') elementClass = true;

  private spinnerComponentRef?: ComponentRef<SpinnerComponent>;

  constructor(private vcRef: ViewContainerRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] != null) {
      if (changes['show'].currentValue) {
        this.createSpinner();
      } else {
        this.destroySpinner();
      }
    }
  }

  ngOnDestroy() {
    this.destroySpinner();
  }

  private createSpinner() {
    this.spinnerComponentRef = this.vcRef.createComponent(SpinnerComponent);
    this.renderer.appendChild(
      this.vcRef.element.nativeElement,
      this.spinnerComponentRef.injector.get(SpinnerComponent).vcRef.element
        .nativeElement
    );
  }

  private destroySpinner() {
    if (this.spinnerComponentRef) {
      this.spinnerComponentRef.destroy();
    }
  }
}
