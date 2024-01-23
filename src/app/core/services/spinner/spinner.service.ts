import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private statusChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private status$: Observable<boolean>;

  constructor() {
    this.status$ = this.statusChange.asObservable();
  }

  get display$() {
    return this.status$;
  }

  display() {
    this.statusChange.next(true);
  }

  hide() {
    this.statusChange.next(false);
  }
}
