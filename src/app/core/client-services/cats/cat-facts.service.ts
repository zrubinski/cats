import { Injectable } from '@angular/core';
import { AppConfigService } from '../../services/app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatFact } from './models/cat-fact.model';

@Injectable({
  providedIn: 'root',
})
export class CatFactsService {
  constructor(
    private httpClient: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  getRandomFact(): Observable<CatFact> {
    const url = `${this.appConfigService.apiAddress}`;
    return this.httpClient.get<CatFact>(url);
  }
}
