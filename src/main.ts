/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

enableProdMode();
 
  platformBrowserDynamic().bootstrapModule(AppModule, {
    preserveWhitespaces: true
  })
  .catch(err => console.log(err));
  