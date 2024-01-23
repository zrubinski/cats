import { Injectable } from '@angular/core';
import { AppConfig } from './models/app-config.model';
import { environment } from '../../../../environments/environment';

Injectable({
  providedIn: 'root',
});
export class AppConfigService {
  private appConfig: AppConfig | undefined;

  constructor() {
    this.appConfig = environment as AppConfig;
  }

  get apiAddress(): string {
    const apiAddress = this.appConfig?.apiAddress;
    if (apiAddress == null) {
      throw new Error('Missing api address configuration');
    }
    return apiAddress;
  }
}
