import { FormioAppConfig } from 'angular-formio';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OsFormioConfigService implements FormioAppConfig {

  appUrl = 'https://formio-dev.oneserve.co.uk/mobiletest';
  apiUrl = 'https://formio-dev.oneserve.co.uk/mobiletest';
  formOnly: true;

  constructor() { }

}