import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatFactsService } from '../../../../core/client-services/cats/cat-facts.service';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  filter,
  finalize,
  forkJoin,
  map,
  repeat,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { SpinnerService } from '../../../../core/services/spinner/spinner.service';
import { CatFact } from '../../../../core/client-services/cats/models/cat-fact.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-cat-facts',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, CardModule],
  templateUrl: './cat-facts.component.html',
  styleUrl: './cat-facts.component.scss',
})
export class CatFactsComponent implements OnInit {
  private static readonly LOAD_ITEMS = 5;
  protected facts$: Observable<string[]>;

  private uniqueFacts: string[] = [];
  private loadDataSubject = new BehaviorSubject<number>(0);

  constructor(
    private spinnerService: SpinnerService,
    private catFactsService: CatFactsService
  ) {
    this.facts$ = this.loadDataSubject
      .asObservable()
      .pipe(tap((_: number) => this.spinnerService.display()))
      .pipe(switchMap((x: number) => this.loadUniqueFacts(x)))
      .pipe(tap((_: string[]) => this.spinnerService.hide()))
      .pipe(map((_: string[]) => this.uniqueFacts));
  }

  ngOnInit(): void {
    this.loadDataSubject.next(CatFactsComponent.LOAD_ITEMS);
  }

  protected onScroll(): void {
    this.loadDataSubject.next(CatFactsComponent.LOAD_ITEMS);
  }

  private toArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1);
  }

  private loadUniqueFacts(number: number): Observable<string[]> {
    return forkJoin(
      this.toArray(number).map((_) =>
        this.loadUniqueFact().pipe(tap((x: string) => this.uniqueFacts.push(x)))
      )
    );
  }

  private loadUniqueFact(): Observable<string> {
    return this.catFactsService.getRandomFact().pipe(
      map((x: CatFact) => x.data),
      map((x: string[]) => (x != null && x.length > 0 ? x[0] : '')),
      repeat(),
      filter(
        (x: string) => x != null && !this.uniqueFacts.some((f) => f === x)
      ),
      take(1)
    );
  }
}
